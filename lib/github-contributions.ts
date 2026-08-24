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
  query ContributionCalendar($from: DateTime!, $to: DateTime!) {
    viewer {
      contributionsCollection(from: $from, to: $to) {
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
    viewer?: {
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
  year: number,
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
        from: `${year}-01-01T00:00:00Z`,
        to: `${year}-12-31T23:59:59Z`,
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
    console.error("[github] GraphQL errors:", payload.errors);
    return null;
  }

  const calendar =
    payload.data?.viewer?.contributionsCollection?.contributionCalendar;

  if (!calendar) return null;

  const contributions = calendar.weeks
    .flatMap((week) => week.contributionDays)
    .filter((day) => day.date.startsWith(String(year)))
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

async function fetchFromPublicApi(year: number): Promise<ContributionsResult> {
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${USER.github}?y=${year}`,
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
      data.total?.[year] ??
      data.contributions.reduce((sum, activity) => sum + activity.count, 0),
    includesPrivate: false,
  };
}

export async function getGitHubContributions(): Promise<ContributionsResult> {
  const year = new Date().getFullYear();
  const token = process.env.GITHUB_TOKEN;

  if (token) {
    const result = await fetchFromGraphQL(year, token);
    if (result) return result;
    console.error("[github] falling back to the public contributions API");
  }

  return fetchFromPublicApi(year);
}
