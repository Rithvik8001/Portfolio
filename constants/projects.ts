export type Project = {
  title: string;
  description: string;
  url: string;
};

export const projects: Project[] = [
  {
    title: "Snippet Vault",
    description: `Designed and developed a full-stack snippet management web application using NextJs and Supabase, enabling users to
store, organize, and share code snippets efficiently, improving developer workflow.`,
    url: "https://snippet-vault-beta.vercel.app/",
  },
  {
    title: "Notesey",
    description: `Developed a full-stack study platform using Next.js, featuring an AI-powered Q&A system, a smart note-taking editor,
and a focus timer, with Firebase used for authentication and backend.`,
    url: "https://notesey.vercel.app/",
  },
  {
    title: "LumeUI",
    description: `Developed a reusable React component library with 84+ design variants across 6 core components, enabling developers
to rapidly build UIs with pre-styled, customizable solutions.`,
    url: "https://www.npmjs.com/package/lume-ui",
  },
];
