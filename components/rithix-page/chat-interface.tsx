"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { SendIcon } from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { USER } from "@/constants/user";
import {
  ANALYTICS_EVENTS,
  captureError,
  captureEvent,
  getAnalyticsContext,
} from "@/lib/analytics";
import { Input } from "@/components/ui/input";

import { ChatMessage } from "./chat-message";

const QUICK_QUESTIONS = [
  "What technologies do you work with?",
  "Tell me about your recent projects",
  "How can I contact you for work?",
];

export function ChatInterface() {
  const [input, setInput] = React.useState("");

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      headers: (): Record<string, string> => {
        const context = getAnalyticsContext();
        if (!context) return {};
        return {
          "x-posthog-distinct-id": context.distinctId,
          "x-posthog-session-id": context.sessionId ?? "",
        };
      },
    }),
    onError: (error) => {
      captureError(error, { surface: "rithix_chat" });
    },
    onFinish: () => {
      captureEvent(ANALYTICS_EVENTS.chatResponseReceived);
    },
  });

  const messagesContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    captureEvent(ANALYTICS_EVENTS.chatMessageSent, {
      length: text.length,
      turn: messages.length + 1,
    });
    sendMessage({ text });
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  const handleQuickQuestion = (question: string) => {
    captureEvent(ANALYTICS_EVENTS.chatQuickQuestionClicked, { question });
    handleSend(question);
  };

  const isLoading = status !== "ready";

  return (
    <div className="flex h-[600px] w-full flex-col">
      <div
        ref={messagesContainerRef}
        className="flex flex-1 flex-col gap-4 overflow-y-auto p-4"
      >
        {messages.length === 0 ? (
          <>
            <ChatMessage
              role="assistant"
              content="Hello! I'm Rithix ⚡, Rithvik's Portfolio Assistant. How can I help you?"
              avatar={
                <Image
                  src={USER.avatar}
                  alt={`${USER.fullName} avatar`}
                  width={32}
                  height={32}
                  className="size-8 rounded-full object-cover ring-1 ring-border"
                  loading="eager"
                  unoptimized
                />
              }
            />
            <div className="flex flex-col gap-2">
              <p className="text-xs text-muted-foreground">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_QUESTIONS.map((question, index) => (
                  <button
                    key={index}
                    className="max-w-full truncate rounded-full border border-input bg-background px-4 py-1.5 text-xs whitespace-nowrap transition-colors hover:bg-accent hover:text-accent-foreground"
                    onClick={() => handleQuickQuestion(question)}
                    disabled={isLoading}
                  >
                    {question}
                  </button>
                ))}
              </div>
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
                      <Image
                  src={USER.avatar}
                  alt={`${USER.fullName} avatar`}
                  width={32}
                  height={32}
                  className="size-8 rounded-full object-cover ring-1 ring-border"
                  loading="eager"
                  unoptimized
                />
                    ) : undefined
                  }
                />
              ))}
            {isLoading && (
              <div className="flex w-fit items-center gap-1 rounded-lg bg-accent px-4 py-2">
                <div className="size-2 animate-bounce rounded-full bg-foreground/40 [animation-delay:-0.3s]" />
                <div className="size-2 animate-bounce rounded-full bg-foreground/40 [animation-delay:-0.15s]" />
                <div className="size-2 animate-bounce rounded-full bg-foreground/40" />
              </div>
            )}
          </>
        )}
      </div>
      <div className="p-4">
        <form
          id="chat-form"
          onSubmit={handleSubmit}
          className="flex items-center gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about my work and experience..."
            className="flex-1 shadow-none"
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
