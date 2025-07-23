"use client";

import { BotMessageSquare } from "lucide-react";
import { useSlideReveal } from "@/hooks/use-slide-reveal";

const Header = () => {
  useSlideReveal();

  return (
    <section className="relative flex flex-col gap-8">
      <div className="flex justify-center items-center bg-card ml-3 md:ml-[30px] lg:ml-10 rounded-full size-12">
        <BotMessageSquare className="size-4" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 px-3 md:px-[30px] lg:px-10">
        <h1
          className="md:col-span-2 font-heading text-[28px] lg:text-[48px] leading-[110%] slide-reveal"
          data-delay={0.3}
        >
          <span className="text-muted-foreground-secondary">Rithix ⚡</span>{" "}
          <br />
          Have a chat with my <span className="text-primary">AI</span> to know
          more about me!
        </h1>
      </div>
    </section>
  );
};

export default Header;
