import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";
import VCard from "vcard-creator";

import { USER } from "@/constants/user";

export const dynamic = "force-static";

const PHOTO_TYPES: Record<string, string> = {
  ".jpg": "jpeg",
  ".jpeg": "jpeg",
  ".png": "png",
  ".gif": "gif",
};

export async function GET() {
  const card = new VCard();

  card
    .addName(USER.lastName, USER.firstName)
    .addAddress(USER.address)
    .addEmail(USER.email)
    .addURL(USER.website);

  const photo = await readAvatar(USER.avatar);

  if (photo) {
    card.addPhoto(photo.base64, photo.type);
  }

  return new NextResponse(card.toString(), {
    status: 200,
    headers: {
      "Content-Type": "text/x-vcard",
      "Content-Disposition": `attachment; filename=${USER.username}-vcard.vcf`,
    },
  });
}

async function readAvatar(src: string) {
  const type = PHOTO_TYPES[path.extname(src).toLowerCase()];

  if (!type) {
    console.error(`[vcard] unsupported avatar format: ${src}`);
    return null;
  }

  try {
    const file = await readFile(path.join(process.cwd(), "public", src));
    return { base64: file.toString("base64"), type };
  } catch (error) {
    console.error("[vcard] could not read avatar:", error);
    return null;
  }
}
