import { NextResponse } from "next/server";
import { USER } from "@/constants/user";

export const runtime = "edge";
const EDITOR_NAME = "Zed";
const EDITOR_NAME_LOWER = EDITOR_NAME.toLowerCase();

function getDateInTimezone(timezone: string): string {
  const now = new Date();
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export async function GET() {
  const apiKey = process.env.WAKATIME_API_KEY;

  const encodeBase64 = (value: string) => {
    if (typeof btoa === "function") return btoa(value);
    if (typeof Buffer !== "undefined")
      return Buffer.from(value).toString("base64");
    throw new Error("No base64 encoder available");
  };

  if (!apiKey) {
    return NextResponse.json(
      { error: "WakaTime API key not configured" },
      { status: 500 }
    );
  }

  const headers = {
    Authorization: `Basic ${encodeBase64(apiKey)}`,
  };

  try {
    const today = getDateInTimezone(USER.timeZone);
    const heartbeatsRes = await fetch(
      `https://wakatime.com/api/v1/users/current/heartbeats?date=${today}`,
      { headers }
    );

    if (!heartbeatsRes.ok) {
      throw new Error(
        `WakaTime Heartbeats API error: ${heartbeatsRes.statusText}`
      );
    }

    const heartbeatsData = (await heartbeatsRes.json()) as {
      data: { time: number; editor?: string }[];
    };
    const heartbeats = heartbeatsData.data || [];

    const fifteenMinutesAgo = Date.now() - 15 * 60 * 1000;

    let isOnline = false;
    let lastEditorHeartbeat: { time: number; editor?: string } | null = null;

    for (let i = heartbeats.length - 1; i >= 0; i--) {
      const heartbeat = heartbeats[i];
      if (heartbeat?.editor?.toLowerCase().includes(EDITOR_NAME_LOWER)) {
        lastEditorHeartbeat = heartbeat;
        break;
      }
    }

    if (lastEditorHeartbeat) {
      const lastHeartbeatTime = new Date(
        lastEditorHeartbeat.time * 1000
      ).getTime();
      if (lastHeartbeatTime > fifteenMinutesAgo) {
        isOnline = true;
      }
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = new Intl.DateTimeFormat("en-CA", {
      timeZone: USER.timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(yesterday);

    const summariesRes = await fetch(
      `https://wakatime.com/api/v1/users/current/summaries?start=${yesterdayStr}&end=${today}`,
      { headers }
    );

    if (!summariesRes.ok) {
      throw new Error(
        `WakaTime Summaries API error: ${summariesRes.statusText}`
      );
    }

    const summariesData = (await summariesRes.json()) as {
      data: {
        grand_total: { text: string };
        editors?: { name: string; text: string }[];
        range: { date: string };
      }[];
    };

    const yesterdaySummary = summariesData.data.find(
      (d) => d.range.date === yesterdayStr
    );
    const todaySummary = summariesData.data.find((d) => d.range.date === today);

    const getTotalTime = (
      summary:
        | {
            grand_total: { text: string };
          }
        | undefined
    ) => summary?.grand_total?.text || "0 mins";

    const yesterdayCodingTime = getTotalTime(yesterdaySummary);
    const todayCodingTime = getTotalTime(todaySummary);

    const responseData = {
      isOnline,
      editor: "Zed" as const,
      status: isOnline ? `Online in ${EDITOR_NAME}` : "Offline",
      yesterdayCodingTime,
      todayCodingTime,
    };
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching WakaTime data:", error);

    return NextResponse.json(
      { error: "Failed to fetch WakaTime data" },
      { status: 500 }
    );
  }
}
