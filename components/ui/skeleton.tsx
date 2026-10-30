import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden
      className={cn("rounded-[6px] bg-fill-2", className)}
      {...props}
    />
  );
}

function SkeletonRow({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton-row"
      aria-hidden
      className={cn("flex items-center gap-4 py-3", className)}
      {...props}
    >
      <Skeleton className="size-10 shrink-0 rounded-tool" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3.5 w-1/3" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}

export { Skeleton, SkeletonRow };
