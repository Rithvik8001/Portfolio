import { cn } from "@/lib/utils";

type SectionProps = Omit<React.ComponentProps<"section">, "title"> & {
  eyebrow?: React.ReactNode;
  heading?: React.ReactNode;
  caption?: React.ReactNode;
  headingLevel?: "h1" | "h2" | "h3";
  size?: "heading" | "title";
  align?: "start" | "center";
  actions?: React.ReactNode;
};

function Section({
  className,
  eyebrow,
  heading,
  caption,
  headingLevel: Heading = "h2",
  size = "heading",
  align = "start",
  actions,
  children,
  ...props
}: SectionProps) {
  const hasHeader = eyebrow || heading || caption;

  return (
    <section
      data-slot="section"
      className={cn("scroll-mt-24", className)}
      {...props}
    >
      {hasHeader && (
        <div
          data-slot="section-header"
          className={cn(
            "mb-[22px] flex items-start justify-between gap-4",
            align === "center" && "flex-col items-center text-center",
          )}
        >
          <div className={cn("space-y-1", align === "center" && "mx-auto")}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {heading && (
              <Heading
                className={size === "title" ? "text-title" : "text-heading"}
              >
                {heading}
              </Heading>
            )}
            {caption && (
              <p className="max-w-body text-caption text-fg-2">{caption}</p>
            )}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

export { Section };
