import "server-only";

import { USER } from "@/constants/user";
import type { Activity } from "@/components/ui/contribution-graph";
import { GitHubContributionsResponse } from "@/types";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const REVALIDATE_SECONDS = 60;

const CONTRIBUTION_LEVELS: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const CONTRIBUTIONS_QUERY = `
  query ContributionCalendar($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

type GraphQLCalendar = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
              contributionLevel: string;
            }[];
          }[];
        };
      };
    };
  };
  errors?: { message: string }[];
};

export type ContributionsResult = {
  contributions: Activity[];
  total: number;
  includesPrivate: boolean;
};

async function fetchFromGraphQL(
  token: string,
): Promise<ContributionsResult | null> {
  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: {
        login: USER.github,
      },
    }),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    console.error(`[github] GraphQL request failed: ${response.status}`);
    return null;
  }

  const payload = (await response.json()) as GraphQLCalendar;

  if (payload.errors?.length) {
    console.error("[github] GraphQL returned errors");
    return null;
  }

  const calendar =
    payload.data?.user?.contributionsCollection?.contributionCalendar;

  if (!calendar) return null;

  const contributions = calendar.weeks
    .flatMap((week) => week.contributionDays)
    .map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: CONTRIBUTION_LEVELS[day.contributionLevel] ?? 0,
    }));

  return {
    contributions,
    total: calendar.totalContributions,
    includesPrivate: true,
  };
}

async function fetchFromPublicApi(): Promise<ContributionsResult> {
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
    includesPrivate: false,
  };
}

export async function getGitHubContributions(): Promise<ContributionsResult> {
  const token = process.env.GITHUB_TOKEN;

  if (token) {
    try {
      const result = await fetchFromGraphQL(token);
      if (result) return result;
    } catch {
      console.error("[github] GraphQL request unavailable");
    }
    console.error("[github] falling back to the public contributions API");
  }

  return fetchFromPublicApi();
}
