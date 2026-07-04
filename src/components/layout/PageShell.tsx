import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

// ─── PageShell ────────────────────────────────────────────────────────────────
/**
 * Root layout wrapper for every page.
 *
 * Padding notes:
 *   pt-16        → clears the fixed top header (height: h-16 = 4rem)
 *   pb-28        → on mobile, clears the floating bottom pill nav:
 *                  pill height (~3rem) + bottom-5 offset + safe breathing room
 *   xl:pb-0      → desktop has no bottom pill, so no extra padding needed
 *
 * NO horizontal padding on <main> — each page's <Container> component
 * manages its own px-* to avoid double-constriction.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: "#fbf9f4" }}>
      <Navbar />
      <main className="flex-1 pt-16 pb-28 xl:pb-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}

// ─── PageHeader ───────────────────────────────────────────────────────────────
/**
 * Standardized editorial page header used at the top of detail/list pages.
 * Renders an optional eyebrow pill, an h1 title, optional description,
 * and a decorative terracotta accent rule.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 pb-2 pt-10 sm:pt-14">
      {eyebrow && (
        <span
          className="mb-3 inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-bold uppercase "
          style={{
            background: "#1b3a27",
            color: "#c7ebd0",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {eyebrow}
        </span>
      )}
      <h1
        className="text-4xl font-extrabold text-balance sm:text-5xl"
        style={{ fontFamily: "'Libre Caslon Text', serif", color: "#042413" }}
      >
        {title}
      </h1>
      {description && (
        <p
          className="mt-4 max-w-2xl text-base leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif", color: "#424843" }}
        >
          {description}
        </p>
      )}
      {/* Decorative terracotta accent rule */}
      <div
        className="mt-5 w-12 h-1 rounded-full"
        style={{ background: "#a04021" }}
        aria-hidden="true"
      />
    </div>
  );
}

// ─── Container ────────────────────────────────────────────────────────────────
/**
 * Responsive max-width container with horizontal padding.
 * Used inside page routes to constrain content width and apply
 * consistent gutters. PageShell's <main> intentionally has no px-*
 * so this is the single source of horizontal spacing.
 */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 md:px-10 ${className ?? ""}`}>
      {children}
    </div>
  );
}
