import { cn } from "@/lib/utils";
import type { ElementType } from "react";

/**
 * ActivityCard — icon-driven card for causes, pillars, and activity summaries.
 *
 * Used in: Support page (cause cards), Home page (Three Pillars).
 * Replaces duplicated inline div structures with icon + title + subtitle + desc pattern.
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
        "flex h-full min-w-0 flex-col gap-4 rounded-lg border border-border/50 p-5 sm:p-6",
        className
      )}
      style={{
        background: "#f5f3ee",
        boxShadow:
          "0 12px 28px rgba(27,58,39,0.08), 0 1px 0 rgba(255,255,255,0.70)",
      }}
    >
      {/* Icon bubble — only shown when an icon is provided */}
      {Icon && (
        <span
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg shrink-0"
          style={{ background: bubbleBg }}
        >
          <Icon className="h-5 w-5" style={{ color: accentColor }} aria-hidden />
        </span>
      )}

      {/* Text block */}
      <div className="flex flex-col gap-1">
        <h3
          className="font-bold text-base leading-snug"
          style={{ color: "#042413" }}
        >
          {title}
        </h3>
        {subtitle && (
          <p
            className="text-xs text-muted-foreground"
            style={{ fontFamily: "'Noto Sans Malayalam', sans-serif" }}
          >
            {subtitle}
          </p>
        )}
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
        {description}
      </p>
    </div>
  );
}
