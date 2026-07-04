import type { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Card — clean minimal editorial card (Vanilla CSS implementation)
 */
export function ClayCard({
  children,
  className,
  tilt = true,
  highlighted = false,
  style,
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  highlighted?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn(
        "nss-card",
        tilt && "nss-card-tilt",
        highlighted && "nss-card-highlighted",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}
