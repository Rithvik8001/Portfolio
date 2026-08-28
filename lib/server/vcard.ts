import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

import VCard from "vcard-creator";

import { USER } from "@/constants/user";

const PHOTO_TYPES: Readonly<Record<string, string>> = {
  ".jpg": "jpeg",
  ".jpeg": "jpeg",
  ".png": "png",
  ".gif": "gif",
};

type CreateVCardOptions = {
  readAvatarFile?: (filePath: string) => Promise<Buffer>;
};

export function createVCardFilename(username: string): string {
  const safeUsername = username
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${safeUsername || "contact"}-vcard.vcf`;
}

export async function createVCard({
  readAvatarFile = readFile,
}: CreateVCardOptions = {}): Promise<string> {
  const card = new VCard();

  card
    .addName(USER.lastName, USER.firstName)
    .addAddress(USER.address)
    .addEmail(USER.email)
    .addURL(USER.website);

  const photoType = PHOTO_TYPES[path.extname(USER.avatar).toLowerCase()];

  if (!photoType) {
    console.error(`[vcard] unsupported avatar format: ${USER.avatar}`);
    return card.toString();
  }

  try {
    const avatarPath = path.join(
      process.cwd(),
      "public",
      USER.avatar.replace(/^[/\\]+/, ""),
    );
    const file = await readAvatarFile(avatarPath);
    card.addPhoto(file.toString("base64"), photoType);
  } catch (error) {
    console.error("[vcard] could not read avatar:", error);
  }

  return card.toString();
}
