import { USER } from "@/constants/user";
import { GitHubContributionsResponse } from "@/types";

export async function getGitHubContributions() {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${USER.github}?y=last`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch GitHub contributions: ${res.statusText}`);
  }

  const data = (await res.json()) as GitHubContributionsResponse;

  const total =
    data.total?.lastYear ??
    data.contributions.reduce((sum, activity) => sum + activity.count, 0);

  return {
    contributions: data.contributions,
    total,
  };
}
