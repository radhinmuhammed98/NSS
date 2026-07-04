import { ClayCard } from "./ClayCard";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

/**
 * DonateCard — card for a single donation method (UPI, Bank, QR, enquiry) (Vanilla CSS implementation)
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
    <ClayCard tilt={false} className={cn("nss-flex nss-flex-col nss-gap-4", className)} style={{ height: "100%" }}>
      {/* Icon bubble */}
      <span
        className="nss-flex nss-shrink-0 nss-items-center nss-justify-center"
        style={{ background: iconBg, height: "3rem", width: "3rem", borderRadius: "var(--radius-lg)" }}
      >
        <Icon style={{ height: "1.25rem", width: "1.25rem", color: "#ffffff" }} aria-hidden />
      </span>

      <div className="nss-flex nss-flex-col nss-gap-1 nss-flex-1">
        {badge && <Badge className="w-fit">{badge}</Badge>}
        <h3 className="nss-font-display nss-text-lg nss-font-bold">{title}</h3>
        <div className="nss-mt-1">{children}</div>
      </div>
    </ClayCard>
  );
}
