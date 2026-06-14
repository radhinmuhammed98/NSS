// ─── NSS Loader · Design Constants ───────────────────────────────────────────
// Single source of truth for brand tokens, timing, and geometry.

/** NSS brand color tokens — derived from official identity */
export const NSS_COLORS = {
  red: "#C41E3A",
  deepRed: "#8B0000",
  crimson: "#DC143C",
  ivory: "#F5F0E8",
  warmWhite: "#EDE8DC",
  ink: "#0E0C0A",
  charcoal: "#1A1612",
  gold: "#C9A84C",
  redGlow: "rgba(196, 30, 58, 0.18)",
  redGlowStrong: "rgba(196, 30, 58, 0.35)",
  threadGlow: "rgba(220, 20, 60, 0.6)",
} as const;

/** Path for the official NSS logo asset (served from /public) */
export const NSS_LOGO_PATH = "/nss-logo.svg";
export const NSS_LOGO_PNG_FALLBACK = "/nss-logo.png";

/** NSS motto */
export const NSS_MOTTO = "NOT ME BUT YOU";
export const NSS_FULL_NAME = "National Service Scheme";

/** Brand tagline shown during load */
export const BRAND_TAGLINE = "Every batch · Every camp · Every story";

/** Circumference of the progress ring at radius 90 (2π × 90 ≈ 565.49) */
export const RING_CIRCUMFERENCE = 2 * Math.PI * 90;

/** Number of tick marks on the progress ring (clock/compass face) */
export const RING_TICK_COUNT = 60;

/**
 * Phase timings in ms, relative to loader mount.
 * The animation is staggered across these checkpoints.
 */
export const PHASE_TIMING = {
  ambient: 0,         // Background texture fades in
  constellation: 600, // Service-dot constellation appears
  logo: 1600,         // Logo begins assembling
  motto: 3800,        // Motto text fades in
  brand: 5000,        // "National Service Scheme" title
  tagline: 5800,      // Brand tagline line
  archiveFadeOut: 6400,
  complete: 7000,     // Full sequence done — ready to exit
} as const;

/** Archive years shown as fragment markers along the thread */
export const ARCHIVE_YEARS = [
  "2008", "2012", "2016", "2019", "2022", "2024",
] as const;

/** Loading label texts — rotate while progress increases */
export const LOADING_LABELS = [
  "Awakening archive",
  "Loading memories",
  "Tracing legacy paths",
  "Assembling batches",
  "Preparing the story",
] as const;

/** Easing curves used across the loader */
export const EASE = {
  silkIn: [0.25, 0.46, 0.45, 0.94] as const,
  silkOut: [0.55, 0.06, 0.68, 0.19] as const,
  threadDraw: [0.16, 1, 0.3, 1] as const,
  logoAssemble: [0.34, 1.56, 0.64, 1] as const,
};

/** Framer Motion spring config for ring fill */
export const RING_SPRING = {
  stiffness: 60,
  damping: 20,
  mass: 1,
} as const;
