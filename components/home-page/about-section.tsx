import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/ui/panel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProseMono } from "../ui/typography";
import { Markdown } from "../ui/markdown";
import { USER } from "@/constants/user";

export function AboutSection() {
  return (
    <Panel id="about">
      <PanelHeader>
        <PanelTitle>About</PanelTitle>
      </PanelHeader>

      <PanelContent className="border-b border-edge">
        <ProseMono>
          <Markdown>{USER.about}</Markdown>
        </ProseMono>
        <div className="mx-auto flex w-max items-center justify-center pb-px">
          <Button asChild variant="default">
            <Link href="/about">
              <span className="block">See more about me</span>
            </Link>
          </Button>
        </div>
      </PanelContent>
    </Panel>
  );
}
