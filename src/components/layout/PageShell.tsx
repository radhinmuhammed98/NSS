import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: "#fbf9f4" }}>
      <Navbar />
      {/* pt-16 accounts for the fixed header height */}
      <main className="flex-1 pt-16 pb-28 sm:pb-32 xl:pb-0 px-4 sm:px-6 md:px-10">{children}</main>
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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 pb-2 pt-10 sm:pt-14">
      {eyebrow && (
        <span
          className="mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider"
          style={{ background: "#1b3a27", color: "#c7ebd0", fontFamily: "'DM Sans', sans-serif" }}
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
      {/* Decorative terracotta rule */}
      <div
        className="mt-5 w-12 h-1 rounded-full"
        style={{ background: "#a04021" }}
        aria-hidden="true"
      />
    </div>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 md:px-10 ${className ?? ""}`}>{children}</div>
  );
}
