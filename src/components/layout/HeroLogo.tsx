import { useEffect, useRef, useState } from "react";

/**
 * HeroLogo — A large animated NSS logo on the homepage hero that smoothly
 * "flies" into the navbar logo position as the user scrolls.
 *
 * How it works:
 *   1. On mount, a <div> at the hero position reports its screen rect.
 *   2. The navbar logo slot also reports its rect (passed in via `navLogoRect`).
 *   3. As scroll progress goes from 0→1, the logo is translated + scaled
 *      from hero position to navbar position using CSS transforms.
 *   4. The navbar hides its own logo until progress === 1 (logo has "arrived").
 */

interface Props {
  /** Whether we're on the homepage (logo morphing only runs here) */
  isHomePage: boolean;
}

// Lerp helper
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(1, Math.max(0, t));
}

export function HeroLogo({ isHomePage }: Props) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isHomePage) return;

    function update() {
      const el = heroRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      // The hero logo starts centered in the hero section.
      // It should begin moving when it approaches the navbar (~64px from top).
      // Travel distance = from hero center to navbar center
      const heroCenter = rect.top + rect.height / 2;
      const navbarCenter = 32; // half of 64px navbar height

      // Progress: 0 = hero fully visible, 1 = hero at navbar
      // Start when hero top reaches 200px from viewport top
      const startTrigger = 160; // px from top before morphing begins
      const endTrigger = -20;   // px — when hero center hits navbar

      const raw = (startTrigger - heroCenter) / (startTrigger - endTrigger);
      setProgress(Math.min(1, Math.max(0, raw)));
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isHomePage]);

  if (!isHomePage) return null;

  // ── Interpolated values ──────────────────────────────────────────────────────
  // Scale: hero = 1 (120px effective), navbar = 0.367 (44px / 120px)
  const scale  = lerp(1, 0.367, progress);
  // Move up (translateY) and left (translateX) to reach navbar position
  // Navbar logo is at ~top:12px left:~16px inside container
  // We use a fixed ref and adjust for viewport width dynamically in CSS
  const moveY  = lerp(0, -1000, progress); // large enough; clamp handled by CSS
  const moveX  = lerp(0, -1000, progress); // same
  // But these large values cause overshoot — instead we use CSS custom props:

  const opacity = progress < 0.85 ? 1 : lerp(1, 0, (progress - 0.85) / 0.15);
  // When fully arrived (progress≈1) the real navbar logo fades in
  const navLogoVisible = progress > 0.92;

  // Size of the hero logo (before scaling)
  const logoSize = 120;

  return (
    <>
      {/* ── Invisible placeholder to track scroll position ── */}
      <div
        ref={heroRef}
        style={{
          width: logoSize,
          height: logoSize,
          pointerEvents: "none",
          visibility: "hidden",
          margin: "0 auto",
        }}
        aria-hidden
      />

      {/* ── The actual flying logo (position: fixed so it escapes flow) ── */}
      <HeroLogoFixed
        heroRef={heroRef}
        progress={progress}
        logoSize={logoSize}
        opacity={opacity}
        navLogoVisible={navLogoVisible}
      />
    </>
  );
}

// ── Flying logo rendered at fixed position, driven by the hero anchor rect ─────
function HeroLogoFixed({
  heroRef,
  progress,
  logoSize,
  opacity,
  navLogoVisible,
}: {
  heroRef: React.RefObject<HTMLDivElement | null>;
  progress: number;
  logoSize: number;
  opacity: number;
  navLogoVisible: boolean;
}) {
  const [pos, setPos] = useState({ heroX: 0, heroY: 0, navX: 16, navY: 10 });

  useEffect(() => {
    function calcPos() {
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // heroX/Y = center of the placeholder
      const heroX = rect.left + rect.width / 2 - logoSize / 2;
      const heroY = rect.top + rect.height / 2 - logoSize / 2;
      // navX/Y = top-left of navbar logo slot (approx)
      const navX = 16;
      const navY = 10; // (64px navbar - 44px logo) / 2 = 10
      setPos({ heroX, heroY, navX, navY });
    }

    window.addEventListener("scroll", calcPos, { passive: true });
    window.addEventListener("resize", calcPos, { passive: true });
    calcPos();
    return () => {
      window.removeEventListener("scroll", calcPos);
      window.removeEventListener("resize", calcPos);
    };
  }, [heroRef, logoSize]);

  // Hide entirely when nav logo has taken over
  if (navLogoVisible) return null;

  function lerp(a: number, b: number, t: number) {
    return a + (b - a) * Math.min(1, Math.max(0, t));
  }

  const currentX  = lerp(pos.heroX, pos.navX, progress);
  const currentY  = lerp(pos.heroY, pos.navY, progress);
  const scale     = lerp(1, 44 / logoSize, progress);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 55, // above navbar (z=50) to fly over it
        pointerEvents: "none",
        transform: `translate(${currentX}px, ${currentY}px)`,
        willChange: "transform, opacity",
      }}
    >
      <div
        style={{
          width: logoSize,
          height: logoSize,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          opacity,
          transition: "opacity 0.15s ease",
        }}
      >
        <NSSLogoAnimated size={logoSize} progress={progress} />
      </div>
    </div>
  );
}

// ── The actual NSS Logo with entrance + morph animations ──────────────────────
function NSSLogoAnimated({ size, progress }: { size: number; progress: number }) {
  // Glow pulses when progress is 0 (hero stage), fades as it morphs
  const glowOpacity = lerp(0.6, 0, progress);
  const borderRadius = lerp(16, 8, progress);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius,
        background: "#ffffff",
        border: "2px solid rgba(27, 58, 39, 0.12)",
        padding: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `
          0 0 0 ${lerp(0, 20, Math.sin(Date.now() / 1200) * 0.5 + 0.5) * (1 - progress)}px rgba(27, 150, 80, ${glowOpacity * 0.25}),
          0 8px 32px rgba(27, 58, 39, ${lerp(0.18, 0.08, progress)})
        `,
        animation: progress === 0 ? "nssLogoPulse 2.4s ease-in-out infinite, nssLogoEntrance 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both" : undefined,
        willChange: "transform, box-shadow",
      }}
    >
      <img
        src="/nss-logo.svg"
        alt="NSS Logo"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
        }}
        draggable={false}
      />
    </div>
  );
}

// Export for the navbar to read whether it should hide its logo
export function useHeroLogoProgress(isHomePage: boolean) {
  const [progress, setProgress] = useState(isHomePage ? 0 : 1);

  useEffect(() => {
    if (!isHomePage) {
      setProgress(1);
      return;
    }

    // Find the hero logo placeholder by looking for ~120px below 64px navbar
    // Simple heuristic: track scroll Y relative to viewport height
    function update() {
      // Hero section occupies first ~100vh. Logo starts at ~50vh.
      // When scrollY reaches ~250, morphing completes.
      const scrollY = window.scrollY;
      const raw = scrollY / 220;
      setProgress(Math.min(1, Math.max(0, raw)));
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [isHomePage]);

  return progress;
}
