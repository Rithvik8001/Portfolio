import { ProjectItem } from "./project-item";
import { Button } from "@/components/ui/button";
import { CollapsibleList } from "@/components/ui/collapsible-list";
import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { PROJECTS } from "@/constants/projects";
import { SOCIAL_LINKS } from "@/constants/social-links";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const GITHUB_PROFILE_HREF =
  SOCIAL_LINKS.find((link) => link.title === "GitHub")?.href ??
  "https://github.com/Rithvik8001";

export function Projects() {
  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitle>
          Projects
          <sup className="ml-1 font-mono text-sm text-muted-foreground select-none">
            ({PROJECTS.length})
          </sup>
        </PanelTitle>
      </PanelHeader>
      <CollapsibleList
        items={PROJECTS}
        max={3}
        renderItem={(item) => <ProjectItem project={item} />}
      />
      <div className="mx-auto flex h-12 w-max items-center justify-center pb-px">
        <Button asChild variant="default">
          <Link href={GITHUB_PROFILE_HREF} target="_blank" rel="noopener noreferrer">
            <span className="block">See more on GitHub</span>
            <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </Panel>
  );
}
