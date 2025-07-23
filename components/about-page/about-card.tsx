"use client";

import type { StaticImageData } from "next/image";
import { type Dispatch, type SetStateAction, useRef } from "react";
import { cn } from "@/lib/utils";
import MotionWrapper from "../wrappers/motion-wrapper";

type AboutCardProps = {
  className?: string;
  cardClassName?: string;
  setCards: Dispatch<
    SetStateAction<{ id: number; src: StaticImageData; rotate: number }[]>
  >;
  id: number;
  src: StaticImageData;
  rotate: number;
};

const AboutCard = ({
  className,
  cardClassName,
  setCards,
  id,
  src,
  rotate,
}: AboutCardProps) => {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <MotionWrapper
      ref={containerRef}
      className={cn(
        "top-1/2 lg:top-0 left-1/2 absolute w-64 aspect-[9/12] lg:aspect-[9/12] -translate-1/2 lg:translate-y-0 cursor-grab",
        className
      )}
      whileTap={{
        cursor: "grabbing",
      }}
    >
      <MotionWrapper
        drag
        dragConstraints={containerRef}
        dragElastic={1}
        dragTransition={{
          bounceStiffness: 200,
          bounceDamping: 15,
        }}
        onDragEnd={() => {
          setCards((prev) => {
            const newCards = prev.filter((card) => card.id !== id);

            return [{ id, src, rotate }, ...newCards];
          });
        }}
        whileTap={{
          boxShadow: "0 40px 50px rgba(0, 0, 0, 0.2)",
        }}
        style={{
          boxShadow: "0 40px 0px rgba(0, 0, 0, 0.0)",
          rotate: `${rotate}deg`,
        }}
        className={cn(
          "group relative rounded-xl w-full h-full overflow-hidden",
          cardClassName
        )}
      >
        <img
          src={src.src}
          alt="Rithvik"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform cursor-pointer pointer-events-none"
        />
      </MotionWrapper>
    </MotionWrapper>
  );
};

export default AboutCard;
