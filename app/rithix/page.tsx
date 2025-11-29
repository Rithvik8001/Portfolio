import { ChatInterface } from "@/components/rithix-page/chat-interface";
import { Panel } from "@/components/ui/panel";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rithix ⚡️",
  description:
    "Chat with my AI assistant to learn more about my work and experience.",
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
          <h1 className="text-3xl font-semibold">Rithix⚡️</h1>
        </div>
        <div className="p-4">
          <p className="font-mono text-sm text-balance text-muted-foreground">
            {metadata.description}
          </p>
        </div>
        <Panel>
          <ChatInterface />
        </Panel>
      </div>
    </div>
  );
}
