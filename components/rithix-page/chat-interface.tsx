"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { SendIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
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
    }),
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
                <div className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  R
                </div>
              }
            />
            <div className="flex flex-col gap-2">
              <p className="text-xs text-muted-foreground">Quick questions:</p>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
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
