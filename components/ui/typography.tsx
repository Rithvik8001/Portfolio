import { Slot as SlotPrimitive } from "radix-ui";
import React from "react";

import { cn } from "@/lib/utils";

const Slot = SlotPrimitive.Slot;

function Prose({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="prose"
      className={cn("prose max-w-body", className)}
      {...props}
    />
  );
}

export { Prose };
