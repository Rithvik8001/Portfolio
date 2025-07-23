"use client";

import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import SplitText from "gsap/SplitText";
import { AnimatePresence } from "motion/react";
import { type ReactNode, useLayoutEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { cn } from "@/lib/utils";
import MotionWrapper from "./motion-wrapper";

gsap.registerPlugin(SplitText, CustomEase);

CustomEase.create("easeInOut", "0.87, 0, 0.13, 1");
CustomEase.create("custom-ease-out", "0.16, 1, 0.3, 1");

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useLayoutEffect(() => {
    setIsMounted(true);

    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 1250);

    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null;

  return (
    <main
      className={cn(
        "p-1.5 md:p-6 h-[calc(100vh-(68px+0.2rem))] md:h-screen overflow-hidden",
        isMobile && "pb-[48px]"
      )}
    >
      <div className="relative bg-background rounded-sm md:rounded-xl h-full overflow-y-scroll scroller">
        <AnimatePresence mode="wait" initial={false}>
          {shouldLoad && (
            <MotionWrapper
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {children}
            </MotionWrapper>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default LayoutWrapper;
