import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
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
    <div className="mx-auto max-w-6xl px-4 pb-2 pt-10 sm:pt-14">
      {eyebrow && (
        <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
          {eyebrow}
        </span>
      )}
      <h1 className="text-4xl font-extrabold text-balance sm:text-5xl">{title}</h1>
      {description && (
        <p className="mt-4 max-w-2xl text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto max-w-6xl px-4 ${className ?? ""}`}>{children}</div>
  );
}
