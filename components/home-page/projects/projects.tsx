import { ProjectItem } from "./project-item";
import { Button } from "@/components/ui/button";
import { CollapsibleList } from "@/components/ui/collapsible-list";
import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { PROJECTS } from "@/constants/projects";
import { SOCIAL_LINKS } from "@/constants/social-links";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

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
      <Link
        href={SOCIAL_LINKS[1].href}
        target="_blank"
        className="mx-auto flex h-12 w-max cursor-pointer items-center justify-center pb-px"
      >
        <Button className="flex cursor-pointer" variant="default">
          <span className="block">See more on GitHub</span>
          <ArrowUpRight />
        </Button>
      </Link>
    </Panel>
  );
}
