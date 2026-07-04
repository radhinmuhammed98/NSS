import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Container } from "@/components/clay";

export { Container };

// ─── PageShell ────────────────────────────────────────────────────────────────
/**
 * Root layout wrapper for every page. (Vanilla CSS implementation)
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="nss-flex nss-flex-col" style={{ minHeight: "100vh", background: "var(--background)" }}>
      <Navbar />
      <main className="nss-flex-1 nss-pt-16 nss-pb-28 nss-xl-pb-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}

// ─── PageHeader ───────────────────────────────────────────────────────────────
/**
 * Standardized editorial page header used at the top of detail/list pages.
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
    <div className="nss-container nss-pb-2 nss-pt-10 nss-sm-pt-14">
      {eyebrow && (
        <span
          className="nss-badge nss-badge-default nss-mb-3"
          style={{
            fontFamily: "var(--font-sans)",
            border: "1px solid rgba(4, 36, 19, 0.2)"
          }}
        >
          {eyebrow}
        </span>
      )}
      <h1
        className="nss-text-4xl nss-font-extrabold nss-text-balance nss-sm-text-5xl"
        style={{ fontFamily: "var(--font-display)", color: "var(--primary)" }}
      >
        {title}
      </h1>
      {description && (
        <p
          className="nss-mt-4 nss-text-base nss-leading-relaxed nss-text-muted"
          style={{ fontFamily: "var(--font-sans)", maxWidth: "42rem" }}
        >
          {description}
        </p>
      )}
      {/* Decorative terracotta accent rule */}
      <div
        className="nss-mt-5"
        style={{ width: "3rem", height: "4px", borderRadius: "9999px", background: "var(--accent)" }}
        aria-hidden="true"
      />
    </div>
  );
}
