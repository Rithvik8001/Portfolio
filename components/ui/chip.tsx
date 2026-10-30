import { cva, type VariantProps } from "class-variance-authority";
import { Slot as SlotPrimitive } from "radix-ui";

import { TINT_CLASSES, type Tint } from "@/constants/tints";
import { cn } from "@/lib/utils";

const Slot = SlotPrimitive.Slot;

const chipVariants = cva(
  "inline-flex shrink-0 items-center whitespace-nowrap select-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        select:
          "h-9 gap-2 rounded-control bg-fill px-3.5 text-body font-medium text-ink transition-[background-color,color] duration-press ease-std [&_svg]:size-4 data-[selected=true]:bg-brand data-[selected=true]:text-on-brand",
        label:
          "h-[26px] gap-1.5 rounded-pill px-2.5 text-small font-medium [&_svg]:size-3.5",
      },
    },
    defaultVariants: {
      variant: "label",
    },
  },
);

type ChipProps = React.ComponentProps<"span"> &
  VariantProps<typeof chipVariants> & {
    asChild?: boolean;
    tint?: Tint | "neutral";
    selected?: boolean;
  };

function Chip({
  className,
  variant,
  tint = "neutral",
  selected,
  asChild = false,
  ...props
}: ChipProps) {
  const Comp = asChild ? Slot : "span";
  const isLabel = (variant ?? "label") === "label";

  return (
    <Comp
      data-slot="chip"
      data-selected={selected || undefined}
      className={cn(
        chipVariants({ variant }),
        isLabel && TINT_CLASSES[tint],
        isLabel && tint === "neutral" && "bg-fill-2 text-fg-2",
        !isLabel &&
          "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-fg",
        className,
      )}
      {...props}
    />
  );
}

export { Chip, chipVariants };
