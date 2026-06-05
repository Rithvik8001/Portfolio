import Link from "next/link";
import { Panel, PanelContent } from "@/components/ui/panel";
import { cn } from "@/lib/utils";

export default function NotFound() {
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
          <h1 className="text-3xl font-semibold">404</h1>
        </div>
        <Panel>
          <PanelContent className="flex flex-col gap-3">
            <p className="font-mono text-sm text-muted-foreground">
              This page doesn&apos;t exist.
            </p>
            <Link href="/" className="link text-sm">
              ← Back home
            </Link>
          </PanelContent>
        </Panel>
      </div>
    </div>
  );
}
