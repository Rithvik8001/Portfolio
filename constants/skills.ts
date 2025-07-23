import type { StaticImageData } from "next/image";
import css from "@/assets/icons/css.png";
import express from "@/assets/icons/express.png";
import firebase from "@/assets/icons/firebase.png";
import git from "@/assets/icons/git.png";
import github from "@/assets/icons/github.png";
import html from "@/assets/icons/html.png";
import javascript from "@/assets/icons/js.png";
import mongodb from "@/assets/icons/mongodb.png";
import nextjs from "@/assets/icons/next-js.png";
import nodejs from "@/assets/icons/node-js.png";
import react from "@/assets/icons/react-js.png";
import tailwind from "@/assets/icons/tailwindcss.png";
import typescript from "@/assets/icons/typescript.png";

type Skill = {
  name: string;
  icon: StaticImageData;
};

export const skills: Skill[] = [
  { name: "HTML", icon: html },
  { name: "CSS", icon: css },
  { name: "JavaScript", icon: javascript },
  { name: "TypeScript", icon: typescript },
  { name: "React.js", icon: react },
  { name: "Next.js", icon: nextjs },
  { name: "Node.js", icon: nodejs },
  { name: "Express.js", icon: express },
  { name: "TailwindCSS", icon: tailwind },
  { name: "Git", icon: git },
  { name: "GitHub", icon: github },
  { name: "Firebase", icon: firebase },
  { name: "MongoDB", icon: mongodb },
];
