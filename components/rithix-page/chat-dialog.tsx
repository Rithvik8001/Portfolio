"use client";

import { SendIcon, XIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChatMessage } from "./chat-message";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Input } from "../ui/input";

interface ChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_QUESTIONS = [
  "What technologies do you work with?",
  "Tell me about your recent projects",
  "How can I contact you for work?",
];

export function ChatDialog({ isOpen, onClose }: ChatDialogProps) {
  const [input, setInput] = React.useState("");

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    sendMessage({ text });
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  const handleQuickQuestion = (question: string) => {
    handleSend(question);
  };

  const isLoading = status !== "ready";

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed right-4 bottom-20 z-50 w-full max-w-[400px] rounded-2xl bg-popover shadow-popover ring ring-popover-border transition-all duration-200",
        "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4",
        "md:right-6"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
              R
            </div>
            <div className="absolute right-0 bottom-0 size-3 rounded-full bg-success ring-2 ring-popover" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">
              Rithvik's Portfolio Assistant
            </h3>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-success" />
              Online
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-xs opacity-50 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:outline-hidden"
          aria-label="Close chat"
        >
          <XIcon className="size-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex max-h-[400px] flex-col gap-4 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <>
            <ChatMessage
              role="assistant"
              content="Hello! I'm Rithvik's Portfolio Assistant. How can I help you?"
              avatar={
                <div className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  R
                </div>
              }
            />

            {/* Quick Questions */}
            <div className="flex flex-col gap-2">
              <p className="text-xs text-muted-foreground">Quick questions:</p>
              {QUICK_QUESTIONS.map((question, index) => (
                <button
                  key={index}
                  className="rounded-lg border border-input bg-background px-3 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  onClick={() => handleQuickQuestion(question)}
                  disabled={isLoading}
                >
                  {question}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            {messages
              .filter((message) => message.role !== "system")
              .map((message, index) => (
                <ChatMessage
                  key={index}
                  role={message.role as "user" | "assistant"}
                  content={
                    typeof message.parts === "string"
                      ? message.parts
                      : message.parts
                          .filter((part) => part.type === "text")
                          .map((part: any) => part.text)
                          .join("")
                  }
                  timestamp={new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  avatar={
                    message.role === "assistant" ? (
                      <div className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                        R
                      </div>
                    ) : undefined
                  }
                />
              ))}
            {isLoading && (
              <div className="flex items-center gap-1 rounded-lg bg-accent px-4 py-2">
                <div className="size-2 animate-bounce rounded-full bg-foreground/40 [animation-delay:-0.3s]" />
                <div className="size-2 animate-bounce rounded-full bg-foreground/40 [animation-delay:-0.15s]" />
                <div className="size-2 animate-bounce rounded-full bg-foreground/40" />
              </div>
            )}
          </>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-4">
        <form
          id="chat-form"
          onSubmit={handleSubmit}
          className="flex items-center gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about my work and experience..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            size="icon"
            type="submit"
            disabled={!input.trim() || isLoading}
            className="shrink-0"
          >
            <SendIcon className="size-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
