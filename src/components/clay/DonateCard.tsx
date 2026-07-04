import { ClayCard } from "./ClayCard";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

/**
 * DonateCard — card for a single donation method (UPI, Bank, QR, enquiry).
 *
 * Used in: Support page.
 * Provides consistent icon-bubble + badge + title + content slot layout.
 */
export function DonateCard({
  icon: Icon,
  badge,
  title,
  iconBg = "#042413",
  children,
  className,
}: {
  icon: ElementType;
  badge?: string;
  title: string;
  /** Background colour for the icon bubble */
  iconBg?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <ClayCard tilt={false} className={cn("flex flex-col gap-4 h-full", className)}>
      {/* Icon bubble */}
      <span
        className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
        style={{ background: iconBg }}
      >
        <Icon className="h-5 w-5 text-white" aria-hidden />
      </span>

      <div className="flex flex-col gap-1.5 flex-1">
        {badge && <Badge>{badge}</Badge>}
        <h3 className="font-display text-lg font-bold">{title}</h3>
        <div className="mt-1">{children}</div>
      </div>
    </ClayCard>
  );
}
