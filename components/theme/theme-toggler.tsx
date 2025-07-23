"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import MotionWrapper from "../wrappers/motion-wrapper";

const ThemeToggler = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="top-6 md:top-[unset] right-8 md:right-[unset] md:bottom-10 md:left-12 z-90 fixed flex justify-center items-center gap-2 bg-card/75 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none rounded-full w-8 lg:w-auto h-[26px] cursor-pointer"
    >
      <MotionWrapper
        layout
        className="flex justify-start items-center bg-muted p-0.5 rounded-full w-4 h-2.5"
        style={{
          justifyContent: theme === "dark" ? "flex-end" : "flex-start",
        }}
      >
        <MotionWrapper layout className="bg-card rounded-full size-1" />
      </MotionWrapper>
      <p className="hidden lg:block text-muted-foreground text-xs whitespace-nowrap">
        Lights on off
      </p>
    </button>
  );
};

export default ThemeToggler;
