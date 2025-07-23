import type { StaticImageData } from "next/image";
import wsu from "@/assets/education/wsu.jpg";

export type Education = {
  id: number;
  school: string;
  degree: string;
  duration: string;
  img: StaticImageData;
};

export const education: Education[] = [
  {
    id: 1,
    school: "Wichita State University",
    degree: "Masters in Computer Science",
    duration: "Aug 2022 - Dec 2023",
    img: wsu,
  },
];
