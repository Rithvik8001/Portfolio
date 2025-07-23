"use client";

import { useChat } from "@ai-sdk/react";
import ChatBox from "./chat-box";
import ChatForm from "./chat-form";
import PremadePrompts from "./premade-prompts";

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
    <div className="mt-4 px-3 md:px-[30px] lg:px-10">
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
