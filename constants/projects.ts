import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "snippet-vault",
    title: "Snippet Vault",
    description:
      "- Designed and developed a full-stack snippet management web application using NextJs and Supabase, enabling users to store, organize, and share code snippets efficiently, improving developer workflow.",
    link: "https://snippet-vault-beta.vercel.app/",
    isExpanded: true,
    skills: ["Next.js", "Supabase", "TypeScript"],
  },
  {
    id: "notesey",
    title: "Notesey",
    description:
      "- Developed a full-stack study platform using Next.js, featuring an AI-powered Q&A system, a smart note-taking editor, and a focus timer, with Firebase used for authentication and backend.",
    link: "https://notesey.vercel.app/",
    isExpanded: false,
    skills: ["NextJS", "Firebase", "TypeScript", "Vercel AI SDK"],
  },
  {
    id: "amy",
    title: "Amy",
    description:
      "- Built full-stack subscription management platform using Next.js 16 App Router, TypeScript, PostgreSQL (Supabase), and Drizzle ORM, delivering real-time financial analytics with automated billing cycles, multi-tenant security, and timezone-safe date calculations.\n- Implemented AI features with Vercel AI SDK and OpenAI GPT-5.1-mini: natural language subscription parsing, intelligent budget recommendations with spending analysis, and rate limiting with content validation to prevent injection attacks.\n- Developed budget management system with spending limits, expense forecasting, and automated email alerts (99% + delivery) via Resend API and PostgreSQL duplicate prevention. Integrated calendar export (RFC 5545 .ics), multi-currency support (18 currencies), CSV export, and PWA with Badge API and offline detection for improved engagement and mobile accessibility.",
    link: "https://www.amy.bz/",
    isExpanded: false,
    skills: [
      "Next.js 16",
      "TypeScript",
      "Supabase",
      "Drizzle ORM",
      "Vercel AI SDK",
    ],
  },
];
