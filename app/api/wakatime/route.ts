import { NextResponse } from "next/server";
import { USER } from "@/constants/user";

export const runtime = "edge";

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

  if (!apiKey) {
    return NextResponse.json(
      { error: "WakaTime API key not configured" },
      { status: 500 }
    );
  }

  const headers = {
    Authorization: `Basic ${btoa(apiKey)}`,
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
      data: { time: number; editor: string }[];
    };
    const heartbeats = heartbeatsData.data || [];

    const fifteenMinutesAgo = Date.now() - 15 * 60 * 1000;
    const lastHeartbeat =
      heartbeats.length > 0 ? heartbeats[heartbeats.length - 1] : null;

    let isOnline = false;
    let editor: string | null = null;

    if (lastHeartbeat) {
      const lastHeartbeatTime = new Date(lastHeartbeat.time * 1000).getTime();

      if (lastHeartbeatTime > fifteenMinutesAgo) {
        isOnline = true;
        editor = lastHeartbeat.editor?.toLowerCase() || null;
      }
    }

    if (!editor && heartbeats.length > 0) {
      const recentEditor = heartbeats[heartbeats.length - 1]?.editor;
      editor = recentEditor?.toLowerCase() || null;

      if (!editor) {
        for (let i = heartbeats.length - 1; i >= 0; i--) {
          if (heartbeats[i]?.editor) {
            editor = heartbeats[i].editor.toLowerCase();
            break;
          }
        }
      }
    }
    if (!editor && isOnline) {
      editor = "cursor";
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
      data: { grand_total: { text: string }; range: { date: string } }[];
    };

    const yesterdaySummary = summariesData.data.find(
      (d) => d.range.date === yesterdayStr
    );
    const todaySummary = summariesData.data.find((d) => d.range.date === today);

    const yesterdayCodingTime = yesterdaySummary?.grand_total?.text || "0 mins";
    const todayCodingTime = todaySummary?.grand_total?.text || "0 mins";
    const editorDisplayName = editor
      ? editor.charAt(0).toUpperCase() + editor.slice(1)
      : "Editor";

    let editorType: "Cursor" | null = null;
    if (editor && (editor === "cursor" || editor.includes("cursor"))) {
      editorType = "Cursor";
    }
    const responseData = {
      isOnline,
      editor: editorType,
      status: isOnline ? `Online in ${editorDisplayName}` : "Offline",
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
