import { cn } from "@/lib/utils";

type DotProps = {
  className?: string;
};

const Dot = ({ className }: DotProps) => {
  return <div className={cn("bg-muted rounded-full size-[5px]", className)} />;
};

export default Dot;
