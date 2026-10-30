import * as React from "react";

import { cn } from "@/lib/utils";

const fieldClasses =
  "w-full min-w-0 rounded-control border border-field-rim bg-field-bg text-field text-ink shadow-field outline-none transition-[border-color,box-shadow] duration-press ease-std placeholder:text-fg-2 focus-visible:border-brand focus-visible:shadow-field-focus aria-invalid:border-bad aria-invalid:shadow-field-error disabled:pointer-events-none disabled:opacity-50";

function Input({
  className,
  type,
  icon,
  ...props
}: React.ComponentProps<"input"> & { icon?: React.ReactNode }) {
  if (icon) {
    return (
      <span data-slot="input-wrap" className="relative block w-full">
        <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-fg-2 [&_svg]:size-[18px]">
          {icon}
        </span>
        <input
          type={type}
          data-slot="input"
          className={cn(fieldClasses, "h-12 pr-3.5 pl-11", className)}
          {...props}
        />
      </span>
    );
  }

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(fieldClasses, "h-12 px-3.5", className)}
      {...props}
    />
  );
}

function Textarea({
  className,
  rows = 3,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      rows={rows}
      className={cn(
        fieldClasses,
        "min-h-24 resize-none rounded-notice px-3.5 py-3",
        className,
      )}
      {...props}
    />
  );
}

export { Input, Textarea };
