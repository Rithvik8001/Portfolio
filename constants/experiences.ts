import type { StaticImageData } from "next/image";
import tcs from "@/assets/experiences/tcs.png";

export type Experience = {
  id: number;
  role: string;
  company: string;
  employmentType: string;
  duration: string;
  img: StaticImageData;
};

export const experiences: Experience[] = [
  {
    id: 1,
    role: "Associate Web Developer",
    company: "Tata Consultancy Services",
    employmentType: "Fulltime",
    duration: "Jul 2024 - Present",
    img: tcs,
  },
  {
    id: 2,
    role: "Junior Frontend Developer",
    company: "Tata Consultancy Services",
    employmentType: "Fulltime",
    duration: "Jun 2021 - Jul 2022",
    img: tcs,
  },
];
