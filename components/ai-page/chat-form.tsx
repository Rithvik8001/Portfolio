"use client";

import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

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
      className="flex bg-secondary mt-4 border border-border rounded-full"
    >
      <input
        type="text"
        className="flex-1 px-4 py-2.5 rounded-l-full focus:outline-none active:focus:outline-none focus:ring-0 font-light placeholder:text-muted-foreground/50 !text-sm cursor-auto secondary"
        placeholder="Ask about me or my work!"
        value={value}
        onChange={onChange}
        disabled={!isReady}
      />
      <button
        type="submit"
        aria-label="Send message"
        className="px-1.5 rounded-r-full focus:outline-none active:focus:outline-none focus:ring-0"
        name="send message"
        disabled={!isReady}
      >
        <div
          className={cn(
            "bg-primary p-2 rounded-full text-background md:hover:scale-95 transition duration-300 ease-in-out cursor-pointer",
            !isReady && "cursor-not-allowed bg-muted text-muted-foreground"
          )}
        >
          <ArrowUp className="size-4 text-inherit" />
        </div>
      </button>
    </form>
  );
};

export default ChatForm;
