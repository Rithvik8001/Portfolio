import Link from "next/link";

import { MAIN_NAV } from "@/constants/nav-items";
import { BrandContextMenu } from "../ui/brand-context-menu";
import { CommandMenu } from "../ui/command-menu";
import { ThemeToggle } from "../ui/theme-toggle";
import { DesktopNav } from "./desktop-nav";
import SiteHeaderMark from "./header-mark";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-bar max-w-screen overflow-x-hidden bg-bg px-2">
      <div className="mx-auto flex h-16 items-center justify-between gap-2 px-2 sm:gap-4 md:max-w-3xl">
        <BrandContextMenu>
          <Link href="/" aria-label="Home" className="[&_svg]:h-8">
            <SiteHeaderMark />
          </Link>
        </BrandContextMenu>
        <div className="flex-1" />
        <DesktopNav items={MAIN_NAV} />
        <div className="flex items-center gap-1.5">
          <CommandMenu />
          <ThemeToggle />
          <MobileNav className="sm:hidden" items={MAIN_NAV} />
        </div>
      </div>
    </header>
  );
}
