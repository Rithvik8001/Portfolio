import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const apiKey = process.env.WAKATIME_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "WakaTime API key not configured" },
      { status: 500 }
    );
  }

  const headers = {
    Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
  };

  try {
    const today = new Date().toISOString().split("T")[0];
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

    if (lastHeartbeat) {
      const lastHeartbeatTime = new Date(lastHeartbeat.time * 1000).getTime();

      if (lastHeartbeatTime > fifteenMinutesAgo) {
        isOnline = true;
      }
    }

    const yesterday = new Date();

    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayStr = yesterday.toISOString().split("T")[0];

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

    const responseData = {
      isOnline,
      status: isOnline ? `Online in VSCode` : "Offline",
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
