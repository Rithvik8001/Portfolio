import { CaretRightIcon } from "@phosphor-icons/react/ssr";
import { Slot as SlotPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

const Slot = SlotPrimitive.Slot;
const Slottable = SlotPrimitive.Slottable;

type RowProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
  leading?: React.ReactNode;
  title: React.ReactNode;
  caption?: React.ReactNode;
  trailing?: React.ReactNode;
  chevron?: boolean;
  interactive?: boolean;
  scribble?: boolean;
};

function Row({
  className,
  asChild = false,
  leading,
  title,
  caption,
  trailing,
  chevron,
  interactive,
  scribble = true,
  children,
  ...props
}: RowProps) {
  const Comp = asChild ? Slot : "div";
  const isInteractive = interactive ?? (asChild || chevron);

  return (
    <Comp
      data-slot="row"
      className={cn(
        "grid min-h-16 w-full grid-cols-[40px_1fr_auto] items-center gap-x-4 py-3 text-left",
        scribble && "scribble [--scribble-inset:12px]",
        isInteractive &&
          "relative select-none outline-none before:absolute before:inset-y-0 before:-inset-x-3 before:-z-10 before:rounded-row before:bg-fill before:opacity-0 before:transition-opacity before:duration-press before:ease-std hover:before:opacity-100 focus-visible:before:opacity-100",
        className,
      )}
      {...props}
    >
      {asChild && <Slottable>{children}</Slottable>}
      <span className="flex items-center justify-center">{leading}</span>
      <span className="min-w-0">
        <span className="block truncate text-body font-medium text-ink">
          {title}
        </span>
        {caption && (
          <span className="block text-caption text-fg-2">{caption}</span>
        )}
      </span>
      <span className="flex items-center gap-2 text-fg-2 [&_svg]:size-4">
        {trailing}
        {chevron && <CaretRightIcon aria-hidden />}
      </span>
    </Comp>
  );
}

function MetaRow({
  className,
  icon,
  label,
  meta,
  ...props
}: React.ComponentProps<"div"> & {
  icon?: React.ReactNode;
  label: React.ReactNode;
  meta?: React.ReactNode;
}) {
  return (
    <div
      data-slot="meta-row"
      className={cn(
        "flex min-h-7 items-center gap-3 text-body text-ink [&_svg]:size-[18px] [&_svg]:shrink-0 [&_svg]:text-fg-2",
        className,
      )}
      {...props}
    >
      {icon && (
        <span className="flex size-[22px] items-center justify-center">
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1">{label}</span>
      {meta && <span className="text-small text-fg-2 tabular-nums">{meta}</span>}
    </div>
  );
}

export { MetaRow, Row };
