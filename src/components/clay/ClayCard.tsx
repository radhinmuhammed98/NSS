import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Card — clean minimal editorial card (previously ClayCard, now flat)
 *
 * Standard card uses flat border border-border/40 and background.
 * Use `highlighted` prop for featured/important cards.
 * Hover translates slightly upward if tilt is enabled.
 */
export function ClayCard({
  children,
  className,
  tilt = true,
  highlighted = false,
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  /** Use for impact metrics, featured cards, and key content only */
  highlighted?: boolean;
}) {
  return (
    <div
      className={cn(
        "min-w-0 overflow-hidden rounded-lg p-5 border border-border/40 bg-card text-card-foreground shadow-sm",
        tilt && "transition-all duration-200 hover:-translate-y-0.5",
        highlighted && "border-accent/40 shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}
