import { Activity } from "@/components/ui/contribution-graph";

export type NavItem = {
  title: string;
  href: string;
};

export type SocialLink = {
  icon: string;
  title: string;
  description?: string;
  href: string;
};

export type Job = {
  title: string;
  company: string;
  website: string;
};

export type User = {
  firstName: string;
  lastName: string;
  fullName: string;
  avatar: string;
  email: string;
  address: string;
  timeZone: string;
  gender: "male" | "female" | "other";
  pronouns: string;
  username: string;
  bio: string;
  website: string;
  about: string;
  github: string;
};

export type Skill = {
  key: string;
  title: string;
  href: string;
  categories: string[];
  theme?: boolean;
};

export type GitHubContributionsResponse = {
  contributions: Activity[];
};

export type ExperiencePositionIcon =
  | "code"
  | "design"
  | "education"
  | "business"
  | "idea";

export type ExperiencePosition = {
  id: string;
  title: string;
  employmentPeriod: {
    start: string;
    end?: string;
  };
  employmentType?: string;
  description?: string;
  cgpa?: string;
  icon?: ExperiencePositionIcon;
  skills?: string[];
  isExpanded?: boolean;
};

export type Experience = {
  id: string;
  companyName: string;
  companyLogo?: string;
  positions: ExperiencePosition[];
  isCurrentEmployer?: boolean;
};

export type Project = {
  id: string;
  title: string;
  link: string;
  skills: string[];
  description?: string;
  isExpanded?: boolean;
};

export type Certification = {
  title: string;
  issuer: string;
  issuerLogoURL?: string;
  issuerIconName?: string;
  issueDate: string;
  credentialID: string;
  credentialURL: string;
};

export type TechStack = {
  key: string;
  title: string;
  href: string;
  categories: string[];
  theme?: boolean;
};

export type BucketList = {
  text: string;
  status: "todo" | "in-progress" | "done";
};

export interface UnistNode extends Node {
  type: string;
  name?: string;
  tagName?: string;
  value?: string;
  properties?: {
    __rawString__?: string;
    [key: string]: unknown;
  } & NpmCommands;
  attributes?: {
    name: string;
    value: unknown;
    type?: string;
  }[];
  children?: UnistNode[];
}

export interface UnistTree extends Node {
  children: any;
}

export interface NpmCommands {
  __pnpm__?: string;
  __yarn__?: string;
  __npm__?: string;
  __bun__?: string;
}
