import type { StaticImageData } from "next/image";
import lumeui from "@/assets/projects/lume-ui.png";
import notesey from "@/assets/projects/notesey.png";
import snippetvault from "@/assets/projects/snippetvault.png";

export type Project = {
  id: number;
  title: string;
  description: string;
  liveUrl: string;
  img: StaticImageData;
  isFeatured?: boolean;
  stack: { name: string; color: string }[];
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Snippet Vault",
    description:
      "Designed and developed a full-stack snippet management web application using NextJs and Supabase, enabling users to store, organize, and share code snippets efficiently, improving developer workflow.",
    liveUrl: "https://snippet-vault-beta.vercel.app/",
    img: snippetvault,
    isFeatured: true,
    stack: [
      { name: "Next.js", color: "#6541f3" },
      { name: "Supabase", color: "#f341ac" },
      { name: "TypeScript", color: "#f38141" },
    ],
  },
  {
    id: 2,
    title: "Notesey",
    description:
      "Developed a full-stack study platform using Next.js, featuring an AI-powered Q&A system, a smart note-taking editor, and a focus timer, with Firebase used for authentication and backend.",
    liveUrl: "https://notesey.vercel.app/",
    img: notesey,
    isFeatured: true,
    stack: [
      { name: "NextJS", color: "#6541f3" },
      { name: "Firebase", color: "#f341ac" },
      { name: "TypeScript", color: "#f38141" },
      { name: "Vercel AI SDK", color: "#000000" },
    ],
  },
  {
    id: 3,
    title: "LumeUI",
    description:
      "Developed a reusable React component library with 84+ design variants across 6 core components, enabling developers to rapidly build UIs with pre-styled, customizable solutions.",
    liveUrl: "https://lume-ui.vercel.app/",
    img: lumeui,
    isFeatured: false,
    stack: [
      { name: "NextJS", color: "#6541f3" },
      { name: "TypeScript", color: "#f38141" },
      { name: "NPM", color: "#cb0000" },
    ],
  },
];
