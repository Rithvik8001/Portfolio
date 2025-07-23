import type { StaticImageData } from "next/image";
import alfred from "@/assets/icons/alfred.png";
import appleMusic from "@/assets/icons/apple-music.png";
import cursor from "@/assets/icons/cursor.png";
import dia from "@/assets/icons/dia.png";
import ghostty from "@/assets/icons/ghostty.jpg";
import notion from "@/assets/icons/notion.png";

export type PersonalStackItem = {
  stack: string;
  description: string;
  icon: StaticImageData;
};

export const personalStack: PersonalStackItem[] = [
  { stack: "Dia", description: "Web browser of choice.", icon: dia },
  {
    stack: "Alfred",
    description: "Mac's spotlight on steroids.",
    icon: alfred,
  },
  {
    stack: "Apple Music",
    description: "Music for every moment.",
    icon: appleMusic,
  },
  {
    stack: "Notion",
    description: "My personal note taking app.",
    icon: notion,
  },
  { stack: "Cursor", description: "Developer's best friend.", icon: cursor },
  { stack: "Ghostty", description: "Terminal of choice.", icon: ghostty },
];
