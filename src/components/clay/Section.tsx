import type { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Section — standardized page section component (Vanilla CSS implementation)
 */
export function Section({
  children,
  className,
  id,
  gap = "normal",
  style,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  gap?: "normal" | "large";
  style?: CSSProperties;
}) {
  return (
    <section
      id={id}
      className={cn(
        "nss-section",
        gap === "large" && "nss-section-large-gap",
        className
      )}
      style={style}
    >
      {children}
    </section>
  );
}
