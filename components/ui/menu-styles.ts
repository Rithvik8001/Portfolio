export const menuContentClasses =
  "z-drop min-w-40 overflow-hidden rounded-notice border border-card-rim bg-bg p-1.5 text-ink shadow-tray data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[.96] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-[.96] duration-press ease-std";

export const menuItemClasses =
  "relative flex h-11 cursor-pointer items-center gap-3 rounded-inner px-3 text-body text-ink outline-hidden select-none focus:bg-fill data-[state=open]:bg-fill data-disabled:pointer-events-none data-disabled:opacity-50 data-[variant=destructive]:text-bad data-[variant=destructive]:focus:bg-bad-bg [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-fg-2 data-[variant=destructive]:*:[svg]:text-bad!";

export const menuIndicatorItemClasses = `${menuItemClasses} pl-9`;

export const menuIndicatorClasses =
  "pointer-events-none absolute left-3 flex size-4 items-center justify-center";

export const menuLabelClasses = "px-3 pt-2 pb-1 eyebrow";

export const menuSeparatorClasses = "scribble my-1.5 h-1 [--scribble-inset:12px]";

export const menuShortcutClasses = "ml-auto text-key text-fg-2";
