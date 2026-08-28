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
import {
  formatChatRetryMessage,
  parseChatRequestError,
} from "@/lib/chat-request-error";
import { MAX_CHAT_MESSAGE_CHARS } from "@/lib/chat-limits";
import { Input } from "@/components/ui/input";

import { ChatMessage } from "./chat-message";

const QUICK_QUESTIONS = [
  "What technologies do you work with?",
  "Tell me about your recent projects",
  "How can I contact you for work?",
];

function getMessageText(
  parts: { type: string; text?: string }[],
): string {
  return parts
    .filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export function ChatInterface() {
  const [input, setInput] = React.useState("");

  const { messages, sendMessage, status, error, clearError } = useChat({
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
    onError: (chatError) => {
      captureError(chatError, { surface: "rithix_chat" });
    },
    onFinish: ({ isAbort, isDisconnect, isError }) => {
      if (isAbort || isDisconnect || isError) return;
      captureEvent(ANALYTICS_EVENTS.chatResponseReceived);
    },
  });

  const messagesContainerRef = React.useRef<HTMLDivElement>(null);
  const parsedError = error ? parseChatRequestError(error) : null;
  const isLoading = status === "submitted" || status === "streaming";

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
    if (!text.trim() || isLoading) return;

    clearError();
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

  const visibleMessages = messages.filter((message) => message.role !== "system");
  const lastVisibleMessage = visibleMessages.at(-1);
  const statusMessage = parsedError
    ? parsedError.retryAfterSeconds
      ? `${parsedError.message} ${formatChatRetryMessage(parsedError.retryAfterSeconds)}`
      : parsedError.message
    : status === "submitted"
      ? "Sending"
      : status === "streaming"
        ? "Rithix is replying"
        : "";

  return (
    <div className="flex h-[600px] w-full flex-col">
      <div
        ref={messagesContainerRef}
        role="log"
        aria-label="Chat messages"
        aria-busy={isLoading}
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
            {visibleMessages.map((message) => {
              const isStreamingBubble =
                isLoading &&
                message.role === "assistant" &&
                message.id === lastVisibleMessage?.id;

              return (
                <ChatMessage
                  key={message.id}
                  role={message.role as "user" | "assistant"}
                  content={getMessageText(message.parts)}
                  timestamp={new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  ariaHidden={isStreamingBubble}
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
              );
            })}
            {isLoading && (
              <div
                className="flex w-fit items-center gap-1 rounded-lg bg-accent px-4 py-2"
                aria-hidden="true"
              >
                <div className="size-2 animate-bounce rounded-full bg-foreground/40 [animation-delay:-0.3s]" />
                <div className="size-2 animate-bounce rounded-full bg-foreground/40 [animation-delay:-0.15s]" />
                <div className="size-2 animate-bounce rounded-full bg-foreground/40" />
              </div>
            )}
          </>
        )}
      </div>
      <div className="p-4">
        <div
          role={parsedError ? "alert" : "status"}
          aria-live={parsedError ? "assertive" : "polite"}
          aria-atomic="true"
          className={
            parsedError
              ? "mb-3 w-fit max-w-full rounded-full border border-destructive/30 bg-destructive/10 px-4 py-1.5 text-xs text-destructive"
              : "sr-only"
          }
        >
          {statusMessage}
        </div>
        <form
          id="chat-form"
          onSubmit={handleSubmit}
          className="flex items-center gap-2"
        >
          <label htmlFor="rithix-chat-input" className="sr-only">
            Message Rithix
          </label>
          <Input
            id="rithix-chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about my work and experience..."
            className="flex-1 shadow-none"
            disabled={isLoading}
            maxLength={MAX_CHAT_MESSAGE_CHARS}
            autoComplete="off"
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
