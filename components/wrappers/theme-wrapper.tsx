"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider defaultTheme="light">{children}</ThemeProvider>;
};

export default ThemeWrapper;
