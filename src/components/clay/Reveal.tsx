import type { ReactNode, CSSProperties } from "react";

/**
 * Reveal — wrapper that supports className and style forwarding (Vanilla CSS implementation)
 */
export function Reveal({
  children,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
