import { motion } from "framer-motion";
import type { ReactNode } from "react";
import gsap from "gsap";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "soft";

/**
 * ClayButton — NSS brand action button
 *
 * Variants:
 *  primary — NSS crimson (main CTAs and important actions only)
 *  accent  — muted gold clay (awards, milestones, legacy — use sparingly)
 *  soft    — neutral clay (secondary actions)
 */
const styles: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground shadow-[var(--clay-shadow-accent)]",
  accent: "clay-gold",
  soft: "clay-sm text-foreground",
};

const base =
  "inline-flex min-h-11 max-w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-center text-sm font-semibold leading-tight transition-shadow focus-visible:outline-offset-4";

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
    }px;background:currentColor;opacity:0.2;transform:scale(0);`;
    target.appendChild(circle);
    gsap.to(circle, {
      scale: 1.6,
      opacity: 0,
      duration: 0.55,
      ease: "power2.out",
      onComplete: () => circle.remove(),
    });
  };

  const motionProps = {
    whileHover: { y: -2, scale: 1.025 },
    whileTap: { scale: 0.94 },
    transition: { type: "spring" as const, stiffness: 400, damping: 20 },
  };

  if (to) {
    return (
      <motion.div {...motionProps} className={wrapperClass(className)}>
        <Link to={to} className={cls} onClick={makeRipple}>
          {children}
        </Link>
      </motion.div>
    );
  }
  if (href) {
    return (
      <motion.a {...motionProps} href={href} className={cn(cls, wrapperClass(className))} onClick={makeRipple}>
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button
      {...motionProps}
      type={type ?? "button"}
      onClick={(e) => {
        makeRipple(e);
        onClick?.();
      }}
      className={cls}
    >
      {children}
    </motion.button>
  );
}
