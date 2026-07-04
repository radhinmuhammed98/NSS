import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Container — responsive content alignment wrapper
 *
 * Provides a standardized max-width constraint and horizontal breathing gutters.
 */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 md:px-10", className)}>
      {children}
    </div>
  );
}
