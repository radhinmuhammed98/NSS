import type { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Container — responsive content alignment wrapper using pure CSS
 */
export function Container({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={cn("nss-container", className)} style={style}>
      {children}
    </div>
  );
}
