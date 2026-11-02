"use client";

import { useEffect, useRef, useState } from "react";

const BASE_CHARS_PER_SECOND = 90;
const CATCH_UP_SECONDS = 0.6;

export function useSmoothText(target: string, streaming: boolean) {
  const [shown, setShown] = useState(streaming ? 0 : target.length);
  const shownRef = useRef(shown);
  const frameRef = useRef<number | null>(null);
  const lastTickRef = useRef<number | null>(null);

  useEffect(() => {
    if (!streaming && shownRef.current >= target.length) return;

    const tick = (now: number) => {
      const last = lastTickRef.current ?? now;
      const elapsed = (now - last) / 1000;
      lastTickRef.current = now;

      const backlog = target.length - shownRef.current;
      const rate = Math.max(
        BASE_CHARS_PER_SECOND,
        backlog / CATCH_UP_SECONDS,
      );
      const next = Math.min(
        target.length,
        shownRef.current + Math.max(1, Math.round(rate * elapsed)),
      );

      if (next !== shownRef.current) {
        shownRef.current = next;
        setShown(next);
      }

      if (next < target.length || streaming) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        frameRef.current = null;
        lastTickRef.current = null;
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      lastTickRef.current = null;
    };
  }, [target, streaming]);

  const settled = !streaming && shown >= target.length;

  return {
    text: settled ? target : target.slice(0, shown),
    settled,
  };
}
