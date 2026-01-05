import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "snippet-vault",
    title: "Snippet Vault",
    description:
      "- Designed and developed a full-stack snippet management web application using Next.js and Supabase, enabling users to store, organize, and share code snippets efficiently, improving developer workflow.",
    link: "https://snippet-vault-beta.vercel.app/",
    isExpanded: true,
    skills: ["Next.js", "Supabase", "TypeScript"],
  },
  {
    id: "billo",
    title: "Billo",
    description:
      "- Developed Billo, a full-stack bill-splitting SaaS that enables groups to scan receipts, assign items to members, and track balances.\n- Implemented AI receipt scanning system using Gemini 2.5 Flash via Vercel AI SDK with structured output validation, streaming SSE responses for real-time progress, and user confirmation workflows that extract line items, quantities, and prices from receipt images before saving to database.\n- Built subscription system with Polar payment integration, tier-based rate limiting via Upstash Redis (3 scans/day free, 50/day Pro), webhook handling for payment lifecycle events, and email notifications with user preference management and unsubscribe flows.",
    link: "https://billo.sh",
    isExpanded: false,
    skills: [
      "Next.js",
      "Vercel AI SDK",
      "Gemini",
      "Supabase",
      "DrizzleORM",
      "Polar",
      "Upstash Redis",
    ],
  },
  {
    id: "amy",
    title: "Amy",
    description:
      "- Developed full-stack subscription management platform using Next.js, TypeScript, Supabase, and DrizzleORM, delivering real-time financial analytics with automated billing cycle management, multi-tenant security, and timezone-safe date calculations.\n- Implemented AI features with Vercel AI SDK and OpenAI GPT-5.1-mini: natural language subscription parsing, intelligent budget recommendations with spending analysis, and rate limiting with content validation to prevent injection attacks.",
    link: "https://www.amy.bz/",
    isExpanded: false,
    skills: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "DrizzleORM",
      "Vercel AI SDK",
      "OpenAI",
    ],
  },
];
