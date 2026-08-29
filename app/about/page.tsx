import { Panel, PanelContent } from "@/components/ui/panel";
import { ProseMono } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import SectionSeparator from "@/components/ui/section-separator";
import { TechStack } from "@/components/about-page/tech-stack";
import { Beliefs } from "@/components/about-page/beliefs";
import { BucketList } from "@/components/about-page/bucket-list";

export const metadata: Metadata = {
  title: "About",
  description:
    "How Rithvik Pallamreddy got into full stack development, the tools he uses daily, what he believes about building software, and what is on his bucket list.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About — Rithvik Pallamreddy",
    description:
      "How Rithvik Pallamreddy got into full stack development, the tools he uses daily, what he believes about building software, and what is on his bucket list.",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@rithvik1907",
    title: "About — Rithvik Pallamreddy",
    description:
      "How Rithvik Pallamreddy got into full stack development, the tools he uses daily, what he believes about building software, and what is on his bucket list.",
  },
};

export default function Page() {
  return (
    <div className="mx-auto border-x border-edge md:max-w-3xl">
      <div
        className={cn(
          "h-8 px-2",
          "screen-line-after",
          "before:absolute before:-left-[100vw] before:-z-1 before:h-full before:w-[200vw]",
          "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        )}
      />
      <div className="min-h-svh">
        <div className="screen-line-after px-4">
          <h1 className="text-3xl font-semibold">About me</h1>
        </div>
        <div className="p-4">
          <p className="font-mono text-sm text-balance text-muted-foreground">
            {metadata.description}
          </p>
        </div>
        <Panel id="about">
          <PanelContent>
            <ProseMono>
              <p>
                Hey, I'm Rithvik — welcome to my space on the internet! I'm a
                self-taught Full Stack Web Developer who discovered the power of
                coding and hasn't looked back since. For me, coding is more than
                just writing lines — it's a creative superpower that lets me
                bring any idea to life, shaping digital experiences that are not
                only functional but also meaningful and intuitive. I'm
                passionate about digging into the little details that make a big
                difference — the subtle touches that make users feel connected
                and engaged as they navigate the vast and ever-evolving world of
                the web.
              </p>
              <p>
                Away from the keyboard, it's football. I started watching at 16
                and picked Manchester United, which means I've spent most of
                that time being told I picked the wrong decade. I don't care.
                I've watched us have seasons worth forgetting and still lost
                sleep over a Tuesday night result. That's the whole thing,
                really — you don't support a club because it's winning, you
                support it because at some point it got under your skin and
                never left. GGMU. ❤️
              </p>
              <p>
                I'm also an Apple obsessive, and not in the buy-everything way —
                in the way where I'll notice how a sheet settles when you
                dismiss it, or that the haptic fires a beat before the animation
                lands, and think about it for the rest of the day. Somebody
                argued about that. Somebody said no to a hundred other versions
                of it. That's the standard I hold my own work to: fewer things,
                done properly, until using it feels obvious.
              </p>
              <p>
                This journey of learning, creating, and growing keeps me
                motivated every day. Whether it's solving complex problems,
                refining user experiences, or cheering for a Man U goal, I bring
                passion and dedication to everything I do.
              </p>
            </ProseMono>
          </PanelContent>
        </Panel>
        <SectionSeparator />
        <TechStack />
        <SectionSeparator />
        <Beliefs />
        <SectionSeparator />
        <BucketList />
        <SectionSeparator />
      </div>
    </div>
  );
}
