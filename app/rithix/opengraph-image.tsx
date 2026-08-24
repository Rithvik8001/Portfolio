import { USER } from "@/constants/user";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const alt = `Rithix — ${USER.fullName}'s AI assistant`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    heading: "Rithix ⚡️",
    subheading: `${USER.fullName}'s AI assistant`,
    tags: ["Ask anything", "Projects", "Experience"],
  });
}
