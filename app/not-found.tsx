"use client";

import Link from "next/link";
import { useSlideReveal } from "@/hooks/use-slide-reveal";

const NotFoundPage = () => {
  useSlideReveal();

  return (
    <div className="relative flex-1 min-h-screen flex flex-col justify-center items-center overflow-hidden z-50 pt-20 md:pt-24">
      <div className="top-0 left-0 bg-border w-full h-[1px] pointer-events-none" />
      <div className="top-0 left-1/2 absolute flex justify-between px-1.5 md:px-6 w-full max-w-[1080px] h-full -translate-x-1/2 pointer-events-none">
        <div className="bg-border w-[1px] h-full" />
        <div className="border-border border-l border-dashed w-[1px] h-full" />
        <div className="md:bg-transparent bg-border md:border-border md:border-l md:border-dashed w-[1px] h-full" />
        <div className="hidden md:block bg-border w-[1px] h-full" />
      </div>
      <section className="flex flex-col justify-center items-center gap-2 h-full text-center px-2 sm:px-4 md:px-0 w-full">
        <h1 className="text-5xl sm:text-7xl md:text-8xl slide-reveal font-heading">
          404 {":("}
        </h1>
        <p
          className="text-base sm:text-lg md:text-xl text-muted-foreground slide-reveal max-w-xs sm:max-w-md md:max-w-xl mx-auto"
          data-delay={0.3}
        >
          Oops! Got lost or something? just go back to the{" "}
          <Link
            href="/"
            className="text-foreground hover:text-primary hover:underline transition-colors"
          >
            homepage!
          </Link>
        </p>
      </section>
    </div>
  );
};

export default NotFoundPage;
