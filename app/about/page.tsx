import { Panel, PanelContent } from "@/components/ui/panel";
import { ProseMono } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import SectionSeparator from "@/components/ui/section-separator";
import { SpotifyNowPlaying } from "@/components/about-page/spotify-now-playing";
import { TechStack } from "@/components/about-page/tech-stack";
import { Beliefs } from "@/components/about-page/beliefs";
import { BucketList } from "@/components/about-page/bucket-list";

export const metadata: Metadata = {
  title: "About me",
  description: "All about me, my background, skills, and interests.",
};

export default function Page() {
  return (
    <div className="mx-auto border-x border-edge md:max-w-3xl">
      <div
        className={cn(
          "h-8 px-2",
          "screen-line-after",
          "before:absolute before:-left-[100vw] before:-z-1 before:h-full before:w-[200vw]",
          "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56"
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
                Outside of coding, I'm a dedicated football fanatic. I've been
                watching the beautiful game since I was 16, and my heart beats
                for Manchester United — the biggest club in England. Their
                resilience, teamwork, and legacy inspire me every day, on and
                off the field. GGMU! ❤️
              </p>
              <p>
                I'm also a huge Apple fan — their innovation, design philosophy,
                and dedication to crafting seamless, human-centered experiences
                have deeply inspired me. It's not just about loving their
                products, but embracing the way Apple approaches technology:
                with simplicity, elegance, and relentless attention to detail.
                This mindset drives how I build software — aiming to create
                experiences that feel natural, intuitive, and thoughtfully
                crafted, just like the products I admire.
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
        <SpotifyNowPlaying />
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
