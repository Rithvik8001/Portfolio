"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import rithvik from "@/assets/memoji.png";
import { useSlideReveal } from "@/hooks/use-slide-reveal";
import Dot from "../ui/dot";

const Hero = () => {
  const [now, setNow] = useState(new Date());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "America/Kentucky/Louisville",
  };
  const time = now.toLocaleTimeString("en-US", options);

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Kentucky/Louisville",
    timeZoneName: "shortOffset",
  });
  const parts = formatter.formatToParts(now);
  const gmtPart = parts.find((p) => p.type === "timeZoneName")?.value || "";

  useSlideReveal();

  if (!isMounted) return null;

  return (
    <section className="relative flex flex-col justify-center items-center gap-20 pt-28 xl:pt-44">
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
      <div className="relative flex flex-col justify-center items-center gap-20 w-full max-w-[1080px]">
        <div className="z-10 flex flex-col items-center gap-8">
          <div className="relative p-2 border border-border rounded-full w-max h-max">
            <Image
              src={rithvik}
              className="rounded-full size-24 object-cover"
              alt="Rithvik"
            />
          </div>
          <div className="flex flex-col items-center px-8">
            <h1
              className="text-[44px] xl:text-8xl text-center tracking-[-0.5px] slide-reveal"
              data-delay={0.3}
            >
              Hi, I'm Rithvik.
            </h1>
            <p
              className="w-full text-muted-foreground text-lg text-center slide-reveal"
              data-delay={0.5}
            >
              Breaking things to build them better, every damn day 👾
            </p>
          </div>
        </div>
      </div>
      <div className="relative px-6 md:px-12 xl:px-[calc(70px+1.5rem)] border-t border-b border-border w-full">
        <div className="top-0 left-1/2 absolute grid grid-cols-2 mx-auto px-1.5 md:px-6 w-full max-w-[1080px] h-full -translate-x-1/2 pointer-events-none">
          <Dot className="relative -translate-x-1/2 -translate-y-1/2" />
          <Dot className="relative ml-auto -translate-y-1/2 translate-x-1/2" />
          <div className="flex w-full h-full">
            <Dot className="relative mt-auto -translate-x-1/2 translate-y-1/2" />
          </div>
          <div className="flex w-full h-full">
            <Dot className="relative mt-auto ml-auto translate-x-1/2 translate-y-1/2" />
          </div>
        </div>
        <div className="flex justify-between items-center mx-auto lg:px-12 py-4 max-w-[1080px]">
          <p className="font-mono text-[10px] text-muted">
            Louisville, Kentucky
          </p>
          <p className="font-mono text-[10px] text-muted">
            {time} {gmtPart}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
