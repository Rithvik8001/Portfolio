"use client";

import { MessageCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatWidgetButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export function ChatWidgetButton({ onClick, isOpen }: ChatWidgetButtonProps) {
  return (
    <Button
      size="icon-lg"
      onClick={onClick}
      className={cn(
        "fixed right-4 bottom-4 z-50 size-14 rounded-full shadow-popover transition-all hover:scale-105 md:right-6 md:bottom-6",
        isOpen && "scale-0"
      )}
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      <MessageCircleIcon className="size-6" />
    </Button>
  );
}
