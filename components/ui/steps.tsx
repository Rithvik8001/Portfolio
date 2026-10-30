import { cn } from "@/lib/utils";

function Steps({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="steps"
      className={cn("flex flex-col", className)}
      {...props}
    />
  );
}

function Step({
  className,
  number,
  title,
  children,
  ...props
}: React.ComponentProps<"li"> & {
  number?: React.ReactNode;
  title: React.ReactNode;
}) {
  return (
    <li
      data-slot="step"
      className={cn(
        "grid grid-cols-[28px_1fr] gap-x-4 py-4 first:pt-0 not-first:scribble",
        className,
      )}
      {...props}
    >
      <span className="inline-flex size-7 items-center justify-center rounded-pill bg-fill-2 text-small font-medium text-ink tabular-nums">
        {number}
      </span>
      <div className="min-w-0 space-y-0.5 pt-0.5">
        <p className="text-body font-medium text-ink">{title}</p>
        {children && <div className="text-caption text-fg-2">{children}</div>}
      </div>
    </li>
  );
}

export { Step, Steps };
