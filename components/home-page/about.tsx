"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight, Eye } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import rithvik4 from "@/assets/rithvik-4.jpg";
import rithvik5 from "@/assets/rithvik-5.jpg";
import rithvik6 from "@/assets/rithvik-6.jpg";
import Button from "../ui/button";
import HighlightCard from "./highlight-card";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);

CustomEase.create("custom-ease-out", "0.16, 1, 0.3, 1");

const About = () => {
  const [isMounted, setIsMounted] = useState(false);
  const linesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!isMounted || !linesContainerRef.current) return null;

      const lines = linesContainerRef.current.querySelectorAll("div");
      const scroller = document.querySelector(".scroller");

      gsap.fromTo(
        lines,
        { width: 0 },
        {
          width: "100%",
          duration: 1,
          stagger: 0.2,
          ease: "custom-ease-out",
          scrollTrigger: {
            trigger: linesContainerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            scroller: scroller,
          },
        }
      );
    },
    { dependencies: [isMounted] }
  );

  if (!isMounted) return null;

  return (
    <section className="relative mx-auto px-3 md:px-[30px] max-w-[1080px]">
      <div className="absolute inset-0 px-3 md:px-[30px] py-1.5 w-full h-full">
        <div className="relative bg-secondary rounded-sm h-full overflow-hidden">
          <div className="right-0 absolute bg-card rounded-bl-md w-[12%] aspect-square">
            <div className="absolute bg-background w-full h-full rotate-45 scale-[150%] -translate-y-[50%] translate-x-[50%]"></div>
          </div>
        </div>
      </div>
      <div className="z-10 relative px-6 md:px-20 lg:px-48 py-20 lg:py-32">
        <div className="top-28 -left-16 z-10 absolute">
          <HighlightCard
            src={rithvik4}
            scrollAnimated
            className="bg-muted/15 border border-border w-28 lg:w-48 h-40 lg:h-72 rotate-[10deg]"
          />
        </div>
        <div className="-right-16 bottom-28 z-10 absolute">
          <HighlightCard
            src={rithvik5}
            scrollAnimated
            className="bg-muted/15 border border-border w-28 lg:w-48 h-40 lg:h-72 rotate-[-13deg]"
          />
        </div>
        <div className="bottom-4 -left-16 z-10 absolute">
          <HighlightCard
            src={rithvik6}
            scrollAnimated
            className="bg-muted/15 border border-border w-28 lg:w-48 h-40 lg:h-72 rotate-[-5deg]"
          />
        </div>
        <div className="top-12 left-6 absolute flex justify-center items-center bg-card rounded-full size-12">
          <Eye className="size-4" />
        </div>
        <div className="flex flex-col gap-8 lg:gap-20">
          <h1 className="relative text-[44px] xl:text-8xl text-center tracking-[-0.5px]">
            I develop <span className="text-primary">seamless</span> experiences
            <div
              ref={linesContainerRef}
              className="bottom-0 left-0 -z-10 absolute flex flex-col justify-end gap-14 lg:gap-20 w-full h-full"
            >
              <div className="bg-card w-full h-[10px]" />
              <div className="min-[659px]:hidden lg:block bg-card w-full h-[10px]" />
              <div className="min-[659px]:hidden lg:block bg-card w-full h-[10px]" />
            </div>
          </h1>
          <div className="relative flex flex-col gap-8 text-lg">
            <p className="text-muted">
              Hey, I’m Rithvik — welcome to my space on the internet! I’m a
              self-taught Full Stack Web Developer who discovered the power of
              coding and hasn’t looked back since. For me, coding is more than
              just writing lines — it’s a creative superpower that lets me bring
              any idea to life, shaping digital experiences that are not only
              functional but also meaningful and intuitive. I’m passionate about
              digging into the little details that make a big difference — the
              subtle touches that make users feel connected and engaged as they
              navigate the vast and ever-evolving world of the web.
            </p>
            <div className="bottom-0 left-0 z-[1] absolute bg-gradient-to-t from-secondary via-secondary/80 to-transparent w-full h-32 pointer-events-none"></div>
          </div>
        </div>
        <Link className="flex justify-center items-center" href="/about">
          <Button icon={<ArrowRight className="size-2" />}>
            Read more about me
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default About;
