import * as React from "react";

import { cn } from "@/lib/utils";
import { Prose } from "../ui/typography";
import Markdown from "react-markdown";

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
              "max-w-[280px] space-y-4 rounded-lg p-4 text-sm [&>*:first-child]:mt-[0!important] [&>*:last-child]:mb-[0!important]",
              isAssistant
                ? "bg-accent text-foreground"
                : "bg-primary text-primary-foreground"
            )}
          >
            <Markdown>{content}</Markdown>
          </div>
        </Prose>
        {timestamp && (
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        )}
      </div>
    </div>
  );
}
