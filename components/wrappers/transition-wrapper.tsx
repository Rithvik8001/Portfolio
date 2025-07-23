"use client";

import { gsap } from "gsap";
import { TransitionRouter } from "next-transition-router";
import type { ReactNode } from "react";

const TransitionWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <TransitionRouter
      auto={true}
      leave={(next) => {
        const tween = gsap.fromTo(
          ".transition-container",
          { autoAlpha: 1 },
          { autoAlpha: 0, onComplete: next, duration: 0.2 }
        );
        return () => tween.kill();
      }}
      enter={(next) => {
        const tween = gsap.fromTo(
          ".transition-container",
          { autoAlpha: 0 },
          { autoAlpha: 1, onComplete: next, duration: 0.2 }
        );
        return () => tween.kill();
      }}
    >
      <div className="flex-1 h-full transition-container">{children}</div>
    </TransitionRouter>
  );
};

export default TransitionWrapper;
