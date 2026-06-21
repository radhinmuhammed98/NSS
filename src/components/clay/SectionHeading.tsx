import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * SectionHeading — editorial section title with optional eyebrow and action
 *
 * Eyebrow pill uses NSS crimson (brand identity category label).
 * Title uses Playfair Display (font-display) for editorial headings.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow && (
          <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            {eyebrow}
          </span>
        )}
        <h2 className="text-3xl font-extrabold text-balance sm:text-4xl">{title}</h2>
        {description && <p className="mt-3 text-muted-foreground">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
