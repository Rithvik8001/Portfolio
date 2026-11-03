const UMAMI_SCRIPT_URL = "https://cloud.umami.is/script.js";

export async function GET() {
  try {
    const upstream = await fetch(UMAMI_SCRIPT_URL, { cache: "no-store" });

    if (!upstream.ok) {
      return new Response(null, {
        status: 502,
        headers: { "Cache-Control": "no-store" },
      });
    }

    return new Response(await upstream.text(), {
      headers: {
        "Cache-Control":
          "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
        "Content-Type": "application/javascript; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response(null, {
      status: 502,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
