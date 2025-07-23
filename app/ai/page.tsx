import type { Metadata } from "next";
import Link from "next/link";
import ChatContainer from "@/components/ai-page/chat-container";
import Header from "@/components/ai-page/header";
import Dot from "@/components/ui/dot";

export const metadata: Metadata = {
  title: "Have a chat 🤖",
};

const AI = () => {
  return (
    <div className="relative">
      <div className="top-0 left-0 absolute py-1.5 md:py-[60px] w-full h-full">
        <div className="bg-border w-full h-[1px]" />
        <div className="flex justify-between items-center mx-auto px-1.5 md:px-6 w-full max-w-[1080px] pointer-events-none">
          <Dot className="z-10 relative -translate-x-1/2 -translate-y-1/2" />
          <Dot className="z-10 relative -translate-y-1/2 translate-x-1/2" />
        </div>
      </div>
      <div className="top-0 left-1/2 absolute flex justify-between px-1.5 md:px-6 w-full max-w-[1080px] h-full -translate-x-1/2">
        <div className="bg-border w-[1px] h-full" />
        <div className="border-border border-l border-dashed w-[1px] h-full" />
        <div className="md:bg-transparent bg-border md:border-border md:border-l md:border-dashed w-[1px] h-full" />
        <div className="hidden md:block bg-border w-[1px] h-full" />
      </div>
      <div className="relative mx-auto pt-36 lg:pt-52 pb-12 max-w-[1080px]">
        <Header />
        <ChatContainer />
        <p className="px-3 md:px-[30px] lg:px-10 pt-4 text-muted-foreground text-sm">
          Everyone makes mistakes, including this AI powered by{" "}
          <Link
            href="https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground md:hover:text-primary md:hover:underline underline-offset-4 transition duration-150 ease-in-out"
          >
            GPT 4o Mini
          </Link>{" "}
          and{" "}
          <Link
            href="https://sdk.vercel.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground md:hover:text-primary md:hover:underline underline-offset-4 transition duration-150 ease-in-out"
          >
            Vercel AI SDK
          </Link>
          . Make sure to double-check important information.
        </p>
      </div>
    </div>
  );
};

export default AI;
