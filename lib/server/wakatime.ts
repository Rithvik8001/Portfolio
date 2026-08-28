import "server-only";

import { z } from "zod";

import { USER } from "@/constants/user";
import type { WakaTimeStatus } from "@/types";

const EDITOR_NAME = "Zed" as const;
const ONLINE_WINDOW_MS = 15 * 60 * 1_000;
const WAKATIME_REVALIDATE_SECONDS = 60;

const userAgentsSchema = z.object({
  data: z.array(
    z.object({
      editor: z.string().nullish(),
      last_seen_at: z.string().nullish(),
    }),
  ),
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
        date: z.string(),
      }),
    }),
  ),
});

type WakaTimeFailureReason =
  "missing_configuration" | "upstream_error" | "invalid_response";

type WakaTimeResult =
  | { ok: true; data: WakaTimeStatus }
  | { ok: false; reason: WakaTimeFailureReason; cause?: unknown };

type GetWakaTimeStatusOptions = {
  apiKey?: string;
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
  apiKey = process.env.WAKATIME_API_KEY,
  fetcher = fetch,
  now = new Date(),
  timeZone = USER.timeZone,
}: GetWakaTimeStatusOptions = {}): Promise<WakaTimeResult> {
  if (!apiKey) {
    return { ok: false, reason: "missing_configuration" };
  }

  const today = getDateInTimezone(timeZone, now);
  const yesterday = getDateInTimezone(
    timeZone,
    new Date(now.getTime() - 24 * 60 * 60 * 1_000),
  );
  const headers = {
    Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
  };
  const requestInit = {
    headers,
    next: { revalidate: WAKATIME_REVALIDATE_SECONDS },
  };

  try {
    const [userAgentsResponse, summariesResponse] = await Promise.all([
      fetcher(
        "https://wakatime.com/api/v1/users/current/user_agents",
        requestInit,
      ),
      fetcher(
        `https://wakatime.com/api/v1/users/current/summaries?start=${yesterday}&end=${today}`,
        requestInit,
      ),
    ]);

    if (!userAgentsResponse.ok || !summariesResponse.ok) {
      return {
        ok: false,
        reason: "upstream_error",
        cause: new Error(
          `WakaTime responded with ${userAgentsResponse.status}/${summariesResponse.status}`,
        ),
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
        cause:
          userAgentsResult.error ??
          (summariesResult.success ? undefined : summariesResult.error),
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
  } catch (cause) {
    return { ok: false, reason: "upstream_error", cause };
  }
}
