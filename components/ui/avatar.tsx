import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";

const STATUS_TONES = {
  ok: "bg-ok",
  bad: "bg-bad",
  warn: "bg-warn",
  neutral: "bg-fg-3",
} as const;

type AvatarProps = Omit<ImageProps, "width" | "height"> & {
  size?: number;
  status?: keyof typeof STATUS_TONES;
  statusLabel?: string;
  wrapperClassName?: string;
};

function Avatar({
  size = 96,
  status,
  statusLabel,
  className,
  wrapperClassName,
  alt,
  ...props
}: AvatarProps) {
  const dotSize = Math.max(10, Math.round(size / 8));

  return (
    <span
      data-slot="avatar"
      className={cn("relative inline-block shrink-0", wrapperClassName)}
      style={{ width: size, height: size }}
    >
      <Image
        alt={alt}
        width={size}
        height={size}
        className={cn("size-full rounded-pill object-cover", className)}
        {...props}
      />
      {status && (
        <span
          data-slot="avatar-status"
          role={statusLabel ? "img" : undefined}
          aria-label={statusLabel}
          aria-hidden={statusLabel ? undefined : true}
          className={cn(
            "absolute right-[6%] bottom-[6%] rounded-pill ring-2 ring-bg",
            STATUS_TONES[status],
          )}
          style={{ width: dotSize, height: dotSize }}
        />
      )}
    </span>
  );
}

export { Avatar };
