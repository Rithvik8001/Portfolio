import { CheckIcon } from "@phosphor-icons/react/ssr";

import { cn } from "@/lib/utils";

function Statement({
  className,
  facts,
  children,
  ...props
}: React.ComponentProps<"div"> & { facts?: React.ReactNode[] }) {
  return (
    <div data-slot="statement" className={cn("space-y-4", className)} {...props}>
      <p className="max-w-statement text-statement text-ink">{children}</p>
      {facts && facts.length > 0 && (
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {facts.map((fact, i) => (
            <li
              key={i}
              className="inline-flex items-center gap-1.5 text-small font-medium text-ink"
            >
              <CheckIcon weight="bold" className="size-4 shrink-0 text-ok" />
              {fact}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { Statement };
