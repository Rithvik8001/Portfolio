"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import arrow from "@/assets/arrow.svg";
import rithvik from "@/assets/rithvik.jpg";
import rithvik1 from "@/assets/rithvik-1.jpg";
import rithvik2 from "@/assets/rithvik-2.jpg";
import rithvik3 from "@/assets/rithvik-3.jpg";
import HighlightCard from "./highlight-card";

const Highlights = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="z-40 relative flex lg:justify-center gap-8 lg:gap-12 lg:mx-auto px-6 py-24 lg:py-48 max-w-[1220px] overflow-x-auto lg:overflow-x-visible">
      <div className="top-0 left-0 absolute w-full h-full">
        <div className="mx-auto p-8 lg:p-20 max-w-[1080px]">
          <div className="flex flex-col items-end w-max">
            <p className="font-caveat text-muted-foreground">
              Some highlights from the gallery
            </p>
            <Image src={arrow} alt="arrow" className="size-6" />
          </div>
        </div>
      </div>
      <HighlightCard src={rithvik} cardClassName="rotate-6" />
      <HighlightCard
        src={rithvik1}
        className="top-6"
        cardClassName="rotate-[-3deg]"
      />
      <HighlightCard src={rithvik2} cardClassName="rotate-2" />
      <HighlightCard
        src={rithvik3}
        className="bottom-3"
        cardClassName="rotate-[-5deg]"
      />
    </section>
  );
};

export default Highlights;
