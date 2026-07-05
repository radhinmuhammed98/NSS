import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

const observerOptions: IntersectionObserverInit = {
  threshold: 0.12,
  rootMargin: "0px 0px -40px 0px",
};

/**
 * Reveal — GPU-accelerated scroll-reveal using IntersectionObserver.
 * Uses only transform + opacity (no layout triggers).
 */
export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const translateMap = {
      up:    "translateY(22px)",
      left:  "translateX(-18px)",
      right: "translateX(18px)",
      none:  "none",
    };

    // Set initial hidden state
    el.style.opacity = "0";
    el.style.transform = translateMap[direction] ?? "translateY(22px)";
    el.style.transition = `opacity 0.5s ease ${delay}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`;
    el.style.willChange = "opacity, transform";

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "none";
          observer.unobserve(el);
        }
      });
    }, observerOptions);

    // Small RAF to avoid flash on initial load
    const raf = requestAnimationFrame(() => observer.observe(el));
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [delay, direction]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
