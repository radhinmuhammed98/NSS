"use client";
import { useEffect, useReducer, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

// ─── Shared layout ID ─────────────────────────────────────────────────────────
// Both hero and navbar logo render with layoutId="nss-logo".
// Only ONE is visible at a time. Framer Motion animates between positions.
export const NSS_LOGO_LAYOUT_ID = "nss-logo";

// ─── Spring config — feels physical, not linear ───────────────────────────────
const SPRING = { type: "spring", stiffness: 340, damping: 38, mass: 1 } as const;

// ─── Hook: track scroll progress (0 = top, 1 = hero scrolled away) ────────────
export function useHeroLogoProgress(isHomePage: boolean) {
  const [progress, setProgress] = useState(isHomePage ? 0 : 1);

  useEffect(() => {
    if (!isHomePage) { setProgress(1); return; }

    function update() {
      // Hero section is approx first 100vh; logo is near top of it.
      // Transition: starts at scrollY=80, completes at scrollY=280.
      const raw = (window.scrollY - 80) / 200;
      setProgress(Math.min(1, Math.max(0, raw)));
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [isHomePage]);

  return progress;
}

// ─── Hero Logo (in the page body) ─────────────────────────────────────────────
interface HeroLogoHeroProps {
  /** Size on mobile (px) */
  mobileSize?: number;
  /** Size on desktop (px) */
  desktopSize?: number;
}

export function HeroLogoHero({ mobileSize = 108, desktopSize = 160 }: HeroLogoHeroProps) {
  const prefersReduced = useReducedMotion();
  const [size, setSize] = useState(mobileSize);

  // Responsive size
  useEffect(() => {
    function update() {
      setSize(window.innerWidth >= 768 ? desktopSize : mobileSize);
    }
    window.addEventListener("resize", update, { passive: true });
    update();
    return () => window.removeEventListener("resize", update);
  }, [mobileSize, desktopSize]);

  return (
    <motion.div
      layoutId={NSS_LOGO_LAYOUT_ID}
      layout
      transition={prefersReduced ? { duration: 0 } : SPRING}
      style={{
        width: size,
        height: size,
        borderRadius: 20,
        backgroundColor: "#ffffff",
        border: "1.5px solid rgba(27,58,39,0.10)",
        padding: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 28px rgba(27,80,50,0.13), 0 1.5px 4px rgba(27,58,39,0.07)",
        flexShrink: 0,
      }}
      initial={prefersReduced ? false : { opacity: 0, scale: 0.72, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
    >
      <NSSLogoImage />
    </motion.div>
  );
}

// ─── Navbar Logo (replaces old static logo in Navbar.tsx) ─────────────────────
interface NavbarLogoProps {
  /** Whether we are currently on the homepage */
  isHomePage: boolean;
  /** Scroll progress from useHeroLogoProgress */
  progress: number;
}

export function NavbarLogo({ isHomePage, progress }: NavbarLogoProps) {
  const prefersReduced = useReducedMotion();

  // On non-home pages: always show.
  // On home: invisible until hero has scrolled away (progress > 0.7)
  const visible = !isHomePage || progress > 0.7;

  return (
    <motion.div
      layoutId={isHomePage ? NSS_LOGO_LAYOUT_ID : undefined}
      layout={isHomePage}
      transition={prefersReduced ? { duration: 0 } : SPRING}
      style={{
        width: 44,
        height: 44,
        borderRadius: 10,
        backgroundColor: "#ffffff",
        border: "1px solid rgba(27,28,25,0.08)",
        padding: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        // We don't hide with display:none so layoutId tracking still works,
        // but we make it invisible when the hero version is visible.
        opacity: isHomePage ? (progress > 0.7 ? 1 : 0) : 1,
        pointerEvents: visible ? "auto" : "none",
        transition: isHomePage ? "opacity 0.18s ease" : undefined,
      }}
    >
      <NSSLogoImage />
    </motion.div>
  );
}

// ─── Shared image element ─────────────────────────────────────────────────────
function NSSLogoImage() {
  return (
    <img
      src="/nss-logo.svg"
      alt="NSS Logo"
      style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
      draggable={false}
    />
  );
}
