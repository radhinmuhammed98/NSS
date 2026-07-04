import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "soft";

const styles: Record<Variant, string> = {
  primary: "nss-button-primary",
  accent: "nss-button-accent",
  soft: "nss-button-soft",
};

const base = "nss-button";

function wrapperClass(className?: string) {
  // Translate width utilities to nss classes if necessary, or pass through
  return cn(
    "nss-flex",
    className?.includes("w-full") && "w-full",
    className?.includes("sm:w-auto") && "nss-sm-w-auto"
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
  const cls = cn(base, styles[variant], className);

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
