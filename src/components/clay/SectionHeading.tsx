import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * SectionHeading — editorial section title with optional eyebrow and action (Vanilla CSS implementation)
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
        "nss-mb-6 nss-flex nss-flex-col nss-gap-4 nss-sm-py-2 nss-sm-flex-row nss-sm-items-center nss-sm-justify-between",
        className
      )}
    >
      <div style={{ maxWidth: "42rem" }}>
        {eyebrow && (
          <span className="nss-badge nss-badge-default nss-mb-2">
            {eyebrow}
          </span>
        )}
        <h2 className="nss-text-3xl nss-font-extrabold nss-text-balance nss-sm-text-4xl">
          {title}
        </h2>
        {description && (
          <p className="nss-mt-3 nss-text-sm nss-leading-relaxed nss-text-muted">{description}</p>
        )}
      </div>
      {action && <div className="nss-flex nss-shrink-0 nss-sm-w-auto">{action}</div>}
    </div>
  );
}
