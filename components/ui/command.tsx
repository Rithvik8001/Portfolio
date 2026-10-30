"use client";

import { MagnifyingGlassIcon } from "@phosphor-icons/react/ssr";
import { Command as CommandPrimitive } from "cmdk";
import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "flex h-full w-full flex-col overflow-hidden text-ink",
        className,
      )}
      {...props}
    />
  );
}

function CommandDialog({
  title = "Command menu",
  description = "Search for a page or action",
  children,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string;
  description?: string;
}) {
  return (
    <Dialog {...props}>
      <DialogContent
        className="top-[12vh] max-w-[35rem] translate-y-0 gap-0 overflow-hidden p-0 max-sm:top-4"
        data-slot="command-dialog-content"
        closeButton={false}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Command>{children}</Command>
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="relative flex h-14 items-center gap-3 px-5 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-lift after:ease-std focus-within:after:scale-x-100"
    >
      <MagnifyingGlassIcon className="size-5 shrink-0 text-fg-2" aria-hidden />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "flex h-full w-full bg-transparent text-field text-ink outline-hidden placeholder:text-fg-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "scribble max-h-[min(24rem,60vh)] scroll-py-2 overflow-x-hidden overflow-y-auto p-1.5 [--scribble-inset:20px]",
        className,
      )}
      {...props}
    />
  );
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn("py-10 text-center text-caption text-fg-2", className)}
      {...props}
    />
  );
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "overflow-hidden pb-1",
        "**:[[cmdk-group-heading]]:eyebrow **:[[cmdk-group-heading]]:px-3 **:[[cmdk-group-heading]]:pt-3 **:[[cmdk-group-heading]]:pb-1.5",
        className,
      )}
      {...props}
    />
  );
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("scribble my-1 h-1 [--scribble-inset:12px]", className)}
      {...props}
    />
  );
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "relative grid min-h-11 cursor-pointer grid-cols-[32px_1fr_auto] items-center gap-3 rounded-inner px-2 py-1 text-body text-ink outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-fill",
        className,
      )}
      {...props}
    />
  );
}

function CommandItemTile({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-item-tile"
      className={cn(
        "flex size-8 items-center justify-center overflow-hidden rounded-inner bg-fill-2 text-fg-2 [&_img]:size-[18px] [&_svg]:size-[18px]",
        className,
      )}
      {...props}
    />
  );
}

function CommandItemText({
  className,
  caption,
  children,
  ...props
}: React.ComponentProps<"span"> & { caption?: React.ReactNode }) {
  return (
    <span
      data-slot="command-item-text"
      className={cn("min-w-0", className)}
      {...props}
    >
      <span className="block truncate">{children}</span>
      {caption && (
        <span className="block truncate text-small text-fg-2">{caption}</span>
      )}
    </span>
  );
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<typeof Kbd>) {
  return (
    <Kbd
      data-slot="command-shortcut"
      className={cn("col-start-3", className)}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandItemText,
  CommandItemTile,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};
