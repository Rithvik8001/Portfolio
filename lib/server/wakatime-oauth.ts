import "server-only";

import { randomUUID } from "node:crypto";

import { Redis } from "@upstash/redis";
import { z } from "zod";

const tokenSchema = z.string().regex(/^[A-Za-z0-9\-._~+/]+=*$/);
const redisEnvSchema = z.object({
  url: z.url().refine((value) => new URL(value).protocol === "https:"),
  token: z.string().min(1),
});
// Seed this private Redis record once after the approved authorization-code flow.
// expiresAt is Unix milliseconds; use a distinct key/grant for each environment.
const storedTokenSchema = z.object({
  accessToken: tokenSchema,
  refreshToken: tokenSchema,
  expiresAt: z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
  state: z.enum(["ready", "refreshing"]),
});
const refreshResponseSchema = z.object({
  access_token: tokenSchema,
  refresh_token: tokenSchema.optional(),
  token_type: z.string().regex(/^bearer$/i),
  expires_in: z.coerce.number().int().positive().max(315_360_000),
});

// Compare the entire serialized record. Claiming and replacing are atomic across
// instances; a stale worker cannot overwrite a newer grant or refreshed token pair.
const compareAndSet = `
  if redis.call('GET', KEYS[1]) ~= ARGV[1] then return 0 end
  redis.call('SET', KEYS[1], ARGV[2])
  return 1
`;

type TokenResult =
  | { ok: true; accessToken: string; refreshed: boolean }
  | { ok: false; reason: "missing_configuration" | "token_unavailable" };

export async function getWakaTimeAccessToken(
  rejectedAccessToken?: string,
): Promise<TokenResult> {
  // Keep OAuth credentials separate from the chat rate-limit database.
  const env = redisEnvSchema.safeParse({
    url: process.env.WAKATIME_REDIS_REST_URL,
    token: process.env.WAKATIME_REDIS_REST_TOKEN,
  });
  const clientId = process.env.WAKATIME_CLIENT_ID;
  const clientSecret = process.env.WAKATIME_CLIENT_SECRET;
  const redirectUri = process.env.WAKATIME_REDIRECT_URI;
  const key = process.env.WAKATIME_TOKEN_KEY;
  if (!env.success || !clientId || !clientSecret || !redirectUri || !key) {
    return { ok: false, reason: "missing_configuration" };
  }

  try {
    const redis = new Redis({
      url: env.data.url,
      token: env.data.token,
      automaticDeserialization: false,
      retry: false,
      signal: () => AbortSignal.timeout(2_000),
    });
    const raw = await redis.get<string>(key);
    if (!raw) return { ok: false, reason: "token_unavailable" };
    const parsed = storedTokenSchema.safeParse(JSON.parse(raw));
    if (!parsed.success || parsed.data.state !== "ready") {
      return { ok: false, reason: "token_unavailable" };
    }
    const current = parsed.data;
    if (
      current.expiresAt > Date.now() + 60_000 &&
      current.accessToken !== rejectedAccessToken
    ) {
      return { ok: true, accessToken: current.accessToken, refreshed: false };
    }

    // Deliberately no TTL on this claim: a crash or ambiguous token POST must
    // never allow another worker to replay a possibly rotated refresh token.
    // Recovery requires replacing the record with a newly authorized grant.
    const claimed = JSON.stringify({
      ...current,
      state: "refreshing",
      refreshId: randomUUID(),
    });
    const acquired = await redis.eval(compareAndSet, [key], [raw, claimed]);
    if (acquired !== 1) return { ok: false, reason: "token_unavailable" };

    const startedAt = Date.now();
    const response = await fetch("https://wakatime.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        refresh_token: current.refreshToken,
      }),
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(5_000),
    });
    if (!response.ok) return { ok: false, reason: "token_unavailable" };
    const refreshed = refreshResponseSchema.safeParse(await response.json());
    if (!refreshed.success) return { ok: false, reason: "token_unavailable" };
    const next = {
      accessToken: refreshed.data.access_token,
      // OAuth permits omitting a new refresh token when the old one stays valid.
      refreshToken: refreshed.data.refresh_token ?? current.refreshToken,
      expiresAt: startedAt + refreshed.data.expires_in * 1_000,
      state: "ready",
    };
    // Do not use a new access token until its refresh token is durably saved.
    const saved = await redis.eval(
      compareAndSet,
      [key],
      [claimed, JSON.stringify(next)],
    );
    if (saved !== 1) return { ok: false, reason: "token_unavailable" };
    return { ok: true, accessToken: next.accessToken, refreshed: true };
  } catch {
    // Never return/log Redis errors, token responses, or fetch exception objects.
    return { ok: false, reason: "token_unavailable" };
  }
}
