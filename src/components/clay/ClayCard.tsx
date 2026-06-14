import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * ClayCard — clay morphism card
 *
 * Standard card uses restrained neutral clay shadow (--clay-shadow).
 * Use `highlighted` prop for important cards that warrant stronger emphasis.
 * Tilt is subtle and only on hover; disabled for flat layout sections.
 */
export function ClayCard({
  children,
  className,
  tilt = true,
  highlighted = false,
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  /** Use for impact metrics, featured cards, and key content only */
  highlighted?: boolean;
}) {
  return (
    <motion.div
      whileHover={
        tilt
          ? { y: -5, rotate: -0.3, scale: 1.01 }
          : { y: -3 }
      }
      whileTap={{ scale: 0.988 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={cn(
        "clay p-5",
        highlighted && "shadow-[var(--clay-shadow-accent)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
