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
}

export function ChatMessage({
  role,
  content,
  timestamp,
  avatar,
}: ChatMessageProps) {
  const isAssistant = role === "assistant";

  return (
    <div
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
              "prose-p:my-2 prose-headings:mt-3 prose-headings:mb-1.5 prose-headings:text-sm prose-headings:font-semibold",
              "prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5 prose-li:pl-0 [&_li>ul]:my-1 [&_li>ol]:my-1",
              "prose-table:my-2 prose-table:text-xs prose-th:px-2 prose-th:py-1 prose-td:px-2 prose-td:py-1",
              "prose-pre:my-2 prose-pre:text-xs",
              "[&_table]:block [&_table]:overflow-x-auto",
              isAssistant
                ? "max-w-[min(100%,36rem)] space-y-2 rounded-2xl bg-accent px-4 py-3 font-serif text-[0.9375rem] leading-relaxed text-foreground"
                : "max-w-[min(100%,20rem)] rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground"
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
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        )}
      </div>
    </div>
  );
}
