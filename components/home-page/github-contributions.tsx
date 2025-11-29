import { getGitHubContributions } from "@/lib/github-contributions";
import { Suspense } from "react";
import { Panel } from "../ui/panel";
import {
  GitHubContributionFallback,
  GitHubContributionGraph,
} from "../ui/github-contribution-graph";

export function GitHubContributions() {
  const contributions = getGitHubContributions();

  return (
    <Panel>
      <h2 className="sr-only">GitHub Contributions</h2>

      <Suspense fallback={<GitHubContributionFallback />}>
        <GitHubContributionGraph contributions={contributions} />
      </Suspense>
    </Panel>
  );
}
