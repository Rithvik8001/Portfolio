"use client";

import { CaretDownIcon } from "@phosphor-icons/react/ssr";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import { createContext, useContext, useState } from "react";

import { cn } from "@/lib/utils";

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
      "Collapsible components must be used within a CollapsibleWithContext",
    );
  }

  return context;
};

function CollapsibleWithContext({
  defaultOpen,
  ...props
}: React.ComponentProps<typeof Collapsible>) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  return (
    <CollapsibleContext.Provider value={{ open }}>
      <Collapsible open={open} onOpenChange={setOpen} {...props} />
    </CollapsibleContext.Provider>
  );
}

function CollapsibleCaret({ className }: { className?: string }) {
  const { open } = useCollapsible();

  return (
    <CaretDownIcon
      aria-hidden
      className={cn(
        "size-4 text-fg-2 transition-transform duration-ui ease-std",
        open && "rotate-180",
        className,
      )}
    />
  );
}

export {
  Collapsible,
  CollapsibleCaret,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
  useCollapsible,
};
