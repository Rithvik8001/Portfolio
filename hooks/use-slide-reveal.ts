"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(CustomEase);

CustomEase.create("custom-ease-out", "0.16, 1, 0.3, 1");

export const useSlideReveal = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  // Store SplitText instances for cleanup
  const splitRefs = React.useRef<SplitText[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    document.fonts.ready
      .then(() => {
        setFontsLoaded(true);
      })
      .catch((error) => {
        console.error("Error loading fonts:", error);
        setFontsLoaded(false);
      });
  }, []);

  useEffect(() => {
    if (!isMounted || !fontsLoaded) return;

    // Helper to revert all splits
    const revertSplits = () => {
      splitRefs.current.forEach((split) => {
        if (split && typeof split.revert === "function") split.revert();
      });
      splitRefs.current = [];
    };

    // Animation logic
    const runAnimation = () => {
      revertSplits();
      const els = document.querySelectorAll(
        ".slide-reveal"
      ) as NodeListOf<HTMLElement>;

      els.forEach((el) => {
        el.style.visibility = "visible";

        const split = new SplitText(el, {
          type: "lines",
          linesClass: "slide-reveal-line",
          mask: "lines",
          autoSplit: true,
        });
        splitRefs.current.push(split);

        gsap.set(split.lines, { y: "100%", autoAlpha: 0 });

        const delay = el.dataset.delay ? parseFloat(el.dataset.delay) : 0;

        gsap.to(split.lines, {
          y: "0%",
          autoAlpha: 1,
          duration: 1,
          stagger: 0.1,
          ease: "custom-ease-out",
          delay: delay || 0,
        });
      });
    };

    // Wait for next paint to ensure DOM is ready
    const raf = requestAnimationFrame(runAnimation);

    // Handle resize
    const handleResize = () => {
      runAnimation();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      revertSplits();
    };
  }, [isMounted, fontsLoaded, pathname]);
};
