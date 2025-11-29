import Image from "next/image";

import { SimpleTooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "../ui/panel";
import { SKILLS } from "@/constants/skills";

export function Skills() {
  return (
    <Panel id="stack">
      <PanelHeader>
        <PanelTitle>Skills</PanelTitle>
      </PanelHeader>

      <PanelContent
        className={cn(
          "[--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5",
          "bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center",
          "bg-zinc-950/0.75 dark:bg-white/0.75"
        )}
      >
        <ul className="flex flex-wrap gap-4 select-none">
          {SKILLS.map((tech, index) => {
            const content = (
              <a
                href={tech.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tech.title}
              >
                {tech.theme ? (
                  <>
                    <Image
                      src={`/assets/tech-icons/${tech.key}-light.svg`}
                      alt={`${tech.title} light icon`}
                      width={32}
                      height={32}
                      className="hidden [html.light_&]:block"
                      unoptimized
                    />
                    <Image
                      src={`/assets/tech-icons/${tech.key}-dark.svg`}
                      alt={`${tech.title} dark icon`}
                      width={32}
                      height={32}
                      className="hidden [html.dark_&]:block"
                      unoptimized
                    />
                  </>
                ) : (
                  <>
                    {index === 0 ? (
                      /* Debug: Use standard img tag for first item */
                      <img
                        src={`/assets/tech-icons/${tech.key}.svg`}
                        alt={`${tech.title} icon`}
                        width={32}
                        height={32}
                        style={{ display: "block" }}
                      />
                    ) : (
                      <Image
                        src={`/assets/tech-icons/${tech.key}.svg`}
                        alt={`${tech.title} icon`}
                        width={32}
                        height={32}
                        unoptimized
                      />
                    )}
                  </>
                )}
                <span className="sr-only">{tech.title}</span>
              </a>
            );

            return (
              <li key={tech.key} className="flex">
                <SimpleTooltip content={tech.title}>{content}</SimpleTooltip>
              </li>
            );
          })}
        </ul>
      </PanelContent>
    </Panel>
  );
}
