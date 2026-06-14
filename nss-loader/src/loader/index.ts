/**
 * @module nss-loader
 *
 * Barrel export for the NSS loading screen subsystem.
 * Import from here — never from individual files directly.
 *
 * @example
 * ```tsx
 * import {
 *   LoadingScreen,
 *   useAppLoader,
 *   useSimulatedProgress,
 * } from './loader';
 * ```
 */

// ── Components ─────────────────────────────────────────────────────────────
export { LoadingScreen }     from "./LoadingScreen";
export { NSSLogoReveal }     from "./NSSLogoReveal";
export { LegacyThread }      from "./LegacyThread";
export { ProgressRing }      from "./ProgressRing";
export { ArchiveFragments }  from "./ArchiveFragments";

// ── Hooks ──────────────────────────────────────────────────────────────────
export { useAppLoader }          from "./useAppLoader";
export { useSimulatedProgress }  from "./useSimulatedProgress";

// ── Types ──────────────────────────────────────────────────────────────────
export type {
  LoadingScreenProps,
  ProgressRingProps,
  NSSLogoRevealProps,
  ArchiveFragmentsProps,
  LegacyThreadProps,
  LoaderPhase,
  UseAppLoaderOptions,
  UseAppLoaderResult,
  UseSimulatedProgressOptions,
  UseSimulatedProgressResult,
  AppLoaderTask,
} from "./loading.types";

// ── Constants (re-exported for consumer convenience) ───────────────────────
export {
  NSS_COLORS,
  NSS_LOGO_PATH,
  NSS_MOTTO,
  NSS_FULL_NAME,
  BRAND_TAGLINE,
  LOADING_LABELS,
  ARCHIVE_YEARS,
  PHASE_TIMING,
  RING_CIRCUMFERENCE,
  RING_TICK_COUNT,
  EASE,
  RING_SPRING,
} from "./loading.constants";
