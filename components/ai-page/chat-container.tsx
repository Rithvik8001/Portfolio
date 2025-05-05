"use client";

import ChatBox from "./chat-bot";
import ChatForm from "./chat-form";
import PremadePrompts from "./premade-prompts";
import { useChat } from "@ai-sdk/react";

const ChatContainer = () => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
    status,
    stop,
  } = useChat({});

  return (
    <div className="mt-4">
      <ChatBox messages={messages} />
      <PremadePrompts setInput={setInput} />
      <ChatForm
        value={input}
        handleSubmit={handleSubmit}
        onChange={handleInputChange}
        status={status}
        stop={stop}
      />
    </div>
  );
};

export default ChatContainer;
