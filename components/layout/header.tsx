import { cn } from "@/lib/utils";
import HeaderMarkWrapper from "./header-mark-wrapper";
import { BrandContextMenu } from "../ui/brand-context-menu";
import Link from "next/link";
import SiteHeaderMark from "./header-mark";
import { MAIN_NAV } from "@/constants/nav-items";
import { DesktopNav } from "./desktop-nav";
import { CommandMenu } from "../ui/command-menu";
import { ThemeToggle } from "../ui/theme-toggle";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <HeaderMarkWrapper
      className={cn(
        "sticky top-0 z-50 max-w-screen overflow-x-hidden bg-background px-2 pt-2",
        "data-[affix=true]:shadow-[0_0_16px_0_black]/8 dark:data-[affix=true]:shadow-[0_0_16px_0_black]",
        "not-dark:data-[affix=true]:**:data-header-container:after:bg-border",
        "transition-shadow duration-300"
      )}
    >
      <div
        className="screen-line-before screen-line-after mx-auto flex h-12 items-center justify-between gap-2 border-x border-edge px-2 after:z-1 after:transition-[background-color] sm:gap-4 md:max-w-3xl"
        data-header-container
      >
        <BrandContextMenu>
          <Link href="/" aria-label="Home" className="[&_svg]:h-8">
            <SiteHeaderMark />
          </Link>
        </BrandContextMenu>
        <div className="flex-1" />
        <DesktopNav items={MAIN_NAV} />
        <div className="flex items-center *:first:mr-2">
          <CommandMenu />
          <span className="mx-2 flex h-4 w-px bg-border" />
          <ThemeToggle />
          <MobileNav className="sm:hidden" items={MAIN_NAV} />
        </div>
      </div>
    </HeaderMarkWrapper>
  );
}
