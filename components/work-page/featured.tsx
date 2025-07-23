"use client";

import { Code } from "lucide-react";
import { useSlideReveal } from "@/hooks/use-slide-reveal";
import Dot from "../ui/dot";
import FeaturedItem from "./featured-item";

const Featured = () => {
  useSlideReveal();

  return (
    <section className="relative flex flex-col mx-auto pt-28 xl:pt-44 w-full max-w-[1080px]">
      <div className="flex flex-col gap-12">
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
        <div className="px-3 md:px-8">
          <div className="flex flex-col gap-6">
            <div className="flex justify-center items-center bg-card rounded-full size-12">
              <Code className="size-4" />
            </div>
            <div className="lg:grid grid-cols-3">
              <h2
                className="font-heading text-[30px] lg:text-[48px] leading-[110%] text slide-reveal"
                data-delay={0.3}
              >
                Featured work
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 px-1.5 md:px-[30px]">
        <div className="bg-border w-full h-[1px]" />
      </div>
      <div className="relative flex flex-col gap-2 md:grid md:grid-cols-2 px-3 md:px-[30px] pt-1.5">
        <FeaturedItem />
        <FeaturedItem />
      </div>
    </section>
  );
};

export default Featured;
