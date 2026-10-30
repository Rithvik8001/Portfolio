import { cva, type VariantProps } from "class-variance-authority";
import { Slot as SlotPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

const Slot = SlotPrimitive.Slot;

const buttonVariants = cva(
  [
    "relative isolate inline-flex h-11 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-control px-[18px] text-body font-semibold whitespace-nowrap select-none",
    "transition-[translate,scale,filter,background-color,opacity] duration-lift ease-std",
    "active:translate-y-px active:scale-[0.985] active:duration-press",
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-fg",
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    "forced-colors:border forced-colors:border-[ButtonText]",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-(--progress,0) before:bg-sweep before:transition-transform before:duration-lift before:ease-std",
    "data-[busy=true]:pointer-events-none data-[busy=true]:before:duration-[4s]",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-keycap text-on-brand shadow-keycap hover:-translate-y-px hover:brightness-[1.04] focus-visible:outline-ink",
        secondary:
          "bg-keycap-2 text-ink shadow-keycap-2 hover:-translate-y-px hover:brightness-[1.04]",
        ink: "bg-ink text-bg hover:-translate-y-px hover:brightness-[1.04]",
        destructive:
          "bg-bad-bg text-bad hover:-translate-y-px hover:brightness-[1.04]",
        text: "font-medium text-ink hover:bg-fill",
        ghost: "font-medium text-fg-2 hover:bg-fill",
        icon: "size-10 rounded-inner bg-fill px-0 font-medium text-ink hover:bg-fill-2",
        fill: "bg-fill font-medium text-ink hover:bg-fill-2",
      },
      size: {
        default: "",
        xs: "h-7 gap-1.5 rounded-pill px-3 text-small font-medium [&_svg:not([class*='size-'])]:size-3.5",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    busy?: boolean;
    progress?: number;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  busy,
  progress,
  style,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const fill = busy ? (progress ?? 0.9) : (progress ?? 0);

  return (
    <Comp
      data-slot="button"
      data-busy={busy || undefined}
      aria-busy={busy || undefined}
      style={{ ...style, ["--progress" as string]: fill }}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
