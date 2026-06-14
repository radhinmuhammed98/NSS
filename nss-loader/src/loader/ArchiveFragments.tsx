import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NSS_COLORS, ARCHIVE_YEARS, BRAND_TAGLINE } from "./loading.constants";
import type { ArchiveFragmentsProps } from "./loading.types";

/**
 * ArchiveFragments
 *
 * Decorative ambient layer rendered behind the main loader composition.
 * Surfaces the sense of history and accumulated memory through:
 *
 * - Year chips: archive year labels fading in at staggered delays
 * - Corner dateline badges: "Est. 1969" and "Since ·" marks in the corners
 * - Horizontal divider lines at the top and bottom of the viewport
 * - A faint diagonal "ARCHIVE" watermark text across the scene
 * - Scattered micro-dots that suggest photo-grain or document speckles
 *
 * All elements are non-interactive (pointer-events: none) and use
 * AnimatePresence for a clean exit when `visible` becomes false.
 */
export function ArchiveFragments({ visible }: ArchiveFragmentsProps) {
  const MICRO_DOTS: [number, number][] = [
    [8, 14], [92, 6], [23, 88], [78, 72], [45, 95],
    [63, 18], [12, 52], [88, 40], [35, 65], [70, 30],
    [18, 78], [55, 8],
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="archive-fragments"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          aria-hidden="true"
        >
          {/* ── Top rule ──────────────────────────────────────────────────── */}
          <motion.div
            style={{
              position: "absolute",
              top: 28,
              left: "10%",
              right: "10%",
              height: 1,
              background: `linear-gradient(90deg, transparent, ${NSS_COLORS.red}22, transparent)`,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
          />

          {/* ── Bottom rule ───────────────────────────────────────────────── */}
          <motion.div
            style={{
              position: "absolute",
              bottom: 28,
              left: "10%",
              right: "10%",
              height: 1,
              background: `linear-gradient(90deg, transparent, ${NSS_COLORS.red}22, transparent)`,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.55 }}
          />

          {/* ── Top-left corner badge ─────────────────────────────────────── */}
          <motion.div
            style={{
              position: "absolute",
              top: 22,
              left: 24,
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 9,
              fontWeight: 300,
              letterSpacing: "0.22em",
              color: NSS_COLORS.ivory,
              opacity: 0.22,
              textTransform: "uppercase",
            }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 0.22, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Est. 1969
          </motion.div>

          {/* ── Top-right corner badge ────────────────────────────────────── */}
          <motion.div
            style={{
              position: "absolute",
              top: 22,
              right: 24,
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 9,
              fontWeight: 300,
              letterSpacing: "0.22em",
              color: NSS_COLORS.ivory,
              opacity: 0.22,
              textTransform: "uppercase",
            }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 0.22, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            India ·
          </motion.div>

          {/* ── Bottom-left tagline ───────────────────────────────────────── */}
          <motion.div
            style={{
              position: "absolute",
              bottom: 22,
              left: 24,
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 8,
              fontWeight: 300,
              letterSpacing: "0.18em",
              color: NSS_COLORS.ivory,
              opacity: 0.18,
              textTransform: "uppercase",
            }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 0.18, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {BRAND_TAGLINE}
          </motion.div>

          {/* ── Archive year chips — bottom centre row ────────────────────── */}
          <div
            style={{
              position: "absolute",
              bottom: 38,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              gap: 18,
            }}
          >
            {ARCHIVE_YEARS.map((year, i) => (
              <motion.span
                key={year}
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 9,
                  fontWeight: 300,
                  letterSpacing: "0.18em",
                  color: NSS_COLORS.ivory,
                  textTransform: "uppercase",
                }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 0.28, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 + i * 0.08 }}
              >
                {year}
              </motion.span>
            ))}
          </div>

          {/* ── Diagonal "ARCHIVE" watermark ──────────────────────────────── */}
          <motion.div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(-28deg)",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(40px, 8vw, 80px)",
              fontWeight: 700,
              fontStyle: "italic",
              letterSpacing: "0.3em",
              color: NSS_COLORS.red,
              opacity: 0,
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
            animate={{ opacity: [0, 0.025, 0.018] }}
            transition={{ duration: 2, delay: 0.6, ease: "easeOut" }}
          >
            ARCHIVE
          </motion.div>

          {/* ── Micro-dots — photo grain effect ──────────────────────────── */}
          {MICRO_DOTS.map(([px, py], i) => (
            <motion.div
              key={`dot-${i}`}
              style={{
                position: "absolute",
                left: `${px}%`,
                top: `${py}%`,
                width: 2,
                height: 2,
                borderRadius: "50%",
                background: NSS_COLORS.red,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.12, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.06 }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
