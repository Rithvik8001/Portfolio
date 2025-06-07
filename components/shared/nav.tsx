"use client";

import Image from "next/image";
import icon from "@/assets/favicon.ico";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { MoveLeft } from "lucide-react";
import MotionWrapper from "./motion-wrapper";
import { AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-4 py-8">
      <AnimatePresence mode="popLayout">
        {pathname === "/" ? (
          <MotionWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="index"
          >
            <Image
              src={icon}
              alt="Icon"
              className="size-[18px] transition-all hover:rotate-180 cursor-pointer"
            />
          </MotionWrapper>
        ) : (
          <MotionWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="back"
          >
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground underline-offset-[5px] transition-colors hover:text-primary hover:underline"
            >
              <MoveLeft className="size-[14px]" />
              <span>home</span>
            </Link>
          </MotionWrapper>
        )}
      </AnimatePresence>
      <div className="flex items-center gap-4">
        <Link
          href="/about"
          className={cn(
            "text-muted-foreground underline-offset-[5px] transition-colors hover:text-primary hover:underline",
            pathname === "/about" && "text-primary underline"
          )}
        >
          about
        </Link>
        <Link
          href="/colophon"
          className={cn(
            "text-muted-foreground underline-offset-[5px] transition-colors hover:text-primary hover:underline",
            pathname === "/colophon" && "text-primary underline"
          )}
        >
          colophon
        </Link>
        <Link
          href="/ai"
          className={cn(
            "text-muted-foreground underline-offset-[5px] transition-colors hover:text-primary hover:underline",
            pathname === "/ai" && "text-primary underline"
          )}
        >
          rithvik://ai
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
