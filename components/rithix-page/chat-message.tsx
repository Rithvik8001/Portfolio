import * as React from "react";

import { cn } from "@/lib/utils";
import { Prose } from "../ui/typography";
import Markdown from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
  avatar?: React.ReactNode;
  ariaHidden?: boolean;
}

export function ChatMessage({
  role,
  content,
  timestamp,
  avatar,
  ariaHidden = false,
}: ChatMessageProps) {
  const isAssistant = role === "assistant";

  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className={cn(
        "flex gap-3",
        isAssistant ? "items-start" : "items-end justify-end"
      )}
    >
      {isAssistant && avatar && <div className="shrink-0">{avatar}</div>}

      <div
        className={cn(
          "flex flex-col gap-1",
          isAssistant ? "items-start" : "items-end"
        )}
      >
        <Prose>
          <div
            className={cn(
              "[&>*:first-child]:mt-[0!important] [&>*:last-child]:mb-[0!important]",
              "[&_table]:block [&_table]:overflow-x-auto",
              isAssistant
                ? "max-w-[min(100%,36rem)] rounded-card bg-fill px-4 py-3 text-ink"
                : "max-w-[min(100%,20rem)] rounded-card bg-brand-tint px-4 py-2.5 text-brand-fg"
            )}
          >
            <Markdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[
                [
                  rehypeExternalLinks,
                  { target: "_blank", rel: ["noopener", "noreferrer"] },
                ],
              ]}
            >
              {content}
            </Markdown>
          </div>
        </Prose>
        {timestamp && (
          <span className="text-small text-fg-2">{timestamp}</span>
        )}
      </div>
    </div>
  );
}
