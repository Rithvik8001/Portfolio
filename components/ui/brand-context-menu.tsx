"use client";

import { TextTIcon as TypeIcon } from "@phosphor-icons/react/ssr";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { copyText } from "@/lib/utils";
import { captureEvent, ANALYTICS_EVENTS } from "@/lib/analytics";
import { RithvikMark, getMarkSVG } from "./rithvik-mark";
import { getWordmarkSVG } from "./rithvik-wordmark";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export function BrandContextMenu({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const markColor = resolvedTheme === "dark" ? "#f2f1ee" : "#1a1917";

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>

      <ContextMenuContent className="w-64">
        <ContextMenuItem
          onClick={() => {
            const svg = getMarkSVG(markColor);
            copyText(svg);
            captureEvent(ANALYTICS_EVENTS.brandAssetCopied, { asset: "mark" });
            toast.success("Copied the mark as SVG");
          }}
        >
          <RithvikMark />
          Copy mark as SVG
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            const svg = getWordmarkSVG(markColor);
            copyText(svg);
            captureEvent(ANALYTICS_EVENTS.brandAssetCopied, { asset: "wordmark" });
            toast.success("Copied the logotype as SVG");
          }}
        >
          <TypeIcon />
          Copy logotype as SVG
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
