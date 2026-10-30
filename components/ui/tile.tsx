import { cva, type VariantProps } from "class-variance-authority";

import { TINT_CLASSES, type Tint } from "@/constants/tints";
import { cn } from "@/lib/utils";

const tileVariants = cva(
  "inline-flex shrink-0 items-center justify-center overflow-hidden [&_svg]:shrink-0",
  {
    variants: {
      size: {
        sm: "size-8 rounded-inner [&_svg]:size-[18px]",
        md: "size-10 rounded-tool [&_svg]:size-5",
        lg: "size-11 rounded-control [&_svg]:size-[22px]",
        xl: "size-14 rounded-row [&_svg]:size-[34px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type TileProps = React.ComponentProps<"span"> &
  VariantProps<typeof tileVariants> & {
    tint?: Tint | "neutral";
  };

function Tile({ className, size, tint = "neutral", ...props }: TileProps) {
  return (
    <span
      data-slot="tile"
      className={cn(tileVariants({ size }), TINT_CLASSES[tint], className)}
      {...props}
    />
  );
}

export { Tile, tileVariants };
