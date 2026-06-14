import { useState, useEffect, useCallback, useRef } from "react";
import type { UseAppLoaderOptions, UseAppLoaderResult } from "./loading.types";

/**
 * Top-level hook for app initialization loading.
 *
 * Tracks weighted tasks and computes overall progress.
 * Falls back to a simple simulated tick when no tasks are defined.
 * Always respects `minDuration` before signalling readiness.
 * Includes a `timeout` safety net so the loader never hangs forever.
 *
 * @example With tasks:
 * ```tsx
 * const loader = useAppLoader({
 *   tasks: [
 *     { name: 'fonts',   weight: 1 },
 *     { name: 'content', weight: 3 },
 *     { name: 'images',  weight: 2 },
 *   ]
 * });
 *
 * // After fonts finish loading:
 * loader.completeTask('fonts');
 * ```
 *
 * @example Simple (no tasks):
 * ```tsx
 * const loader = useAppLoader();
 * // When app is ready:
 * loader.setReady();
 * ```
 */
export function useAppLoader(options: UseAppLoaderOptions = {}): UseAppLoaderResult {
  const { tasks = [], timeout = 15_000, minDuration = 4_200 } = options;

  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  const taskProgressRef = useRef<Record<string, number>>(
    Object.fromEntries(tasks.map((t) => [t.name, 0]))
  );
  const totalWeight = tasks.reduce((sum, t) => sum + t.weight, 0) || 1;
  const startTimeRef = useRef(Date.now());
  const readyRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Recompute overall progress from weighted task values */
  const recomputeProgress = useCallback(() => {
    if (tasks.length === 0) return;
    const weighted = tasks.reduce((sum, t) => {
      const p = taskProgressRef.current[t.name] ?? 0;
      return sum + (p / 100) * t.weight;
    }, 0);
    const overall = (weighted / totalWeight) * 100;
    setProgress(Math.min(Math.round(overall), 95));
  }, [tasks, totalWeight]);

  const setReady = useCallback(() => {
    if (readyRef.current) return;
    readyRef.current = true;

    // Ensure all tasks reach 100 in the ref map
    tasks.forEach((t) => {
      taskProgressRef.current[t.name] = 100;
    });

    const elapsed = Date.now() - startTimeRef.current;
    const remaining = Math.max(0, minDuration - elapsed);

    setTimeout(() => {
      setProgress(100);
    }, remaining);
  }, [tasks, minDuration]);

  const completeTask = useCallback(
    (name: string) => {
      taskProgressRef.current[name] = 100;
      recomputeProgress();

      const allDone = tasks.every(
        (t) => taskProgressRef.current[t.name] >= 100
      );
      if (allDone) setReady();
    },
    [tasks, recomputeProgress, setReady]
  );

  const updateTask = useCallback(
    (name: string, taskProgress: number) => {
      taskProgressRef.current[name] = Math.min(taskProgress, 100);
      recomputeProgress();
    },
    [recomputeProgress]
  );

  const dismiss = useCallback(() => {
    setDismissed(true);
    setIsLoading(false);
  }, []);

  // Safety timeout — loader never hangs forever
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (!readyRef.current) setReady();
    }, timeout);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [timeout, setReady]);

  // Simple mode: tick simulated progress when no tasks are registered
  useEffect(() => {
    if (tasks.length > 0) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (readyRef.current) return prev;
        return Math.min(prev + Math.random() * 2, 92);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [tasks.length]);

  return {
    isLoading: isLoading && !dismissed,
    progress,
    setReady,
    completeTask,
    updateTask,
    dismiss,
  };
}
