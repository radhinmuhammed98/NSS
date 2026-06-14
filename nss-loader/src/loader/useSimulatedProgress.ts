import { useState, useEffect, useRef } from "react";
import type {
  UseSimulatedProgressOptions,
  UseSimulatedProgressResult,
} from "./loading.types";

/**
 * Manages loading progress with smooth RAF-based interpolation.
 *
 * Combines simulated progress with real external signals:
 * - If `externalProgress` is provided, it drives the target.
 * - Otherwise, a time-based simulation runs up to 95 %, then waits for `isReady`.
 * - Always respects `minDuration` before allowing exit.
 * - Never gets stuck at 99 % — forcibly pushes to 100 once all conditions met.
 */
export function useSimulatedProgress({
  externalProgress,
  isReady,
  minDuration = 4200,
}: UseSimulatedProgressOptions): UseSimulatedProgressResult {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [animationReady, setAnimationReady] = useState(false);
  const [shouldExit, setShouldExit] = useState(false);

  const startTimeRef = useRef<number>(Date.now());
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef<number>(0);
  const currentRef = useRef<number>(0);
  const readyRef = useRef<boolean>(false);
  const animReadyRef = useRef<boolean>(false);
  const exitFiredRef = useRef<boolean>(false);

  // Keep refs in sync without causing re-renders
  readyRef.current = isReady;
  animReadyRef.current = animationReady;

  // Update target when external progress changes
  useEffect(() => {
    if (externalProgress !== undefined) {
      targetRef.current = isReady ? 100 : Math.min(externalProgress, 95);
    }
  }, [externalProgress, isReady]);

  // RAF animation loop — smooth interpolation towards target
  useEffect(() => {
    let lastTime = performance.now();

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      const target = targetRef.current;
      const current = currentRef.current;
      const diff = target - current;

      // Adaptive speed: sprint when far behind, creep near the top
      const speed = diff > 30 ? 0.08 : diff > 10 ? 0.04 : 0.015;
      const step = diff * speed * (delta / 16);
      let next = current + step;

      // Simulate progress when no external source provided
      if (externalProgress === undefined) {
        const elapsed = Date.now() - startTimeRef.current;
        const simTarget = readyRef.current
          ? 100
          : Math.min(95, elapsed / 80); // ~80 ms per percent, plateaus at 95
        targetRef.current = simTarget;
      }

      // Cap: never exceed 95 until isReady
      next = readyRef.current ? Math.min(next, 100) : Math.min(next, 95);
      currentRef.current = next;
      setDisplayProgress(Math.round(next));

      // Trigger exit when: app ready + animation done + min duration passed + near 100
      const elapsed = Date.now() - startTimeRef.current;
      if (
        !exitFiredRef.current &&
        readyRef.current &&
        animReadyRef.current &&
        elapsed >= minDuration &&
        next >= 99.5
      ) {
        exitFiredRef.current = true;
        setShouldExit(true);
        return; // Stop the animation loop
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [externalProgress, minDuration]);

  const markAnimationReady = () => {
    setAnimationReady(true);
  };

  return { displayProgress, shouldExit, markAnimationReady };
}
