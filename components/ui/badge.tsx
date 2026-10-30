import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-small font-medium text-ink",
  {
    variants: {
      size: {
        default: "h-7 rounded-key bg-fill-2 px-2.5",
        small: "h-[26px] rounded-pill bg-fill-2 px-2.5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const DOT_TONES = {
  ok: "bg-ok",
  bad: "bg-bad",
  warn: "bg-warn",
  neutral: "bg-fg-3",
} as const;

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    dot?: keyof typeof DOT_TONES;
  };

function Badge({ className, size, dot, children, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ size }), className)}
      {...props}
    >
      {dot && <StatusDot tone={dot} />}
      {children}
    </span>
  );
}

function StatusDot({
  tone = "neutral",
  className,
  ...props
}: React.ComponentProps<"span"> & { tone?: keyof typeof DOT_TONES }) {
  return (
    <span
      data-slot="status-dot"
      aria-hidden
      className={cn(
        "inline-block size-1.5 shrink-0 rounded-pill",
        DOT_TONES[tone],
        className,
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants, StatusDot };
