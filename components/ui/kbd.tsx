import { cn } from "@/lib/utils";

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-key bg-fill-2 px-1.5 font-sans text-key text-fg-2",
        className,
      )}
      {...props}
    />
  );
}

export { Kbd };
