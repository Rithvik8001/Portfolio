import { NextResponse } from "next/server";
import { USER } from "@/constants/user";

const EDITOR_NAME = "Zed";
const ONLINE_WINDOW_MS = 15 * 60 * 1000;

function getDateInTimezone(timezone: string, date: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
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
      { status: 500 },
    );
  }

  const headers = {
    Authorization: `Basic ${encodeBase64(apiKey)}`,
  };

  try {
    const today = getDateInTimezone(USER.timeZone);
    const yesterday = getDateInTimezone(
      USER.timeZone,
      new Date(Date.now() - 24 * 60 * 60 * 1000),
    );

    const [userAgentsRes, summariesRes] = await Promise.all([
      fetch("https://wakatime.com/api/v1/users/current/user_agents", {
        headers,
      }),
      fetch(
        `https://wakatime.com/api/v1/users/current/summaries?start=${yesterday}&end=${today}`,
        { headers },
      ),
    ]);

    if (!userAgentsRes.ok) {
      throw new Error(
        `WakaTime User Agents API error: ${userAgentsRes.statusText}`,
      );
    }

    if (!summariesRes.ok) {
      throw new Error(
        `WakaTime Summaries API error: ${summariesRes.statusText}`,
      );
    }

    const userAgentsData = (await userAgentsRes.json()) as {
      data: { editor?: string | null; last_seen_at?: string | null }[];
    };

    const lastSeenInEditor = (userAgentsData.data || [])
      .filter((agent) => agent.editor === EDITOR_NAME && agent.last_seen_at)
      .reduce((latest, agent) => {
        const seenAt = Date.parse(agent.last_seen_at as string);
        return Number.isNaN(seenAt) ? latest : Math.max(latest, seenAt);
      }, 0);

    const isOnline = lastSeenInEditor > Date.now() - ONLINE_WINDOW_MS;

    const summariesData = (await summariesRes.json()) as {
      data: {
        editors?: { name: string; text: string }[];
        range: { date: string };
      }[];
    };

    const getEditorTime = (date: string) =>
      summariesData.data
        .find((summary) => summary.range.date === date)
        ?.editors?.find((editor) => editor.name === EDITOR_NAME)?.text ??
      "0 mins";

    const responseData = {
      isOnline,
      editor: EDITOR_NAME as "Zed",
      status: isOnline ? `Online in ${EDITOR_NAME}` : "Offline",
      yesterdayCodingTime: getEditorTime(yesterday),
      todayCodingTime: getEditorTime(today),
    };
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching WakaTime data:", error);

    return NextResponse.json(
      { error: "Failed to fetch WakaTime data" },
      { status: 500 },
    );
  }
}
