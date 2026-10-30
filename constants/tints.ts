export const TINTS = [
  "violet",
  "blue",
  "orange",
  "red",
  "green",
  "pink",
  "amber",
  "cyan",
  "indigo",
] as const;

export type Tint = (typeof TINTS)[number];

export const TINT_CLASSES: Record<Tint | "neutral", string> = {
  violet: "bg-tint-violet text-on-tint-violet",
  blue: "bg-tint-blue text-on-tint-blue",
  orange: "bg-tint-orange text-on-tint-orange",
  red: "bg-tint-red text-on-tint-red",
  green: "bg-tint-green text-on-tint-green",
  pink: "bg-tint-pink text-on-tint-pink",
  amber: "bg-tint-amber text-on-tint-amber",
  cyan: "bg-tint-cyan text-on-tint-cyan",
  indigo: "bg-tint-indigo text-on-tint-indigo",
  neutral: "bg-fill text-fg-2",
};

export const CATEGORY_TINT = {
  project: "violet",
  code: "blue",
  education: "amber",
  business: "orange",
  design: "pink",
  idea: "amber",
  place: "cyan",
  contact: "green",
  social: "indigo",
} as const satisfies Record<string, Tint>;
