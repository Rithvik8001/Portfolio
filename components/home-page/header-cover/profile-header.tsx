import { EditorStatus } from "@/components/home-page/header-cover/editor-status";
import { FlipSentences } from "@/components/ui/flip-sentences";
import { VerifiedIcon } from "./verified-icon";
import { FLIP_SENTENCES } from "@/constants/flip-sentences";

export function ProfileHeader() {
  return (
    <div className="screen-line-after flex border-x border-edge">
      <div className="shrink-0 border-r border-edge">
        <div className="relative mx-0.5 my-[3px]">
          <img
            className="size-32 rounded-full ring-1 ring-border ring-offset-2 ring-offset-background select-none sm:size-40"
            alt="Rithvik's avatar"
            src="/images/avatar.jpeg"
            fetchPriority="high"
          />
          <EditorStatus />
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex grow items-end pb-1 pl-4">
          <div className="line-clamp-1 font-mono text-xs text-zinc-300 select-none max-sm:hidden dark:text-zinc-800">
            {"text-3xl "}
            <span className="inline dark:hidden">text-zinc-950</span>
            <span className="hidden dark:inline">text-zinc-50</span>
            {" font-medium"}
          </div>
        </div>

        <div className="border-t border-edge">
          <h1 className="flex items-center pl-4 text-3xl font-semibold">
            Rithvik &nbsp;
            <VerifiedIcon
              className="size-[0.6em] translate-y-px text-info select-none"
              aria-label="Verified"
            />
          </h1>

          <div className="h-12 border-t border-edge py-1 pl-4 sm:h-auto">
            <FlipSentences className="font-mono text-sm text-balance text-muted-foreground">
              {FLIP_SENTENCES}
            </FlipSentences>
          </div>
        </div>
      </div>
    </div>
  );
}
