import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

/**
 * Badge — semantic label pill (Vanilla CSS implementation)
 */
export function Badge({
  children,
  variant = "soft",
  className,
  style,
}: {
  children: React.ReactNode;
  variant?: "soft" | "accent" | "outline";
  className?: string;
  style?: CSSProperties;
}) {
  const styles = {
    soft: "nss-badge-default",
    accent: "nss-badge-accent",
    outline: "nss-badge-outline",
  };
  
  return (
    <span
      className={cn(
        "nss-badge",
        styles[variant],
        className
      )}
      style={style}
    >
      {children}
    </span>
  );
}
