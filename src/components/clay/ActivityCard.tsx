import { cn } from "@/lib/utils";
import type { ElementType } from "react";

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
  subtitle?: string;
  description: string;
  accentColor?: string;
  className?: string;
}) {
  const bubbleBg = accentColor + "1a";
  return (
    <div
      className={cn("nss-card nss-card-tilt nss-flex nss-flex-col nss-gap-4", className)}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Top accent bar */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "3px",
          background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)`,
          borderRadius: "var(--radius-xl) var(--radius-xl) 0 0",
        }}
      />

      {Icon && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            background: bubbleBg,
            width: "2.75rem",
            height: "2.75rem",
            borderRadius: "var(--radius-lg)",
            marginTop: "0.25rem",
          }}
        >
          <Icon style={{ color: accentColor, width: "1.25rem", height: "1.25rem" }} aria-hidden />
        </span>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
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

      <p className="nss-text-sm nss-text-muted nss-leading-relaxed nss-flex-1">{description}</p>
    </div>
  );
}
