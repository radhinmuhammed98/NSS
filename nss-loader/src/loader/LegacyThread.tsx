import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { NSS_COLORS, EASE } from "./loading.constants";
import type { LegacyThreadProps } from "./loading.types";

/**
 * LegacyThread — The Red Thread of Legacy
 *
 * An SVG animation that renders a sinusoidal red thread drawing itself
 * left-to-right across the scene. It evokes continuity between NSS batches —
 * a living connection from every past volunteer to every future one.
 *
 * Architecture:
 * - Primary thread: solid 1.5 px stroke, driven by `drawProgress` (0–1)
 * - Ghost thread:   faint dashed precursor at 0.08 opacity, draws first
 * - Harmonic echo:  subtler secondary wave at offset phase
 * - Service dots:   static constellation that fades in behind the thread
 * - Frame shards:   photo-outline rectangles — archive references
 * - Timeline rules: two ultra-faint horizontal guide lines
 * - Fade mask:      linear gradient so thread ends dissolve softly
 *
 * The thread uses SVG `pathLength={1}` + `strokeDashoffset` trick so the
 * draw progress maps exactly 0→1 regardless of actual path length.
 */
export function LegacyThread({ drawProgress }: LegacyThreadProps) {
  // Drive the main thread draw with a MotionValue for direct style binding
  const mvProgress = useMotionValue(0);

  useEffect(() => {
    const controls = animate(mvProgress, drawProgress, {
      duration: 2.4,
      ease: EASE.threadDraw,
    });
    return controls.stop;
  }, [drawProgress, mvProgress]);

  // Ghost thread draws slightly ahead — always at drawProgress + 0.12, capped at 1
  const ghostProgress = useTransform(mvProgress, (v) => Math.min(v + 0.12, 1));

  // Stroke dashoffset for SVG pathLength trick:
  // pathLength=1, so dasharray=1, dashoffset=(1 - progress)
  const mainOffset   = useTransform(mvProgress,    (v) => 1 - v);
  const ghostOffset  = useTransform(ghostProgress, (v) => 1 - v);

  // The primary sinusoidal wave — 2.5 full S-curves across 800 px viewport
  const MAIN_PATH =
    "M -60 300 Q 100 160 200 300 Q 300 440 400 300 Q 500 160 600 300 Q 700 440 860 300";

  // Harmonic echo — slightly offset phase and amplitude
  const ECHO_PATH =
    "M -60 310 Q 110 175 215 310 Q 315 445 415 310 Q 515 175 615 310 Q 715 445 870 310";

  // Service dots — the constellation of past volunteers
  const DOTS: [number, number][] = [
    [120, 230], [200, 320], [330, 268], [430, 342],
    [540, 255], [650, 315], [720, 282], [290, 195],
    [480, 400], [580, 188],
  ];

  // Archive photo-frame shards
  const FRAMES = [
    { x: 48,  y: 140, w: 30, h: 22 },
    { x: 700, y: 372, w: 30, h: 22 },
    { x: 112, y: 385, w: 24, h: 18 },
    { x: 635, y: 152, w: 24, h: 18 },
    { x: 358, y: 100, w: 20, h: 15 },
    { x: 442, y: 480, w: 20, h: 15 },
  ];

  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <defs>
        {/* Soft glow for the thread */}
        <filter id="threadGlow" x="-10%" y="-40%" width="120%" height="180%">
          <feGaussianBlur stdDeviation="1.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Strong glow for the thread tip highlight */}
        <filter id="threadTipGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Fade mask — thread dissolves at both ends */}
        <linearGradient id="threadFadeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="white" stopOpacity={0} />
          <stop offset="6%"   stopColor="white" stopOpacity={1} />
          <stop offset="94%"  stopColor="white" stopOpacity={1} />
          <stop offset="100%" stopColor="white" stopOpacity={0} />
        </linearGradient>
        <mask id="threadFadeMask">
          <rect x="0" y="0" width="800" height="600" fill="url(#threadFadeGrad)" />
        </mask>
      </defs>

      {/* ── Service-dot constellation ───────────────────────────────────── */}
      {DOTS.map(([dotCx, dotCy], i) => (
        <motion.circle
          key={`dot-${i}`}
          cx={dotCx}
          cy={dotCy}
          r={1.6}
          fill={NSS_COLORS.red}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.45, 0.25], scale: [0, 1.4, 1] }}
          transition={{
            duration: 1.0,
            delay: 0.25 + i * 0.1,
            ease: "easeOut",
          }}
        />
      ))}

      {/* ── Archive photo-frame shards ──────────────────────────────────── */}
      {FRAMES.map((f, i) => (
        <motion.rect
          key={`frame-${i}`}
          x={f.x}
          y={f.y}
          width={f.w}
          height={f.h}
          fill="none"
          stroke={NSS_COLORS.red}
          strokeWidth={0.6}
          strokeOpacity={0.22}
          rx={1.5}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 + i * 0.15, ease: "easeOut" }}
        />
      ))}

      {/* ── Horizontal timeline guide lines ─────────────────────────────── */}
      <motion.line
        x1={0} y1={200} x2={800} y2={200}
        stroke={NSS_COLORS.red} strokeWidth={0.5} strokeOpacity={0.07}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />
      <motion.line
        x1={0} y1={400} x2={800} y2={400}
        stroke={NSS_COLORS.red} strokeWidth={0.5} strokeOpacity={0.07}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, delay: 0.35, ease: "easeInOut" }}
      />

      {/* ── Thread group (masked for fade at edges) ─────────────────────── */}
      <g mask="url(#threadFadeMask)">

        {/* Ghost thread — dashed precursor, draws slightly ahead */}
        <motion.path
          d={MAIN_PATH}
          fill="none"
          stroke={NSS_COLORS.red}
          strokeWidth={0.6}
          strokeOpacity={0.1}
          strokeDasharray="5 9"
          pathLength={1}
          style={{ strokeDashoffset: ghostOffset }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        {/* Harmonic echo — subtler secondary wave */}
        <motion.path
          d={ECHO_PATH}
          fill="none"
          stroke={NSS_COLORS.deepRed}
          strokeWidth={0.5}
          strokeOpacity={0.06}
          pathLength={1}
          style={{ strokeDashoffset: mainOffset }}
          strokeDasharray={1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />

        {/* Main red thread — the living spine of legacy */}
        <motion.path
          d={MAIN_PATH}
          fill="none"
          stroke={NSS_COLORS.red}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          style={{ strokeDashoffset: mainOffset }}
          strokeDasharray={1}
          filter="url(#threadGlow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />

        {/* Inner bright core of the thread — gives it depth */}
        <motion.path
          d={MAIN_PATH}
          fill="none"
          stroke={NSS_COLORS.crimson}
          strokeWidth={0.5}
          strokeLinecap="round"
          pathLength={1}
          style={{ strokeDashoffset: mainOffset }}
          strokeDasharray={1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        />
      </g>
    </svg>
  );
}
