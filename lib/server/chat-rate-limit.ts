import "server-only";

import { createHash } from "node:crypto";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { getUpstashRedisEnv } from "@/lib/server/upstash-env";

const REDIS_TIMEOUT_MS = 1_000;
const BURST_LIMIT = 3;
const HOURLY_LIMIT = 10;

export type ChatRateLimitAllowed = {
  ok: true;
  allowed: true;
  success: true;
  limit: number;
  remaining: number;
  reset: number;
  bypassed?: "timeout" | "error";
};

export type ChatRateLimitDenied = {
  ok: true;
  allowed: false;
  success: false;
  limit: number;
  remaining: number;
  reset: number;
  retryAfterSeconds: number;
  window: "burst" | "hourly";
};

export type ChatRateLimitUnavailable = {
  ok: false;
  reason: "missing_configuration";
};

export type ChatRateLimitResult =
  ChatRateLimitAllowed | ChatRateLimitDenied | ChatRateLimitUnavailable;

type LimitSnapshot = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  pending: Promise<unknown>;
  reason?: string;
  window: "burst" | "hourly";
};

let redis: Redis | null | undefined;
let burstLimiter: Ratelimit | undefined;
let hourlyLimiter: Ratelimit | undefined;

function getRedis(): Redis | null {
  if (redis !== undefined) return redis;

  const env = getUpstashRedisEnv();

  if (!env) {
    redis = null;
    return null;
  }

  redis = new Redis({
    url: env.url,
    token: env.token,
    signal: () => AbortSignal.timeout(REDIS_TIMEOUT_MS),
  });

  return redis;
}

function getLimiters(): { burst: Ratelimit; hourly: Ratelimit } | null {
  const client = getRedis();

  if (!client) return null;

  burstLimiter ??= new Ratelimit({
    redis: client,
    limiter: Ratelimit.slidingWindow(BURST_LIMIT, "1 m"),
    prefix: "ratelimit:chat:burst",
    timeout: REDIS_TIMEOUT_MS,
    analytics: true,
  });

  hourlyLimiter ??= new Ratelimit({
    redis: client,
    limiter: Ratelimit.slidingWindow(HOURLY_LIMIT, "1 h"),
    prefix: "ratelimit:chat:hourly",
    timeout: REDIS_TIMEOUT_MS,
    analytics: true,
  });

  return { burst: burstLimiter, hourly: hourlyLimiter };
}

function hashIdentifier(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function readClientIp(request: Request): string | null {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const forwardedIp = forwardedFor?.split(",")[0]?.trim();

  if (forwardedIp) return forwardedIp;

  const realIp = request.headers.get("x-real-ip")?.trim();
  return realIp || null;
}

export function getChatRateLimitIdentifier(request: Request): string {
  const ip = readClientIp(request);

  if (ip) return `ip:${hashIdentifier(ip)}`;

  if (process.env.NODE_ENV === "development") {
    return "dev:local";
  }

  return `ip:${hashIdentifier("missing")}`;
}

function toRetryAfterSeconds(reset: number): number {
  return Math.max(1, Math.ceil((reset - Date.now()) / 1_000));
}

function keepAlive(pending: Promise<unknown>): void {
  void pending.catch(() => undefined);
}

function pickDenied(
  burst: LimitSnapshot,
  hourly: LimitSnapshot,
): LimitSnapshot {
  if (!burst.success && !hourly.success) {
    return hourly.reset >= burst.reset ? hourly : burst;
  }

  return burst.success ? hourly : burst;
}

export async function enforceChatRateLimit(
  request: Request,
): Promise<ChatRateLimitResult> {
  const limiters = getLimiters();

  if (!limiters) {
    return { ok: false, reason: "missing_configuration" };
  }

  const identifier = getChatRateLimitIdentifier(request);

  let burstResult: Awaited<ReturnType<Ratelimit["limit"]>>;
  let hourlyResult: Awaited<ReturnType<Ratelimit["limit"]>>;

  try {
    [burstResult, hourlyResult] = await Promise.all([
      limiters.burst.limit(identifier),
      limiters.hourly.limit(identifier),
    ]);
  } catch {
    return {
      ok: true,
      allowed: true,
      success: true,
      limit: HOURLY_LIMIT,
      remaining: HOURLY_LIMIT,
      reset: Date.now() + 60_000,
      bypassed: "error",
    };
  }

  keepAlive(burstResult.pending);
  keepAlive(hourlyResult.pending);

  const burst: LimitSnapshot = { ...burstResult, window: "burst" };
  const hourly: LimitSnapshot = { ...hourlyResult, window: "hourly" };
  const timedOut = burst.reason === "timeout" || hourly.reason === "timeout";

  if (!burst.success || !hourly.success) {
    const denied = pickDenied(burst, hourly);

    return {
      ok: true,
      allowed: false,
      success: false,
      limit: denied.limit,
      remaining: denied.remaining,
      reset: denied.reset,
      retryAfterSeconds: toRetryAfterSeconds(denied.reset),
      window: denied.window,
    };
  }

  const stricter = burst.remaining <= hourly.remaining ? burst : hourly;

  return {
    ok: true,
    allowed: true,
    success: true,
    limit: stricter.limit,
    remaining: stricter.remaining,
    reset: stricter.reset,
    bypassed: timedOut ? "timeout" : undefined,
  };
}
