"use client";

import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import { createContext, useContext, useEffect, useRef, useState } from "react";

import { track, type AnalyticsEvent } from "@/lib/analytics";

import type { ChevronsDownUpIconHandle } from "../animated-icons/chevrons-down-up-icon";
import { ChevronsDownUpIcon } from "../animated-icons/chevrons-down-up-icon";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

type CollapsibleContextType = {
  open: boolean;
};

const CollapsibleContext = createContext<CollapsibleContextType | null>(null);

const useCollapsible = () => {
  const context = useContext(CollapsibleContext);

  if (!context) {
    throw new Error(
      "Collapsible components must be used within a CollapsibleWithContext"
    );
  }

  return context;
};

function CollapsibleWithContext({
  defaultOpen,
  trackEvent,
  trackData,
  ...props
}: React.ComponentProps<typeof Collapsible> & {
  trackEvent?: AnalyticsEvent;
  trackData?: Record<string, string>;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (trackEvent) {
      track(trackEvent, { ...trackData, state: next ? "open" : "closed" });
    }
  };

  return (
    <CollapsibleContext.Provider value={{ open }}>
      <Collapsible open={open} onOpenChange={handleOpenChange} {...props} />
    </CollapsibleContext.Provider>
  );
}

function CollapsibleChevronsIcon() {
  const { open } = useCollapsible();

  const ref = useRef<ChevronsDownUpIconHandle>(null);

  useEffect(() => {
    const controls = ref.current;
    if (!controls) return;

    if (open) {
      controls.startAnimation();
    } else {
      controls.stopAnimation();
    }
  }, [open]);

  return <ChevronsDownUpIcon ref={ref} />;
}

export {
  Collapsible,
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
};
