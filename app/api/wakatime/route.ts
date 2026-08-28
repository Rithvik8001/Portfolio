import { NextResponse } from "next/server";

import { getWakaTimeStatus } from "@/lib/server/wakatime";

export async function GET() {
  const result = await getWakaTimeStatus();

  if (!result.ok) {
    console.error("[wakatime] failed to build status:", result);
    return NextResponse.json(
      { error: "WakaTime status is temporarily unavailable." },
      {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }

  return NextResponse.json(result.data, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
