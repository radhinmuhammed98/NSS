import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Section — standardized page section component
 *
 * Ensures consistent vertical spacing (normal gap: 1rem/16px, large gap: 2rem/32px).
 * Replaces raw repeating semantic <section> tags.
 */
export function Section({
  children,
  className,
  id,
  gap = "normal",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  gap?: "normal" | "large";
}) {
  return (
    <section
      id={id}
      className={cn(
        "flex flex-col",
        gap === "normal" ? "gap-4" : "gap-8",
        className
      )}
    >
      {children}
    </section>
  );
}
