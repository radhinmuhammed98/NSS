import type { ReactNode } from "react";

/**
 * Reveal — animations disabled as per user request to avoid UI bugs and hidden content.
 */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
