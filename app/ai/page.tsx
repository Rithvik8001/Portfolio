import ChatContainer from "@/components/ai-page/chat-container";
import Footer from "@/components/shared/footer";
import { Sparkles } from "lucide-react";
import Link from "next/link";

const AIChatPage = () => {
  return (
    <main className="px-4">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-[40px] leading-12 font-medium text-primary">
          rithvik://ai
        </h1>
        <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-2.5 py-1.5 text-xs font-medium text-emerald-700">
          <Sparkles className="size-[12px]" />
          <p className="!text-xs">just for fun</p>
        </div>
      </div>
      <h2 className="mt-2 font-semibold">
        have a chat with my AI to know more about me!
      </h2>
      <ChatContainer />
      <p className="pt-4 text-sm text-muted-foreground">
        Everyone makes mistakes, including this AI powered by{" "}
        <Link
          href="https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline-offset-4 transition duration-150 ease-in-out md:hover:text-primary md:hover:underline"
        >
          GPT 4.1 Nano
        </Link>{" "}
        and{" "}
        <Link
          href="https://sdk.vercel.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline-offset-4 transition duration-150 ease-in-out md:hover:text-primary md:hover:underline"
        >
          Vercel AI SDK
        </Link>
        . Make sure to double-check important information.
      </p>
      <Footer />
    </main>
  );
};

export default AIChatPage;
