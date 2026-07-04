import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Container } from "@/components/clay";

export { Container };

// ─── PageShell ────────────────────────────────────────────────────────────────
/**
 * Root layout wrapper for every page.
 *
 * Padding notes:
 *   pt-16        → clears the fixed top header (height: h-16 = 4rem)
 *   pb-28        → on mobile, clears the floating bottom pill nav
 *   xl:pb-0      → desktop has no bottom pill, so no extra padding needed
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
          className="mb-3 inline-flex items-center gap-1.5 rounded-md bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold uppercase text-primary"
          style={{
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
        className="mt-5 w-12 h-1 rounded-full bg-accent"
        aria-hidden="true"
      />
    </div>
  );
}
