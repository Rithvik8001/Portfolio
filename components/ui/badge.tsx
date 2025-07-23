import { cn } from "@/lib/utils";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

type BadgeProps = {
  style: CSSProperties;
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>;

const Badge = ({ style, children, className, ...rest }: BadgeProps) => {
  return (
    <article
      className={cn("px-2 py-1 rounded-sm w-max", className)}
      style={style}
      {...rest}
    >
      <p className="font-mono text-[#edeef0] text-[10px] uppercase">
        {children}
      </p>
    </article>
  );
};

export default Badge;
