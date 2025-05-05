"use client";

import { UIMessage } from "ai";
import ChatBubble from "./chat-bubble";
import { useEffect, useRef } from "react";
import { AnimatePresence } from "motion/react";
import { marked } from "marked";
import MotionWrapper from "../shared/motion-wrapper";
import { messageVariants } from "@/constants/animation";

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
    `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-indigo-700 underline underline-offset-2 [word-break:_break-all] transition duration-150 ease-in-out hover:text-black hover:underline">${text}</a>`;

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
      className="flex h-[390px] flex-1 flex-col gap-2 overflow-y-auto rounded-lg border border-muted-foreground/20 bg-amber-50/50 p-4"
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
              transition: { ...messageVariants.animate.transition, delay: 0.2 },
            }}
            exit="exit"
            className="mb-4 flex justify-start"
          >
            <div className="flex max-w-xs flex-col gap-2 rounded-lg bg-green-100 px-2.5 py-1.5 !text-sm text-emerald-700">
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
