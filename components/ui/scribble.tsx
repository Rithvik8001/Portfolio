import { cn } from "@/lib/utils";

function Scribble({
  className,
  inset,
  ...props
}: React.ComponentProps<"div"> & { inset?: number }) {
  return (
    <div
      role="separator"
      data-slot="scribble"
      style={
        inset !== undefined
          ? ({ "--scribble-inset": `${inset}px` } as React.CSSProperties)
          : undefined
      }
      className={cn("scribble h-1 w-full", className)}
      {...props}
    />
  );
}

export { Scribble };
