import { useEffect, useRef } from "react";
import gsap from "gsap";

type SparkleProps = {
  count?: number;
  className?: string;
  colors?: string[];
};

/**
 * Sparkles — decorative particle field.
 *
 * Default colors: crimson thread, muted gold, light ivory
 * Purely cosmetic — sits behind content (pointer-events: none).
 * Respects prefers-reduced-motion via CSS.
 */
export function Sparkles({
  count = 14,
  className,
  colors = ["var(--color-thread)", "var(--color-legacy-gold)", "oklch(0.95 0.005 80 / 0.7)"],
}: SparkleProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const stars = gsap.utils.toArray<HTMLElement>(".sparkle", el);
    const ctx = gsap.context(() => {
      stars.forEach((star: any) => {
        gsap.set(star, {
          x: gsap.utils.random(0, 100, 1) + "%",
          y: gsap.utils.random(0, 100, 1) + "%",
          scale: gsap.utils.random(0.4, 1.0),
          opacity: 0,
        });
        const tl = gsap.timeline({ repeat: -1, delay: gsap.utils.random(0, 3) });
        tl.to(star, {
          opacity: gsap.utils.random(0.4, 0.85),
          scale: "+=0.35",
          duration: gsap.utils.random(0.6, 1.4),
          ease: "power1.inOut",
        }).to(star, {
          opacity: 0,
          scale: "-=0.35",
          duration: gsap.utils.random(0.6, 1.4),
          ease: "power1.inOut",
        });
        gsap.to(star, {
          rotation: 360,
          x: "+=" + gsap.utils.random(-25, 25),
          y: "+=" + gsap.utils.random(-25, 25),
          duration: gsap.utils.random(6, 12),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, el);
    return () => ctx.revert();
  }, [count]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={"pointer-events-none absolute inset-0 overflow-hidden " + (className ?? "")}
    >
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="sparkle absolute"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={colors[i % colors.length]}
          style={{ filter: "drop-shadow(0 0 4px currentColor)", opacity: 0.6 }}
          aria-hidden="true"
        >
          <path d="M12 0c.6 6 5.4 10.8 12 12-6.6 1.2-11.4 6-12 12-.6-6-5.4-10.8-12-12C6.6 10.8 11.4 6 12 0z" />
        </svg>
      ))}
    </div>
  );
}
