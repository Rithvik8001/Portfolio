"use client";

import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";

type ChatFormProps = {
  value: string;
  handleSubmit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  status: "submitted" | "streaming" | "ready" | "error";
  stop: () => void;
};

const ChatForm = ({ value, handleSubmit, onChange, status }: ChatFormProps) => {
  const isReady = status === "ready";

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex rounded-full border border-muted-foreground/20"
    >
      <input
        type="text"
        className="flex-1 cursor-auto rounded-l-full bg-amber-50/50 px-4 py-2.5 !text-sm font-light placeholder:text-muted-foreground/50 focus:ring-0 focus:outline-none active:focus:outline-none"
        placeholder="Ask about me or my work!"
        value={value}
        onChange={onChange}
        disabled={!isReady}
      />
      <button
        type="submit"
        aria-label="Send message"
        className="rounded-r-full px-1.5 focus:ring-0 focus:outline-none active:focus:outline-none"
        name="send message"
        disabled={!isReady}
      >
        <div
          className={cn(
            "rounded-full bg-primary p-2 text-primary-foreground transition duration-300 ease-in-out md:hover:scale-95",
            !isReady && "cursor-not-allowed bg-primary-foreground text-primary"
          )}
        >
          <ArrowUp className="size-4 text-inherit" />
        </div>
      </button>
    </form>
  );
};

export default ChatForm;
