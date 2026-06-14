import React, { useMemo } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { NSS_COLORS, RING_CIRCUMFERENCE, RING_TICK_COUNT, RING_SPRING } from "./loading.constants";
import type { ProgressRingProps } from "./loading.types";

/**
 * ProgressRing
 *
 * Circular progress indicator with 60 tick marks (clock/compass aesthetic).
 * The fill arc responds to live progress via a Framer Motion spring so it
 * never jumps — it eases in, decelerating near the top.
 *
 * The leading dot orbits the ring at the exact progress angle, with a
 * crimson drop-shadow for the glow effect.
 */
export function ProgressRing({
  progress,
  radius = 90,
  strokeWidth = 1.5,
}: ProgressRingProps) {
  const size = (radius + 16) * 2;
  const circumference = 2 * Math.PI * radius;
  const cx = size / 2;
  const cy = size / 2;

  // Spring-animated progress value → smooth ring fill
  const springProgress = useSpring(progress, RING_SPRING);

  const strokeDashoffset = useTransform(
    springProgress,
    [0, 100],
    [circumference, 0]
  );

  // Leading dot position — orbits at the progress tip
  const dotCx = useTransform(springProgress, (p) => {
    const angle = ((p / 100) * 360 - 90) * (Math.PI / 180);
    return cx + radius * Math.cos(angle);
  });

  const dotCy = useTransform(springProgress, (p) => {
    const angle = ((p / 100) * 360 - 90) * (Math.PI / 180);
    return cy + radius * Math.sin(angle);
  });

  // Pre-compute tick marks (major every 5th)
  const ticks = useMemo(() => {
    const tickRadius = radius + 5;
    return Array.from({ length: RING_TICK_COUNT }, (_, i) => {
      const angle = (i / RING_TICK_COUNT) * 360 - 90;
      const rad = (angle * Math.PI) / 180;
      const isMajor = i % 5 === 0;
      const outerR = tickRadius + 2;
      const innerR = isMajor ? tickRadius - 4 : tickRadius - 2;

      return {
        x1: cx + innerR * Math.cos(rad),
        y1: cy + innerR * Math.sin(rad),
        x2: cx + outerR * Math.cos(rad),
        y2: cy + outerR * Math.sin(rad),
        isMajor,
      };
    });
  }, [radius, cx, cy]);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{
        position: "absolute",
        top: -16,
        left: -16,
        transform: "rotate(-90deg)",
      }}
      aria-hidden="true"
    >
      <defs>
        <filter id="ringGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Tick marks — clock face */}
      {ticks.map((tick, i) => (
        <line
          key={i}
          x1={tick.x1}
          y1={tick.y1}
          x2={tick.x2}
          y2={tick.y2}
          stroke={NSS_COLORS.red}
          strokeWidth={tick.isMajor ? 1.2 : 0.5}
          strokeOpacity={tick.isMajor ? 0.4 : 0.15}
          strokeLinecap="round"
        />
      ))}

      {/* Track ring — ghost circle */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke={NSS_COLORS.red}
        strokeOpacity={0.1}
        strokeWidth={strokeWidth}
      />

      {/* Progress fill — spring animated */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke={NSS_COLORS.red}
        strokeWidth={strokeWidth + 0.5}
        strokeLinecap="round"
        strokeDasharray={circumference}
        style={{ strokeDashoffset, filter: "url(#ringGlow)" }}
      />

      {/* Bright leading dot at the progress tip */}
      <motion.circle
        r={3}
        fill={NSS_COLORS.crimson}
        style={{
          cx: dotCx,
          cy: dotCy,
          filter: `drop-shadow(0 0 5px ${NSS_COLORS.crimson})`,
        }}
      />
    </svg>
  );
}
