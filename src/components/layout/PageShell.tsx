import { type ReactNode, useRef, useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Container } from "@/components/clay";

export { Container };

export function PageShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const mainRef = useRef<HTMLDivElement>(null);

  // Trigger page-enter animation on route change
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    el.classList.remove("nss-page-enter");
    // Force reflow
    void el.offsetWidth;
    el.classList.add("nss-page-enter");
  }, [location.pathname]);

  return (
    <div
      className="nss-flex nss-flex-col"
      style={{ minHeight: "100vh", background: "var(--background)" }}
    >
      {/* Skip to main content — WCAG 2.4.1 */}
      <a
        href="#main-content"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "0",
          zIndex: 9999,
          padding: "0.5rem 1rem",
          background: "var(--primary)",
          color: "#fff",
          fontWeight: 700,
          borderRadius: "0 0 var(--radius-lg) 0",
          transition: "left 0.1s",
        }}
        onFocus={(e) => { (e.target as HTMLElement).style.left = "0"; }}
        onBlur={(e)  => { (e.target as HTMLElement).style.left = "-9999px"; }}
      >
        Skip to main content
      </a>
      <Navbar />
      <div
        id="main-content"
        ref={mainRef}
        className="nss-flex-1 nss-pt-16 nss-pb-28 nss-xl-pb-0"
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}

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
    <div
      className="nss-container nss-pb-2 nss-pt-10 nss-sm-pt-14"
      style={{ animation: "fadeUp 0.42s cubic-bezier(0.16,1,0.3,1) both" }}
    >
      {eyebrow && (
        <span
          className="nss-badge nss-badge-default nss-mb-3"
          style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.06em" }}
        >
          {eyebrow}
        </span>
      )}
      <h1
        className="nss-text-4xl nss-font-extrabold nss-text-balance nss-sm-text-5xl nss-text-gradient"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h1>
      {description && (
        <p
          className="nss-mt-4 nss-text-base nss-leading-relaxed nss-text-muted"
          style={{ maxWidth: "42rem" }}
        >
          {description}
        </p>
      )}
      <div
        className="nss-mt-5"
        style={{
          width: "2.75rem",
          height: "3.5px",
          borderRadius: "var(--radius-full)",
          background: "linear-gradient(90deg, var(--accent), var(--legacy-gold))",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
