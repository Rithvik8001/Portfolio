import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { ComponentsBoard } from "./components-board";

export const metadata: Metadata = {
  title: "Design",
  robots: { index: false, follow: false },
};

const SURFACES = [
  ["bg", "bg-bg"],
  ["fill", "bg-fill"],
  ["fill-2", "bg-fill-2"],
  ["line", "bg-line"],
  ["rule", "bg-rule"],
  ["card-rim", "bg-card-rim"],
  ["brand-tint", "bg-brand-tint"],
  ["ok-bg", "bg-ok-bg"],
  ["bad-bg", "bg-bad-bg"],
  ["warn-bg", "bg-warn-bg"],
] as const;

const INKS = [
  ["ink", "text-ink"],
  ["fg-2", "text-fg-2"],
  ["fg-3", "text-fg-3"],
  ["brand", "text-brand"],
  ["brand-fg", "text-brand-fg"],
  ["ok", "text-ok"],
  ["bad", "text-bad"],
  ["warn", "text-warn"],
] as const;

const TINTS = [
  ["violet", "bg-tint-violet text-on-tint-violet"],
  ["blue", "bg-tint-blue text-on-tint-blue"],
  ["orange", "bg-tint-orange text-on-tint-orange"],
  ["red", "bg-tint-red text-on-tint-red"],
  ["green", "bg-tint-green text-on-tint-green"],
  ["pink", "bg-tint-pink text-on-tint-pink"],
  ["amber", "bg-tint-amber text-on-tint-amber"],
  ["cyan", "bg-tint-cyan text-on-tint-cyan"],
  ["indigo", "bg-tint-indigo text-on-tint-indigo"],
] as const;

const TYPE = [
  ["display", "text-display"],
  ["title", "text-title"],
  ["overlay", "text-overlay"],
  ["heading", "text-heading"],
  ["statement", "text-statement"],
  ["subhead", "text-subhead"],
  ["field", "text-field"],
  ["body", "text-body"],
  ["body-500", "text-body font-medium"],
  ["label", "text-label"],
  ["caption", "text-caption"],
  ["small", "text-small"],
  ["small-500", "text-small font-medium"],
  ["section", "text-section"],
  ["micro", "text-micro"],
  ["key", "text-key"],
] as const;

const RADII = [
  ["tray 28", "rounded-tray"],
  ["card 22", "rounded-card"],
  ["notice 20", "rounded-notice"],
  ["row 16", "rounded-row"],
  ["control 14", "rounded-control"],
  ["tool 12", "rounded-tool"],
  ["inner 10", "rounded-inner"],
  ["key 8", "rounded-key"],
  ["check 7", "rounded-check"],
  ["cell 5", "rounded-cell"],
] as const;

function Board() {
  return (
    <div className="bg-bg text-ink space-y-12 rounded-tray p-6">
      <section className="space-y-4">
        <p className="eyebrow">Surfaces</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {SURFACES.map(([name, cls]) => (
            <div key={name} className="space-y-1.5">
              <div
                className={cn(
                  "h-14 rounded-control border border-card-rim",
                  cls,
                )}
              />
              <p className="text-small text-fg-2">{name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <p className="eyebrow">Ink on bg</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {INKS.map(([name, cls]) => (
            <p key={name} className={cn("text-body font-medium", cls)}>
              {name} — The quick brown fox
            </p>
          ))}
        </div>
        <p className="eyebrow">Ink on fill (fg-3 should not be used here)</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 rounded-notice bg-fill p-4">
          {INKS.map(([name, cls]) => (
            <p key={name} className={cn("text-body font-medium", cls)}>
              {name} — The quick brown fox
            </p>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <p className="eyebrow">Tints</p>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-9">
          {TINTS.map(([name, cls]) => (
            <div
              key={name}
              className={cn(
                "flex h-16 items-center justify-center rounded-tool text-small font-medium",
                cls,
              )}
            >
              {name}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <p className="eyebrow">Type</p>
        <div className="space-y-3">
          {TYPE.map(([name, cls]) => (
            <div
              key={name}
              className="grid grid-cols-[6rem_1fr] items-baseline gap-4"
            >
              <span className="text-small text-fg-2">{name}</span>
              <p className={cls}>Calm, warm, hand-finished 0123456789</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[6rem_1fr] items-baseline gap-4">
          <span className="text-small text-fg-2">features</span>
          <p className="text-heading">
            Illegal 1lI0O — cv11 ss01 tnum: 1111 vs 0000
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <p className="eyebrow">Keycaps and shadows</p>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex h-11 items-center rounded-control bg-keycap px-[18px] text-body font-semibold text-on-brand shadow-keycap">
            Primary keycap
          </div>
          <div className="flex h-11 items-center rounded-control bg-keycap-2 px-[18px] text-body font-semibold text-ink shadow-keycap-2">
            Secondary keycap
          </div>
          <div className="flex h-11 items-center rounded-control bg-ink px-[18px] text-body font-semibold text-bg">
            Ink
          </div>
          <div className="flex h-11 items-center rounded-control bg-bad-bg px-[18px] text-body font-semibold text-bad">
            Destructive
          </div>
          <div className="flex size-10 items-center justify-center rounded-inner bg-fill text-fg-2">
            ◐
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="h-20 w-40 rounded-card bg-bg shadow-card" />
          <div className="h-20 w-40 rounded-card border border-card-rim bg-bg shadow-tray" />
          <div className="flex h-12 w-64 items-center rounded-control border border-field-rim bg-field-bg px-3.5 text-field text-fg-2 shadow-field">
            Field
          </div>
          <div className="flex h-12 w-64 items-center rounded-control border border-brand bg-field-bg px-3.5 text-field shadow-field-focus">
            Field focus
          </div>
          <div className="flex h-12 w-64 items-center rounded-control border border-bad bg-field-bg px-3.5 text-field shadow-field-error">
            Field error
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <p className="eyebrow">Radii</p>
        <div className="flex flex-wrap gap-3">
          {RADII.map(([name, cls]) => (
            <div
              key={name}
              className={cn(
                "flex h-16 w-24 items-center justify-center bg-fill-2 text-small text-fg-2",
                cls,
              )}
            >
              {name}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <p className="eyebrow">Scribbles</p>
        <ul className="rounded-card bg-fill px-5">
          {["First row", "Second row", "Third row"].map((label, i) => (
            <li
              key={label}
              className={cn(
                "py-4 text-body",
                i > 0 && "scribble [--scribble-inset:12px]",
              )}
            >
              {label}
            </li>
          ))}
        </ul>
        <p className="text-body">
          A sentence with a{" "}
          <a href="#" className="scribble-link">
            scribble link
          </a>{" "}
          that wraps across lines if it has to.
        </p>
      </section>
    </div>
  );
}

export default function DesignPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="mx-auto max-w-wide space-y-8 px-5 py-10">
      <h1 className="text-title">Design system</h1>
      <h2 className="text-heading">Components</h2>
      <ComponentsBoard />
      <div data-theme="dark" className="dark">
        <ComponentsBoard />
      </div>
      <h2 className="text-heading">Tokens</h2>
      <Board />
      <div data-theme="dark" className="dark">
        <Board />
      </div>
    </div>
  );
}
