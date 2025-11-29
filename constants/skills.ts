import type { Skill } from "@/types";

export const SKILLS: Skill[] = [
  // Languages
  {
    key: "html5",
    title: "HTML",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    categories: ["Language"],
  },
  {
    key: "css3",
    title: "CSS",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    categories: ["Language"],
  },
  {
    key: "js",
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    categories: ["Language"],
  },
  {
    key: "typescript",
    title: "TypeScript",
    href: "https://www.typescriptlang.org/",
    categories: ["Language"],
  },
  {
    key: "java",
    title: "Java",
    href: "https://www.java.com/",
    categories: ["Language"],
  },

  // Runtimes
  {
    key: "nodejs",
    title: "Node.js",
    href: "https://nodejs.org/",
    categories: ["Runtime Environment"],
  },
  {
    key: "bun",
    title: "Bun",
    href: "https://bun.sh/",
    categories: ["Runtime Environment"],
  },

  // Frameworks & Libraries
  {
    key: "react",
    title: "React",
    href: "https://react.dev/",
    categories: ["Library", "UI Library"],
  },
  {
    key: "nextjs2",
    title: "Next.js",
    href: "https://nextjs.org/",
    categories: ["Framework"],
    theme: true,
  },
  {
    key: "expressjs",
    title: "Express.js",
    href: "https://expressjs.com/",
    categories: ["Framework", "Backend"],
  },
  {
    key: "tailwindcss",
    title: "Tailwind CSS",
    href: "https://tailwindcss.com/",
    categories: ["Framework"],
  },
  {
    key: "redux",
    title: "Redux",
    href: "https://redux.js.org/",
    categories: ["State Management"],
  },
  {
    key: "zustand",
    title: "Zustand",
    href: "https://zustand.docs.pmnd.rs/",
    categories: ["State Management"],
  },
  {
    key: "tanstack",
    title: "TanStack",
    href: "https://tanstack.com/",
    categories: ["Library"],
    theme: true,
  },
  {
    key: "trpc",
    title: "tRPC",
    href: "https://trpc.io/",
    categories: ["Library", "Backend"],
  },
  {
    key: "graphql",
    title: "GraphQL",
    href: "https://graphql.org/",
    categories: ["Language"],
  },

  // Tools
  {
    key: "docker",
    title: "Docker",
    href: "https://www.docker.com/",
    categories: ["Containerization"],
  },
  {
    key: "git",
    title: "Git",
    href: "https://git-scm.com/",
    categories: ["Version Control"],
  },

  // Databases
  {
    key: "supabase",
    title: "Supabase",
    href: "https://supabase.com/",
    categories: ["Database", "Backend"],
  },
  {
    key: "postgresql",
    title: "PostgreSQL",
    href: "https://www.postgresql.org/",
    categories: ["Database"],
  },
  {
    key: "sqlite",
    title: "SQLite",
    href: "https://www.sqlite.org/",
    categories: ["Database"],
  },
  {
    key: "mongodb",
    title: "MongoDB",
    href: "https://www.mongodb.com/",
    categories: ["Database"],
  },
  {
    key: "redis",
    title: "Redis",
    href: "https://redis.io/",
    categories: ["Database"],
  },
];
