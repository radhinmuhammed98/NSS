import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EASE = "power3.out";

/**
 * High-end intro timeline. Animates elements marked with [data-anim] inside the
 * scoped container with a clean, staggered rise + fade. Runs once on mount.
 */
export function useGsapIntro<T extends HTMLElement = HTMLDivElement>() {
  const scope = useRef<T>(null);

  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>("[data-anim]");
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: 18 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: EASE,
        stagger: 0.06,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return scope;
}

/**
 * Scroll-triggered batch reveals. Any element with [data-reveal] inside the
 * scoped container fades and lifts into view as it enters the viewport.
 */
export function useGsapReveals<T extends HTMLElement = HTMLDivElement>() {
  const scope = useRef<T>(null);

  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]", el);
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: 28 });
      ScrollTrigger.batch(targets, {
        start: "top 92%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: EASE,
            stagger: 0.07,
            overwrite: true,
          }),
      });
      ScrollTrigger.refresh();
    }, el);

    return () => ctx.revert();
  }, []);

  return scope;
}

/**
 * Subtle parallax on a single element as the user scrolls past it.
 */
export function useGsapParallax<T extends HTMLElement = HTMLDivElement>(
  amount = 60,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: -amount / 10,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);
    return () => ctx.revert();
  }, [amount]);

  return ref;
}
