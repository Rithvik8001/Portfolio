"use client";

import type { IconProps } from "@phosphor-icons/react";
import {
  BriefcaseIcon,
  CircleHalfIcon,
  FileTextIcon,
  FolderIcon,
  HouseIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
  TextAlignLeftIcon,
  TextTIcon,
  UserCircleIcon,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandItemText,
  CommandItemTile,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";
import { RESUME } from "@/constants/resume";
import { SOCIAL_LINKS } from "@/constants/social-links";
import { captureEvent, ANALYTICS_EVENTS } from "@/lib/analytics";
import { copyText } from "@/lib/utils";
import { Button } from "./button";
import { Icons } from "./icons";
import { RithvikMark, getMarkSVG } from "./rithvik-mark";
import { getWordmarkSVG } from "./rithvik-wordmark";

type CommandLinkItem = {
  title: string;
  caption?: string;
  href: string;
  icon?: React.ComponentType<IconProps>;
  iconImage?: string;
  keywords?: string[];
  openInNewTab?: boolean;
};

const MENU_LINKS: CommandLinkItem[] = [
  { title: "Home", href: "/", icon: HouseIcon },
];

const PORTFOLIO_LINKS: CommandLinkItem[] = [
  { title: "About", href: "/about", icon: TextAlignLeftIcon },
  { title: "Tech stack", href: "/#stack", icon: Icons.ts },
  { title: "Experience", href: "/#experience", icon: BriefcaseIcon },
  { title: "Projects", href: "/#projects", icon: FolderIcon },
  {
    title: "Download vCard",
    caption: "Save contact details",
    href: "/api/vcard",
    icon: UserCircleIcon,
  },
  {
    title: "View resume",
    caption: "Opens in a new tab",
    href: RESUME.href,
    icon: FileTextIcon,
    openInNewTab: true,
  },
];

const SOCIAL_LINK_ITEMS: CommandLinkItem[] = SOCIAL_LINKS.map((item) => ({
  title: item.title,
  caption: item.description,
  href: item.href,
  iconImage: item.icon,
  openInNewTab: true,
}));

export function CommandMenu() {
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();

  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    const platform =
      (navigator as Navigator & { userAgentData?: { platform?: string } })
        .userAgentData?.platform ??
      navigator.platform ??
      "";
    setIsMac(/mac/i.test(platform) || /mac/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    document.addEventListener(
      "keydown",
      (e: KeyboardEvent) => {
        if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
          if (
            (e.target instanceof HTMLElement && e.target.isContentEditable) ||
            e.target instanceof HTMLInputElement ||
            e.target instanceof HTMLTextAreaElement ||
            e.target instanceof HTMLSelectElement
          ) {
            return;
          }

          e.preventDefault();
          setOpen((open) => {
            if (!open) {
              captureEvent(ANALYTICS_EVENTS.commandMenuOpened, {
                source: "shortcut",
              });
            }
            return !open;
          });
        }
      },
      { signal },
    );

    return () => abortController.abort();
  }, []);

  const handleOpenLink = useCallback(
    (href: string, openInNewTab = false) => {
      captureEvent(ANALYTICS_EVENTS.commandMenuItemSelected, { href });
      if (href === "/api/vcard") {
        captureEvent(ANALYTICS_EVENTS.vcardDownloaded, {
          source: "command_menu",
        });
      }
      if (href === RESUME.href) {
        captureEvent(ANALYTICS_EVENTS.resumeOpened, { source: "command_menu" });
      }
      setOpen(false);

      if (openInNewTab) {
        window.open(href, "_blank", "noopener");
      } else {
        router.push(href);
      }
    },
    [router],
  );

  const handleCopyText = useCallback((text: string, message: string) => {
    setOpen(false);
    copyText(text);
    toast.success(message);
  }, []);

  const createThemeHandler = useCallback(
    (theme: "light" | "dark" | "system") => () => {
      setOpen(false);
      setTheme(theme);
    },
    [setTheme],
  );

  const markColor = resolvedTheme === "dark" ? "#f2f1ee" : "#1a1917";

  return (
    <>
      <Button
        variant="fill"
        className="h-10 gap-2 px-3 text-fg-2"
        onClick={() => {
          captureEvent(ANALYTICS_EVENTS.commandMenuOpened, {
            source: "button",
          });
          setOpen(true);
        }}
      >
        <MagnifyingGlassIcon aria-hidden />
        <span className="sm:hidden">Search</span>
        <Kbd className="hidden sm:inline-flex">{isMac ? "⌘K" : "Ctrl K"}</Kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search pages and actions" />

        <CommandList>
          <CommandEmpty>Nothing matches that yet.</CommandEmpty>

          <CommandLinkGroup
            heading="Menu"
            links={MENU_LINKS}
            onLinkSelect={handleOpenLink}
          />

          <CommandLinkGroup
            heading="Portfolio"
            links={PORTFOLIO_LINKS}
            onLinkSelect={handleOpenLink}
          />

          <CommandLinkGroup
            heading="Social"
            links={SOCIAL_LINK_ITEMS}
            onLinkSelect={handleOpenLink}
          />

          <CommandGroup heading="Brand assets">
            <CommandItem
              onSelect={() =>
                handleCopyText(getMarkSVG(markColor), "Copied the mark as SVG")
              }
            >
              <CommandItemTile>
                <RithvikMark />
              </CommandItemTile>
              <CommandItemText>Copy mark as SVG</CommandItemText>
            </CommandItem>

            <CommandItem
              onSelect={() =>
                handleCopyText(
                  getWordmarkSVG(markColor),
                  "Copied the logotype as SVG",
                )
              }
            >
              <CommandItemTile>
                <TextTIcon />
              </CommandItemTile>
              <CommandItemText>Copy logotype as SVG</CommandItemText>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Theme">
            <CommandItem
              keywords={["theme"]}
              onSelect={createThemeHandler("light")}
            >
              <CommandItemTile>
                <SunIcon />
              </CommandItemTile>
              <CommandItemText>Light</CommandItemText>
            </CommandItem>
            <CommandItem
              keywords={["theme"]}
              onSelect={createThemeHandler("dark")}
            >
              <CommandItemTile>
                <MoonIcon />
              </CommandItemTile>
              <CommandItemText>Dark</CommandItemText>
            </CommandItem>
            <CommandItem
              keywords={["theme"]}
              onSelect={createThemeHandler("system")}
            >
              <CommandItemTile>
                <CircleHalfIcon />
              </CommandItemTile>
              <CommandItemText>System</CommandItemText>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

function CommandLinkGroup({
  heading,
  links,
  onLinkSelect,
}: {
  heading: string;
  links: CommandLinkItem[];
  onLinkSelect: (href: string, openInNewTab?: boolean) => void;
}) {
  return (
    <CommandGroup heading={heading}>
      {links.map((link) => {
        const Icon = link.icon;

        return (
          <CommandItem
            key={link.href}
            keywords={link.keywords}
            onSelect={() => onLinkSelect(link.href, link.openInNewTab)}
          >
            <CommandItemTile>
              {link.iconImage ? (
                <Image
                  className="rounded-[4px]"
                  src={link.iconImage}
                  alt=""
                  width={18}
                  height={18}
                  unoptimized
                />
              ) : (
                Icon && <Icon />
              )}
            </CommandItemTile>
            <CommandItemText caption={link.caption}>
              {link.title}
            </CommandItemText>
            {link.openInNewTab && <CommandShortcut>↗</CommandShortcut>}
          </CommandItem>
        );
      })}
    </CommandGroup>
  );
}
