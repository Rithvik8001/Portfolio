import { Tile } from "@/components/ui/tile";
import type { Tint } from "@/constants/tints";
import { cn } from "@/lib/utils";

type EmptyStateProps = React.ComponentProps<"div"> & {
  icon: React.ReactNode;
  tint?: Tint | "neutral";
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
};

function EmptyState({
  className,
  icon,
  tint = "violet",
  title,
  description,
  action,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center gap-4 px-6 py-10 text-center",
        className,
      )}
      {...props}
    >
      <Tile size="xl" tint={tint}>
        {icon}
      </Tile>
      <div className="space-y-1">
        <p className="text-subhead text-ink">{title}</p>
        {description && (
          <p className="mx-auto max-w-tight text-caption text-fg-2">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export { EmptyState };
