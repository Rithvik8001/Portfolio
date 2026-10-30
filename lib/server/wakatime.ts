import "server-only";

import { z } from "zod";

import { USER } from "@/constants/user";
import { getWakaTimeAccessToken } from "@/lib/server/wakatime-oauth";
import type { WakaTimeStatus } from "@/types";

const EDITOR_NAME = "Zed" as const;
const ONLINE_WINDOW_MS = 15 * 60 * 1_000;
const WAKATIME_REVALIDATE_SECONDS = 60;
const REQUEST_TIMEOUT_MS = 5_000;

const userAgentSchema = z.object({
  editor: z.string().nullish(),
  last_seen_at: z.iso.datetime({ offset: true }).nullish(),
});

// The endpoint describes a list but its documented example contains one object.
const userAgentsSchema = z.object({
  data: z
    .union([z.array(userAgentSchema), userAgentSchema])
    .transform((value) => (Array.isArray(value) ? value : [value])),
});

const summariesSchema = z.object({
  data: z.array(
    z.object({
      editors: z
        .array(
          z.object({
            name: z.string(),
            text: z.string(),
          }),
        )
        .optional(),
      range: z.object({
        date: z.iso.date(),
      }),
    }),
  ),
});

type WakaTimeFailureReason =
  | "missing_configuration"
  | "token_unavailable"
  | "upstream_error"
  | "invalid_response"
  | "invalid_configuration";

type WakaTimeResult =
  | { ok: true; data: WakaTimeStatus }
  | { ok: false; reason: WakaTimeFailureReason };

type GetWakaTimeStatusOptions = {
  fetcher?: typeof fetch;
  now?: Date;
  timeZone?: string;
};

function getDateInTimezone(timeZone: string, date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export async function getWakaTimeStatus({
  fetcher = fetch,
  now = new Date(),
  timeZone = USER.timeZone,
}: GetWakaTimeStatusOptions = {}): Promise<WakaTimeResult> {
  let today: string;
  let yesterday: string;
  try {
    today = getDateInTimezone(timeZone, now);
    // Subtract a calendar day, not 24 elapsed hours across DST transitions.
    const previousDate = new Date(`${today}T00:00:00Z`);
    previousDate.setUTCDate(previousDate.getUTCDate() - 1);
    yesterday = previousDate.toISOString().slice(0, 10);
  } catch {
    return { ok: false, reason: "invalid_configuration" };
  }

  const summariesQuery = new URLSearchParams({
    start: yesterday,
    end: today,
    timezone: timeZone,
  });
  // One refresh attempt and at most one retry of the reads after a 401.
  try {
    let token = await getWakaTimeAccessToken();
    if (!token.ok) return token;
    const readStatus = (accessToken: string) => {
      const requestInit: RequestInit & { next: { revalidate: number } } = {
        headers: { Authorization: `Bearer ${accessToken}` },
        redirect: "error",
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        next: { revalidate: WAKATIME_REVALIDATE_SECONDS },
      };
      return Promise.all([
        fetcher(
          "https://api.wakatime.com/api/v1/users/current/user_agents",
          requestInit,
        ),
        fetcher(
          `https://api.wakatime.com/api/v1/users/current/summaries?${summariesQuery}`,
          requestInit,
        ),
      ]);
    };
    let [userAgentsResponse, summariesResponse] = await readStatus(token.accessToken);
    if (!token.refreshed &&
        (userAgentsResponse.status === 401 || summariesResponse.status === 401)) {
      token = await getWakaTimeAccessToken(token.accessToken);
      if (!token.ok) return token;
      [userAgentsResponse, summariesResponse] = await readStatus(token.accessToken);
    }

    if (!userAgentsResponse.ok || !summariesResponse.ok) {
      return {
        ok: false,
        reason: "upstream_error",
      };
    }

    const [userAgentsResult, summariesResult] = await Promise.all([
      userAgentsResponse
        .json()
        .then((value: unknown) => userAgentsSchema.safeParse(value)),
      summariesResponse
        .json()
        .then((value: unknown) => summariesSchema.safeParse(value)),
    ]);

    if (!userAgentsResult.success || !summariesResult.success) {
      return {
        ok: false,
        reason: "invalid_response",
      };
    }

    const lastSeenInEditor = userAgentsResult.data.data.reduce(
      (latest, agent) => {
        if (agent.editor !== EDITOR_NAME || !agent.last_seen_at) return latest;

        const seenAt = Date.parse(agent.last_seen_at);
        return Number.isNaN(seenAt) ? latest : Math.max(latest, seenAt);
      },
      0,
    );
    const isOnline =
      lastSeenInEditor > now.getTime() - ONLINE_WINDOW_MS &&
      lastSeenInEditor <= now.getTime();
    const getEditorTime = (date: string) =>
      summariesResult.data.data
        .find((summary) => summary.range.date === date)
        ?.editors?.find((editor) => editor.name === EDITOR_NAME)?.text ??
      "0 mins";

    return {
      ok: true,
      data: {
        isOnline,
        editor: EDITOR_NAME,
        status: isOnline ? `Online in ${EDITOR_NAME}` : "Offline",
        yesterdayCodingTime: getEditorTime(yesterday),
        todayCodingTime: getEditorTime(today),
      },
    };
  } catch {
    // Fetch/JSON/schema errors can embed headers or private upstream content.
    return { ok: false, reason: "upstream_error" };
  }
}
