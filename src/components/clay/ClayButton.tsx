import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "soft";

/**
 * Button — NSS brand action button (previously ClayButton, now flat and clean)
 *
 * Variants:
 *  primary — NSS crimson (main CTAs and important actions only)
 *  accent  — muted gold (awards, milestones, legacy — use sparingly)
 *  soft    — neutral background (secondary actions)
 */
const styles: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/95",
  accent: "bg-legacy-gold text-white hover:bg-legacy-gold/95 shadow-sm",
  soft: "bg-muted border border-border/40 text-foreground hover:bg-muted/80",
};

const base =
  "inline-flex min-h-11 max-w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-center text-sm font-semibold leading-tight transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-offset-4 cursor-pointer select-none";

function wrapperClass(className?: string) {
  return cn(
    "inline-flex max-w-full",
    className?.includes("w-full") && "w-full",
    className?.includes("sm:w-auto") && "sm:w-auto"
  );
}

export function ClayButton({
  children,
  variant = "primary",
  className,
  to,
  href,
  onClick,
  type,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const cls = cn(base, "relative overflow-hidden", styles[variant], className);

  const makeRipple = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const circle = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    circle.style.cssText = `position:absolute;border-radius:9999px;pointer-events:none;width:${size}px;height:${size}px;left:${
      e.clientX - rect.left - size / 2
    }px;top:${
      e.clientY - rect.top - size / 2
    }px;background:currentColor;opacity:0.15;transform:scale(0);`;
    target.appendChild(circle);
    
    const animation = circle.animate(
      [
        { transform: "scale(0)", opacity: 0.15 },
        { transform: "scale(1.6)", opacity: 0 }
      ],
      {
        duration: 400,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        fill: "forwards"
      }
    );
    animation.onfinish = () => circle.remove();
  };

  if (to) {
    return (
      <div className={wrapperClass(className)}>
        <Link to={to} className={cls} onClick={makeRipple}>
          {children}
        </Link>
      </div>
    );
  }
  if (href) {
    return (
      <a href={href} className={cn(cls, wrapperClass(className))} onClick={makeRipple}>
        {children}
      </a>
    );
  }
  return (
    <button
      type={type ?? "button"}
      onClick={(e) => {
        makeRipple(e);
        onClick?.();
      }}
      className={cls}
    >
      {children}
    </button>
  );
}
