"use client";

import { useIsMobile } from "@/hooks/use-is-mobile";

const Tags = () => {
  const isMobile = useIsMobile();

  return isMobile ? (
    <div className="mt-2 flex items-center gap-1.5 font-semibold tracking-tight">
      <h2>iOS dev</h2>{" "}
      <div className="mt-1.5 size-1 rounded bg-foreground"></div>{" "}
      <h2>frontend enthusiast</h2>{" "}
      <div className="mt-1.5 size-1 rounded bg-foreground"></div>{" "}
      <h2>loves football</h2>{" "}
    </div>
  ) : (
    <div className="mt-2 flex items-center gap-1.5 font-semibold tracking-tight">
      <h2>building apps</h2>{" "}
      <div className="mt-1.5 size-1 rounded bg-foreground"></div>{" "}
      <h2>designing experiences</h2>{" "}
      <div className="mt-1.5 size-1 rounded bg-foreground"></div>{" "}
      <h2>living football</h2>{" "}
    </div>
  );
};

export default Tags;
