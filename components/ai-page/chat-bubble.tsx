import { UIMessage } from "ai";
import { marked } from "marked";
import MotionWrapper from "../shared/motion-wrapper";
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
        className="ml-auto flex max-w-xs flex-col gap-2 rounded-lg bg-blue-100 px-2.5 py-1.5 !text-sm text-blue-700"
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
      className="flex max-w-xs flex-col gap-2 rounded-lg bg-green-100 px-2.5 py-1.5 !text-sm text-emerald-700"
    ></MotionWrapper>
  );
};

export default ChatBubble;
