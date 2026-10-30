"use client";

import { AppProgressProvider } from "@bprogress/next";
import { ReactNode } from "react";

const AppProgressWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <AppProgressProvider
      color="var(--foreground)"
      height="2px"
      delay={500}
      options={{ showSpinner: false }}
    >
      {children}
    </AppProgressProvider>
  );
};

export default AppProgressWrapper;
