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
        <Link
          href="/about"
          className="mx-auto flex w-max cursor-pointer items-center justify-center pb-px"
        >
          <Button className="flex cursor-pointer" variant="default">
            <span className="block">See more about me</span>
          </Button>
        </Link>
      </PanelContent>
    </Panel>
  );
}
