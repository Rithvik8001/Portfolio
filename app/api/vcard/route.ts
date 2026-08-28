import { USER } from "@/constants/user";
import { createVCard, createVCardFilename } from "@/lib/server/vcard";

export const dynamic = "force-static";

export async function GET() {
  const card = await createVCard();
  const filename = createVCardFilename(USER.username);

  return new Response(card, {
    headers: {
      "Cache-Control":
        "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Type": "text/vcard; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
