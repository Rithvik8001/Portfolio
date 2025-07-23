"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import arrow from "@/assets/arrow.svg";
import rithvik from "@/assets/rithvik.jpg";
import rithvik1 from "@/assets/rithvik-1.jpg";
import rithvik2 from "@/assets/rithvik-2.jpg";
import rithvik3 from "@/assets/rithvik-3.jpg";
import rithvik4 from "@/assets/rithvik-4.jpg";
import rithvik5 from "@/assets/rithvik-5.jpg";
import rithvik6 from "@/assets/rithvik-6.jpg";
import AboutCard from "./about-card";

const initialCards = [
  {
    id: 1,
    src: rithvik,
    rotate: -6,
  },
  {
    id: 2,
    src: rithvik1,
    rotate: 3,
  },
  {
    id: 3,
    src: rithvik2,
    rotate: -12,
  },
  {
    id: 4,
    src: rithvik3,
    rotate: -3,
  },
  { id: 5, src: rithvik4, rotate: 6 },
  {
    id: 6,
    src: rithvik5,
    rotate: 12,
  },
  {
    id: 7,
    src: rithvik6,
    rotate: -9,
  },
];

const AboutCards = () => {
  const [cards, setCards] = useState(initialCards);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="relative w-full h-full min-h-[700px] md:min-h-[500px]">
      <div className="md:-translate-y-full">
        <div className="mx-auto p-8 lg:px-4 lg:py-20 max-w-[1080px]">
          <div className="flex flex-col items-center w-max rotate-[-10deg]">
            <p className="font-caveat text-muted-foreground">
              Pssst... You can drag the photographs
            </p>
            <Image src={arrow} alt="arrow" className="size-6 rotate-[36deg]" />
          </div>
        </div>
      </div>
      {cards.map((card) => (
        <AboutCard key={card.id} setCards={setCards} {...card} />
      ))}
    </div>
  );
};

export default AboutCards;
