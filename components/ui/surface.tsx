import { cva, type VariantProps } from "class-variance-authority";
import { Slot as SlotPrimitive } from "radix-ui";

import { TINT_CLASSES, type Tint } from "@/constants/tints";
import { cn } from "@/lib/utils";

const Slot = SlotPrimitive.Slot;

const surfaceVariants = cva("", {
  variants: {
    variant: {
      fill: "rounded-card bg-fill p-5 sm:p-6",
      card: "rounded-card border border-card-rim bg-bg p-5 sm:p-6",
      float: "rounded-card bg-bg p-5 shadow-card sm:p-6",
      tint: "rounded-card p-6 sm:p-7",
      stage: "rounded-tray bg-fill p-1.5",
      notice: "rounded-notice bg-fill p-4",
    },
  },
  defaultVariants: {
    variant: "fill",
  },
});

type SurfaceProps = React.ComponentProps<"div"> &
  VariantProps<typeof surfaceVariants> & {
    asChild?: boolean;
    tint?: Tint;
  };

function Surface({
  className,
  variant,
  tint,
  asChild = false,
  ...props
}: SurfaceProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="surface"
      className={cn(
        surfaceVariants({ variant }),
        variant === "tint" && TINT_CLASSES[tint ?? "violet"],
        className,
      )}
      {...props}
    />
  );
}

export { Surface, surfaceVariants };
