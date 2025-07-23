/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <> */
import type { UIMessage } from "ai";
import { marked } from "marked";
import MotionWrapper from "@/components/wrappers/motion-wrapper";
import { messageVariants } from "@/constants/animations";

const ChatBubble = ({ content, role }: UIMessage) => {
  if (role === "user") {
    return (
      <MotionWrapper
        type="article"
        variants={messageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        dangerouslySetInnerHTML={{ __html: marked(content) }}
        className="flex flex-col gap-2 bg-primary ml-auto px-2.5 py-1.5 rounded-lg max-w-[60%] text-background !text-sm"
      ></MotionWrapper>
    );
  }

  return (
    <MotionWrapper
      type="article"
      variants={messageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      dangerouslySetInnerHTML={{ __html: marked(content) }}
      className="flex flex-col gap-2 bg-card px-2.5 py-1.5 rounded-lg max-w-[60%] text-foreground !text-sm"
    ></MotionWrapper>
  );
};

export default ChatBubble;
