"use client";

import { CircleHalfIcon, MoonIcon, SunIcon } from "@phosphor-icons/react/ssr";
import { useTheme } from "next-themes";

import { captureEvent, ANALYTICS_EVENTS } from "@/lib/analytics";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

const OPTIONS = [
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
  { value: "system", label: "System", Icon: CircleHalfIcon },
] as const;

export function ThemeToggle() {
  const { theme, systemTheme, setTheme } = useTheme();

  const handleChange = (next: string) => {
    captureEvent(ANALYTICS_EVENTS.themeChanged, {
      theme: next === "system" ? (systemTheme ?? "system") : next,
      follows_system: next === "system",
    });
    setTheme(next);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="icon" aria-label="Change theme">
          <SunIcon className="size-5 dark:hidden" />
          <MoonIcon className="hidden size-5 dark:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuRadioGroup
          value={theme ?? "system"}
          onValueChange={handleChange}
        >
          {OPTIONS.map(({ value, label, Icon }) => (
            <DropdownMenuRadioItem key={value} value={value}>
              <Icon />
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
