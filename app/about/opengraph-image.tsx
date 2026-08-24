import { USER } from "@/constants/user";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const alt = `About ${USER.fullName}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    heading: "About me",
    subheading: USER.fullName,
    tags: ["Background", "Stack", "Beliefs"],
  });
}
