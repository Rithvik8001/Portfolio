import { UMAMI_WEBSITE_ID } from "@/lib/analytics";

const UMAMI_SEND_URL = "https://gateway.umami.is/api/send";

const FORWARDED_HEADERS: Record<string, string> = {
  "user-agent": "User-Agent",
  "x-umami-cache": "x-umami-cache",
  "x-vercel-ip-country": "x-umami-client-country",
  "x-vercel-ip-country-region": "x-umami-client-region",
  "x-vercel-ip-city": "x-umami-client-city",
};

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return (
    forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip")
  );
}

function isOwnWebsite(body: string) {
  try {
    const parsed = JSON.parse(body) as { payload?: { website?: unknown } };
    return parsed.payload?.website === UMAMI_WEBSITE_ID;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const body = await request.text();

  if (!UMAMI_WEBSITE_ID || !isOwnWebsite(body)) {
    return Response.json({}, { status: 400 });
  }

  const headers = new Headers({ "Content-Type": "application/json" });

  for (const [from, to] of Object.entries(FORWARDED_HEADERS)) {
    const value = request.headers.get(from);
    if (value) headers.set(to, value);
  }

  const clientIp = getClientIp(request);
  if (clientIp) headers.set("x-umami-client-ip", clientIp);

  try {
    const upstream = await fetch(UMAMI_SEND_URL, {
      method: "POST",
      headers,
      body,
      cache: "no-store",
    });

    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type":
          upstream.headers.get("content-type") ?? "application/json",
      },
    });
  } catch {
    return Response.json({}, { status: 502 });
  }
}
