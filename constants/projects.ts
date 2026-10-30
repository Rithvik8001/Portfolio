import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "bruno",
    title: "Bruno",
    description:
      "- Built a full-stack AI-powered bill-splitting app in Next.js, installable as a PWA, with receipt scanning, natural-language bill entry and a ledger Q&A assistant (Vercel AI SDK, OpenAI), validating every model-produced amount in code and enforcing a shared usage quota with backoff and a circuit breaker.\n- Designed a propose, confirm and undo flow for 11 AI-triggered actions, where the server recomputes all numbers and re-checks permissions so the model can't act unchecked.\n- Implemented an OAuth 2.1 provider and a read-only MCP server with 12 typed tools (PKCE, rotating refresh tokens, consent screen), so Claude can query a user's ledger.",
    link: "https://bruno.vin",
    skills: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Vercel AI SDK",
    ],
  },
  {
    id: "pulse",
    title: "Pulse",
    description:
      "- Built a full-stack AI habit-tracking app with an assistant of two agents and 14 typed, Zod-validated tools that create, reschedule and archive habits, log check-ins and write journal entries, each confirmed by the user before any database write.\n- Built an effective-dated scheduling engine for daily, weekday and N-times-a-week habits that computes due days, completion rate, streaks and grace days, so schedule changes never rewrite past stats.\n- Built a race-safe AI rate limiter on Postgres transaction-level advisory locks enforcing per-user (30 requests/day) and site-wide (1,000 requests, 5M tokens/day) budgets, reserving estimated tokens up front and reconciling with actual usage.",
    link: "https://pulseapp.company",
    skills: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "PostgreSQL",
      "Supabase",
      "Vercel AI SDK",
      "Claude",
    ],
  },
  {
    id: "piffy",
    title: "Piffy",
    description:
      "- Built a privacy-first PDF toolkit with 20+ tools (merge, redact, sign, compress, Office to PDF) that processes every file on-device in Web Workers and WASM, with a typed worker protocol and build-time bundle and CSP guards.\n- Ran LibreOffice compiled to WASM in the browser to convert Word, Excel and PowerPoint to PDF, with custom ZIP/CFB/XML sanitizers that strip macros and hidden data, shipping the engine as SHA-256-verified, cached chunks.\n- Built a ProseMirror PDF editor that produces tagged PDFs, laying out 300 pages in ~1.3s with ~12ms typing latency.",
    link: "https://piffy.fyi",
    skills: [
      "TanStack Start",
      "TypeScript",
      "WebAssembly",
      "Web Workers",
      "pdf.js",
      "ProseMirror",
      "WebGPU",
    ],
  },
];
