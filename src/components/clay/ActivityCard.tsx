import { cn } from "@/lib/utils";
import type { ElementType } from "react";

/**
 * ActivityCard — icon-driven card for causes, pillars, and activity summaries (Vanilla CSS implementation)
 */
export function ActivityCard({
  icon: Icon,
  title,
  subtitle,
  description,
  accentColor = "#1b3a27",
  className,
}: {
  icon?: ElementType;
  title: string;
  /** Optional Malayalam or secondary line below the title */
  subtitle?: string;
  description: string;
  /** Hex color used for the icon and icon bubble background */
  accentColor?: string;
  className?: string;
}) {
  const bubbleBg = accentColor + "18"; // ~10% opacity background
  return (
    <div
      className={cn(
        "nss-card nss-card-tilt nss-flex nss-flex-col nss-gap-4",
        className
      )}
    >
      {/* Icon bubble — only shown when an icon is provided */}
      {Icon && (
        <span
          className="nss-flex nss-items-center nss-justify-center nss-shrink-0"
          style={{
            background: bubbleBg,
            width: "2.75rem",
            height: "2.75rem",
            borderRadius: "var(--radius-lg)"
          }}
        >
          <Icon style={{ color: accentColor, width: "1.25rem", height: "1.25rem" }} aria-hidden />
        </span>
      )}

      {/* Text block */}
      <div className="nss-flex nss-flex-col nss-gap-1">
        <h3
          className="nss-font-bold nss-text-base nss-leading-snug"
          style={{ color: "var(--primary)" }}
        >
          {title}
        </h3>
        {subtitle && (
          <p
            className="nss-text-xs nss-text-muted"
            style={{ fontFamily: "'Noto Sans Malayalam', sans-serif" }}
          >
            {subtitle}
          </p>
        )}
      </div>

      <p className="nss-text-sm nss-text-muted nss-leading-relaxed nss-flex-1">
        {description}
      </p>
    </div>
  );
}
