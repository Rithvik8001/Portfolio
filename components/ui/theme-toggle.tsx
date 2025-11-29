"use client";

import { useTheme } from "next-themes";
import { useCallback } from "react";
import { useSound } from "@/hooks/use-sound";
import { MoonIcon } from "../animated-icons/moon";
import { SunMediumIcon } from "../animated-icons/sun-medium";
import { Button } from "./button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const playClick = useSound("/audio/ui-sounds/click.wav");

  const switchTheme = useCallback(() => {
    playClick();
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme, playClick]);

  return (
    <Button variant="ghost" size="icon" onClick={switchTheme}>
      <MoonIcon className="relative hidden after:absolute after:-inset-2 [html.dark_&]:block" />
      <SunMediumIcon className="relative hidden after:absolute after:-inset-2 [html.light_&]:block" />
      <span className="sr-only">Theme Toggle</span>
    </Button>
  );
}
