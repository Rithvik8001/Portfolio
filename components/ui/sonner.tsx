"use client";

import { CheckIcon, XIcon } from "@phosphor-icons/react/ssr";
import { useEffect, useState } from "react";
import type { ToasterProps } from "sonner";
import { Toaster as Sonner } from "sonner";

import { cn } from "@/lib/utils";

function Dot({ className, children }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-pill text-bg [&_svg]:size-3.5",
        className,
      )}
    >
      {children}
    </span>
  );
}

function useIsNarrow(maxWidth = 600) {
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const update = () => setNarrow(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [maxWidth]);

  return narrow;
}

const Toaster = ({ ...props }: ToasterProps) => {
  const narrow = useIsNarrow();

  return (
    <Sonner
      position={narrow ? "top-center" : "bottom-right"}
      duration={3200}
      offset={24}
      mobileOffset={16}
      gap={10}
      visibleToasts={3}
      closeButton
      icons={{
        success: (
          <Dot className="bg-ok">
            <CheckIcon weight="bold" />
          </Dot>
        ),
        error: <Dot className="bg-bad" />,
        warning: <Dot className="bg-warn" />,
        info: <Dot className="bg-bg/20" />,
        loading: <Dot className="bg-bg/20" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex w-[min(420px,calc(100vw-32px))] min-w-[min(320px,calc(100vw-32px))] items-center gap-3 rounded-notice bg-ink py-3.5 pr-3 pl-4 text-bg shadow-tray",
          content: "min-w-0 flex-1",
          title: "text-body font-medium text-bg",
          description: "text-small text-bg/80",
          icon: "order-first flex shrink-0 items-center justify-center",
          actionButton:
            "ml-2 inline-flex h-7 shrink-0 items-center rounded-pill bg-bg px-3 text-small font-medium text-ink outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg",
          cancelButton:
            "ml-2 inline-flex h-7 shrink-0 items-center rounded-pill bg-bg/15 px-3 text-small font-medium text-bg",
          closeButton:
            "order-last ml-1 flex size-6 shrink-0 items-center justify-center rounded-pill text-bg/80 hover:bg-bg/15 [&_svg]:size-3.5",
        },
      }}
      {...props}
    />
  );
};

const CloseIcon = XIcon;

export { CloseIcon, Toaster };
