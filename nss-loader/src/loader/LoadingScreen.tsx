import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./loading.css";

import { LegacyThread }     from "./LegacyThread";
import { NSSLogoReveal }    from "./NSSLogoReveal";
import { ProgressRing }     from "./ProgressRing";
import { ArchiveFragments } from "./ArchiveFragments";
import { useSimulatedProgress } from "./useSimulatedProgress";

import {
  NSS_COLORS,
  NSS_MOTTO,
  NSS_FULL_NAME,
  BRAND_TAGLINE,
  LOADING_LABELS,
  PHASE_TIMING,
  EASE,
} from "./loading.constants";

import type { LoadingScreenProps, LoaderPhase } from "./loading.types";

/** ms → boolean phase gate */
function usePhaseGate(delayMs: number): boolean {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setActive(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);
  return active;
}

/**
 * LoadingScreen
 *
 * The top-level loading overlay for the NSS app. Composes all sub-components
 * into a timed, phased animation sequence:
 *
 * Phase timeline (ms from mount):
 *   0      → grain + vignette + thread begin drawing
 *   600    → constellation dots appear (handled inside LegacyThread)
 *   1600   → logo assembly starts
 *   3800   → motto fades in
 *   5000   → "National Service Scheme" brand name appears
 *   5800   → tagline fades in
 *   6400   → archive fragments begin fading out
 *   7000   → full sequence done → ready to exit when progress also hits 100
 *
 * The loader will NOT exit until:
 *   (a) progress reaches 100, AND
 *   (b) minDuration has elapsed, AND
 *   (c) the animation sequence is complete (≥7 000 ms).
 *
 * Exit: AnimatePresence drives the full-screen fade-out once `isLoading`
 * becomes false, ensuring no content flash.
 */
export function LoadingScreen({
  isLoading,
  progress: externalProgress,
  onExitComplete,
  error,
  minDuration = 4_200,
}: LoadingScreenProps) {

  // ── Progress simulation ──────────────────────────────────────────────────
  const { displayProgress, shouldExit, markAnimationReady } =
    useSimulatedProgress({
      externalProgress,
      isReady: !isLoading || externalProgress === 100,
      minDuration,
    });

  // ── Phase gates ──────────────────────────────────────────────────────────
  const showLogo         = usePhaseGate(PHASE_TIMING.logo);
  const showMotto        = usePhaseGate(PHASE_TIMING.motto);
  const showBrand        = usePhaseGate(PHASE_TIMING.brand);
  const showTagline      = usePhaseGate(PHASE_TIMING.tagline);
  const archiveFadeOut   = usePhaseGate(PHASE_TIMING.archiveFadeOut);
  const sequenceComplete = usePhaseGate(PHASE_TIMING.complete);

  // Mark animation ready once the full sequence has played
  useEffect(() => {
    if (sequenceComplete) markAnimationReady();
  }, [sequenceComplete, markAnimationReady]);

  // ── Rotating label ───────────────────────────────────────────────────────
  const [labelIdx, setLabelIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setLabelIdx((i) => (i + 1) % LOADING_LABELS.length);
    }, 1_600);
    return () => clearInterval(t);
  }, []);

  // ── Thread draw progress (0→1, mapped from display progress) ────────────
  const threadProgress = Math.min(displayProgress / 100, 1);

  // ── Logo assembled callback ──────────────────────────────────────────────
  const [_logoAssembled, setLogoAssembled] = useState(false);
  const handleLogoAssembled = useCallback(() => {
    setLogoAssembled(true);
  }, []);

  // ── Effective loading state: also exit when shouldExit fires ────────────
  const effectivelyLoading = isLoading && !shouldExit;

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {effectivelyLoading && (
        <motion.div
          className="nss-loader"
          key="nss-loading-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.9, ease: EASE.silkOut },
          }}
          aria-live="polite"
          aria-label="Loading NSS application"
          role="status"
        >
          {/* ── Film grain texture ────────────────────────────────────────── */}
          <div className="nss-loader__grain" aria-hidden="true" />

          {/* ── Radial vignette ───────────────────────────────────────────── */}
          <div className="nss-loader__vignette" aria-hidden="true" />

          {/* ── Ambient red glow ──────────────────────────────────────────── */}
          <div className="nss-loader__glow" aria-hidden="true" />

          {/* ── Full-viewport Red Thread of Legacy ───────────────────────── */}
          <LegacyThread drawProgress={threadProgress} />

          {/* ── Archive fragments (ambient historical layer) ───────────────── */}
          <ArchiveFragments visible={!archiveFadeOut} />

          {/* ── Central composition ──────────────────────────────────────── */}
          <div className="nss-loader__center">

            {/* Ring + Logo wrapper */}
            <div className="nss-loader__ring-wrap">
              {/* Progress ring always present */}
              <ProgressRing progress={displayProgress} />

              {/* Logo assembly (gated by phase) */}
              <AnimatePresence>
                {showLogo && (
                  <motion.div
                    key="logo"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <NSSLogoReveal
                      progress={displayProgress}
                      onAssembled={handleLogoAssembled}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Motto ─────────────────────────────────────────────────── */}
            <AnimatePresence>
              {showMotto && (
                <motion.p
                  key="motto"
                  className="nss-loader__motto"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: EASE.silkIn }}
                >
                  {NSS_MOTTO}
                </motion.p>
              )}
            </AnimatePresence>

            {/* ── Brand name ────────────────────────────────────────────── */}
            <AnimatePresence>
              {showBrand && (
                <motion.h1
                  key="brand"
                  className="nss-loader__brand"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: EASE.silkIn }}
                >
                  {NSS_FULL_NAME}
                </motion.h1>
              )}
            </AnimatePresence>

            {/* ── Tagline ───────────────────────────────────────────────── */}
            <AnimatePresence>
              {showTagline && (
                <motion.p
                  key="tagline"
                  className="nss-loader__tagline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.0, delay: 0.2 }}
                >
                  {BRAND_TAGLINE}
                </motion.p>
              )}
            </AnimatePresence>

            {/* ── Progress label + rotating text ────────────────────────── */}
            <motion.div
              className="nss-loader__progress-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={labelIdx}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.35 }}
                >
                  {LOADING_LABELS[labelIdx]}
                </motion.span>
              </AnimatePresence>

              <span className="nss-loader__progress-num" aria-live="polite">
                {displayProgress}%
              </span>
            </motion.div>

            {/* ── Thin progress bar ─────────────────────────────────────── */}
            <motion.div
              className="nss-loader__bar-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                className="nss-loader__bar-fill"
                style={{ width: `${displayProgress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </motion.div>

            {/* ── Error state ───────────────────────────────────────────── */}
            <AnimatePresence>
              {error && (
                <motion.p
                  key="error"
                  className="nss-loader__error"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  role="alert"
                >
                  ⚠ {error} — retrying…
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* ── Screen-reader text ────────────────────────────────────────── */}
          <span
            style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}
          >
            Loading NSS application, {displayProgress} percent complete.
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
