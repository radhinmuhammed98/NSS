// ─── NSS Loader · Type Definitions ──────────────────────────────────────────
// Shared interfaces and union types for the entire loader subsystem.

export interface LoadingScreenProps {
  /** Whether the app is still loading. Controls visibility via AnimatePresence. */
  isLoading: boolean;
  /** 0–100. When undefined, simulated progress is used internally. */
  progress?: number;
  /** Called after the exit animation fully completes. */
  onExitComplete?: () => void;
  /** Optional error message. Surfaces a subtle retry prompt. */
  error?: string | null;
  /** Minimum ms the loader stays visible regardless of progress. Default: 4200 */
  minDuration?: number;
}

export interface ProgressRingProps {
  /** 0–100 */
  progress: number;
  radius?: number;
  strokeWidth?: number;
}

export interface NSSLogoRevealProps {
  /** Fired once the inner logo mark finishes assembling */
  onAssembled?: () => void;
  /** 0–100 progress value to drive the ring */
  progress: number;
}

export interface ArchiveFragmentsProps {
  /** Whether to show the fragments */
  visible: boolean;
}

export interface LegacyThreadProps {
  /** 0–1 draw progress for the thread path */
  drawProgress: number;
}

export type LoaderPhase =
  | "ambient"
  | "constellation"
  | "logo"
  | "motto"
  | "brand"
  | "complete"
  | "exit";

export interface UseSimulatedProgressOptions {
  /** External 0–100 progress, or undefined for simulation */
  externalProgress?: number;
  /** Whether the app signals readiness */
  isReady: boolean;
  /** Minimum loader visible duration in ms */
  minDuration?: number;
}

export interface UseSimulatedProgressResult {
  /** Smoothed 0–100 progress value for display */
  displayProgress: number;
  /** Whether the loader should begin its exit sequence */
  shouldExit: boolean;
  /** Mark the animation sequence as done (so exit can happen) */
  markAnimationReady: () => void;
}

export interface AppLoaderTask {
  name: string;
  weight: number;
}

export interface UseAppLoaderOptions {
  /** Tasks to track. Each contributes proportionally to overall progress. */
  tasks?: AppLoaderTask[];
  /** Override: treat app as ready after this ms regardless of tasks */
  timeout?: number;
  /** Minimum loader visible duration in ms */
  minDuration?: number;
}

export interface UseAppLoaderResult {
  /** Whether the app is still loading */
  isLoading: boolean;
  /** 0–100 overall progress */
  progress: number;
  /** Manually mark the app as ready (all tasks done) */
  setReady: () => void;
  /** Mark a named task as complete */
  completeTask: (name: string) => void;
  /** Update a named task's progress (0–100) */
  updateTask: (name: string, taskProgress: number) => void;
  /** Mark loader as done and dismissed */
  dismiss: () => void;
}
