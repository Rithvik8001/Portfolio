/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <> */
/** biome-ignore-all lint/style/noNonNullAssertion: <> */
"use client";

import type { UIMessage } from "ai";
import { marked } from "marked";
import { AnimatePresence } from "motion/react";
import { useEffect, useRef } from "react";
import { messageVariants } from "@/constants/animations";
import MotionWrapper from "../wrappers/motion-wrapper";
import ChatBubble from "./chat-bubble";

type ChatBoxProps = {
  messages: UIMessage[];
};

const ChatBox = ({ messages }: ChatBoxProps) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const renderer = new marked.Renderer();

  renderer.code = ({ text, lang }) => {
    const languageClass = lang ? `language-${lang}` : "";
    return `<pre class="p-1.5 overflow-auto"><code class="${languageClass} bg-green-50 rounded-md p-2 text-slate-700 whitespace-pre-wrap break-words text-xs">${text}</code></pre>`;
  };

  renderer.link = ({ href, text }) =>
    `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-indigo-700 hover:text-black underline hover:underline underline-offset-2 transition duration-150 ease-in-out [word-break:_break-all]">${text}</a>`;

  marked.setOptions({ renderer });

  useEffect(() => {
    if (chatContainerRef.current) {
      const scrollToBottom = () => {
        chatContainerRef.current!.scrollTo({
          top: chatContainerRef.current!.scrollHeight,
          behavior: "smooth",
        });
      };

      setTimeout(scrollToBottom, 100);
    }
  }, [messages]);

  return (
    <div
      ref={chatContainerRef}
      className="flex flex-col flex-1 gap-2 bg-secondary p-4 border border-border rounded-lg h-[390px] overflow-y-auto"
    >
      <AnimatePresence mode="popLayout">
        {messages.map((message, i) => (
          <ChatBubble key={`${message.id}-${i}`} {...message} />
        ))}
        {messages.length === 0 && (
          <MotionWrapper
            variants={messageVariants}
            initial="initial"
            animate={{
              ...messageVariants.animate,
              transition: { ...messageVariants.animate.transition, delay: 0.8 },
            }}
            exit="exit"
            className="flex justify-start mb-4"
          >
            <div className="flex flex-col gap-2 bg-card px-2.5 py-1.5 rounded-lg max-w-[60%] text-foreground !text-sm">
              <p>
                Hi! I'm{" "}
                <span className="font-semibold">Rithvik's AI persona</span>. Ask
                me anything about him or his work. I'll be happy to assist you!
              </p>
            </div>
          </MotionWrapper>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBox;
