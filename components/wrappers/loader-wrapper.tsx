"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AppleHelloEnglishEffect } from "@/components/ui/apple-hello-effect";

export function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [isFinished, setIsFinished] = useState(false);

  return (
    <AnimatePresence mode="popLayout">
      {!isFinished ? (
        <motion.div
          key="intro"
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AppleHelloEnglishEffect
            onAnimationComplete={() => setIsFinished(true)}
          />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          className="h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
