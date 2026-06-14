import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, animate, useTransform } from "framer-motion";
import { NSS_COLORS, NSS_LOGO_PATH, EASE } from "./loading.constants";
import type { NSSLogoRevealProps } from "./loading.types";

/**
 * NSSLogoReveal
 *
 * Orchestrates the multi-stage logo assembly sequence:
 *
 * 1. Outer scanning ring — a full-circle arc that sweeps around the logo
 *    using SVG pathLength trick, timed 0 → 800 ms.
 * 2. Cross-hair alignment lines — two perpendicular dashes that contract
 *    inward, snapping to guide the eye toward the logo mark.
 * 3. Corner bracket accents — four L-shaped corners that materialise at
 *    the four quadrants of the ring, giving it a viewfinder feel.
 * 4. The logo image itself — scales up from 0.7 with an overshoot spring
 *    and fades in, starting at ~600 ms.
 * 5. Inner halo — a very faint pulsing circle behind the logo.
 *
 * `onAssembled` fires after the full sequence completes (~1 800 ms).
 */
export function NSSLogoReveal({ onAssembled, progress }: NSSLogoRevealProps) {
  const ringProgress = useMotionValue(0);
  const calledRef = useRef(false);

  useEffect(() => {
    const controls = animate(ringProgress, 1, {
      duration: 1.2,
      ease: EASE.silkIn,
      onComplete: () => {
        if (!calledRef.current) {
          calledRef.current = true;
          onAssembled?.();
        }
      },
    });
    return controls.stop;
  }, [onAssembled, ringProgress]);

  // SVG pathLength trick — ring draws itself
  const ringOffset = useTransform(ringProgress, [0, 1], [1, 0]);

  // Ring circumference at r=62
  const R = 62;
  const C = 2 * Math.PI * R;

  // Corner bracket geometry — (cx, cy) → top-left quadrant, then rotated
  const BRACKET_SIZE = 10;
  const BRACKET_R = 68; // slightly outside the ring

  const brackets = [
    { angle: -135, label: "tl" },
    { angle:  -45, label: "tr" },
    { angle:   45, label: "br" },
    { angle:  135, label: "bl" },
  ] as const;

  return (
    <div
      style={{
        position: "relative",
        width: 204,
        height: 204,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* ── SVG ring + accents ───────────────────────────────────────────── */}
      <svg
        viewBox="0 0 204 204"
        width={204}
        height={204}
        style={{ position: "absolute", inset: 0 }}
        aria-hidden="true"
      >
        <defs>
          <filter id="logoRingGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Inner halo — faint ambient glow */}
        <motion.circle
          cx={102}
          cy={102}
          r={58}
          fill="none"
          stroke={NSS_COLORS.red}
          strokeWidth={30}
          strokeOpacity={0}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.04, 0.02] }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.6 }}
        />

        {/* Scanning outer ring */}
        <motion.circle
          cx={102}
          cy={102}
          r={R}
          fill="none"
          stroke={NSS_COLORS.red}
          strokeWidth={1}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          style={{
            strokeDashoffset: ringOffset,
            filter: "url(#logoRingGlow)",
            rotate: -90,
            transformOrigin: "102px 102px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ duration: 0.3 }}
        />

        {/* Secondary faint ring track */}
        <circle
          cx={102}
          cy={102}
          r={R}
          fill="none"
          stroke={NSS_COLORS.red}
          strokeWidth={0.4}
          strokeOpacity={0.12}
        />

        {/* Cross-hair alignment lines */}
        {/* Horizontal */}
        <motion.line
          x1={102 - BRACKET_R - 4}
          y1={102}
          x2={102 - R + 16}
          y2={102}
          stroke={NSS_COLORS.red}
          strokeWidth={0.6}
          strokeOpacity={0.4}
          strokeDasharray="3 4"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8, ease: EASE.silkIn }}
          style={{ transformOrigin: `${102 - BRACKET_R - 4}px 102px` }}
        />
        <motion.line
          x1={102 + R - 16}
          y1={102}
          x2={102 + BRACKET_R + 4}
          y2={102}
          stroke={NSS_COLORS.red}
          strokeWidth={0.6}
          strokeOpacity={0.4}
          strokeDasharray="3 4"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.85, ease: EASE.silkIn }}
          style={{ transformOrigin: `${102 + BRACKET_R + 4}px 102px` }}
        />
        {/* Vertical */}
        <motion.line
          x1={102}
          y1={102 - BRACKET_R - 4}
          x2={102}
          y2={102 - R + 16}
          stroke={NSS_COLORS.red}
          strokeWidth={0.6}
          strokeOpacity={0.4}
          strokeDasharray="3 4"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9, ease: EASE.silkIn }}
          style={{ transformOrigin: `102px ${102 - BRACKET_R - 4}px` }}
        />
        <motion.line
          x1={102}
          y1={102 + R - 16}
          x2={102}
          y2={102 + BRACKET_R + 4}
          stroke={NSS_COLORS.red}
          strokeWidth={0.6}
          strokeOpacity={0.4}
          strokeDasharray="3 4"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.95, ease: EASE.silkIn }}
          style={{ transformOrigin: `102px ${102 + BRACKET_R + 4}px` }}
        />

        {/* Corner bracket accents */}
        {brackets.map(({ angle, label }) => {
          const rad = (angle * Math.PI) / 180;
          const bx = 102 + BRACKET_R * Math.cos(rad);
          const by = 102 + BRACKET_R * Math.sin(rad);
          const rot = angle + 45; // align bracket to corner

          return (
            <motion.g
              key={label}
              transform={`translate(${bx}, ${by}) rotate(${rot})`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.55, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.0, ease: EASE.logoAssemble }}
              style={{ transformOrigin: "0px 0px" }}
            >
              <path
                d={`M -${BRACKET_SIZE / 2} 0 L -${BRACKET_SIZE / 2} -${BRACKET_SIZE / 2} L 0 -${BRACKET_SIZE / 2}`}
                fill="none"
                stroke={NSS_COLORS.red}
                strokeWidth={1}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.g>
          );
        })}
      </svg>

      {/* ── Logo image ──────────────────────────────────────────────────── */}
      <motion.div
        style={{
          position: "relative",
          width: 100,
          height: 100,
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          opacity: { duration: 0.6, delay: 0.7, ease: "easeOut" },
          scale:   { duration: 0.8, delay: 0.7, ease: EASE.logoAssemble },
        }}
      >
        <img
          src={NSS_LOGO_PATH}
          alt="NSS — National Service Scheme"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          onError={(e) => {
            // Fallback: render the NSS emblem text if SVG fails to load
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />

        {/* Fallback emblem — shown when logo file isn't present */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Playfair Display', Georgia, serif",
            color: NSS_COLORS.ivory,
          }}
        >
          <span style={{ fontSize: 42, fontWeight: 700, lineHeight: 1, color: NSS_COLORS.red }}>
            NSS
          </span>
          <span style={{ fontSize: 7, letterSpacing: "0.25em", opacity: 0.5, marginTop: 4 }}>
            NATIONAL SERVICE
          </span>
        </div>
      </motion.div>
    </div>
  );
}
