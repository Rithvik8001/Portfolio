"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
  variant?: "default" | "primary";
  icon?: ReactNode;
};

const Button = ({
  className,
  onClick,
  children,
  variant = "default",
  icon,
}: ButtonProps) => {
  if (variant === "primary") {
    return (
      <button
        type="button"
        className={cn(
          "flex items-center gap-3 hover:gap-6 bg-primary px-8 py-3 hover:py-2 rounded-full font-heading text-background origin-bottom transition-all duration-500 ease-in-out cursor-pointer",
          className
        )}
        onClick={onClick}
      >
        {children}{" "}
        <span className="flex justify-center items-center bg-background rounded-full size-4 aspect-square text-primary">
          {icon}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={cn(
        "flex items-center gap-3 hover:gap-6 bg-[#111113] px-8 lg:px-10 py-3 lg:hover:py-4 lg:py-5 hover:py-2 rounded-full font-heading text-[#edeef0] lg:text-2xl origin-bottom transition-all duration-500 ease-in-out cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}{" "}
      <span className="flex justify-center items-center bg-[#edeef0] rounded-full size-4 aspect-square text-[#111113]">
        {icon}
      </span>
    </button>
  );
};

export default Button;
