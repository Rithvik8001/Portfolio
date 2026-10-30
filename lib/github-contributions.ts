import "server-only";

import { USER } from "@/constants/user";
import type { Activity } from "@/components/ui/contribution-graph";
import { GitHubContributionsResponse } from "@/types";

const REVALIDATE_SECONDS = 60;

export type ContributionsResult = {
  contributions: Activity[];
  total: number;
};

export async function getGitHubContributions(): Promise<ContributionsResult> {
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${USER.github}?y=last`,
    { next: { revalidate: REVALIDATE_SECONDS } },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch GitHub contributions: ${response.statusText}`,
    );
  }

  const data = (await response.json()) as GitHubContributionsResponse;

  return {
    contributions: data.contributions,
    total:
      data.total?.lastYear ??
      data.contributions.reduce((sum, activity) => sum + activity.count, 0),
  };
}
