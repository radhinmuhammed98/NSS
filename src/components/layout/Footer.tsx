import { Link } from "@tanstack/react-router";
import { getSiteSettingsSync } from "@/lib/content";
import { NSSLogo } from "@/assets/NSSLogo";

const sections = [
  { to: "/batches", label: "Batches" },
  { to: "/projects", label: "Projects" },
  { to: "/camps", label: "Camps" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reports", label: "Reports" },
  { to: "/journey", label: "Journey" },
];

export function Footer() {
  const s = getSiteSettingsSync();
  return (
    <footer className="mt-20 px-3 pb-6" aria-label="Site footer">
      {/* Subtle thread line accent at top */}
      <div
        className="mx-auto mb-0 max-w-6xl h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--color-thread) / 0.35, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="clay mx-auto max-w-6xl p-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand block */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-3 focus-visible:rounded-lg"
              aria-label="NSS Digital Legacy — Home"
            >
              {/* Logo in neutral white frame */}
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 p-1 shadow-sm ring-1 ring-border/40">
                <NSSLogo height={40} width={40} decorative />
              </span>
              <div className="leading-tight">
                <p className="font-display text-base font-bold text-primary">
                  NSS Digital Legacy
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  {s.unitName}
                </p>
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              A living archive of service, leadership, camps, projects, and
              memories. Every batch serves and leaves, but their journey stays
              forever.
            </p>

            {/* Motto — legacy statement in editorial Playfair */}
            <p className="mt-4 font-display text-sm italic font-semibold text-primary/80">
              &ldquo;{s.motto}&rdquo;
            </p>
          </div>

          {/* Explore links */}
          <div>
            <p className="mb-3 font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Explore
            </p>
            <ul className="space-y-2 text-sm" role="list">
              {sections.map((l) => (
                <li key={l.to} role="listitem">
                  <Link
                    to={l.to}
                    className="text-muted-foreground transition-colors hover:text-primary focus-visible:rounded"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact details */}
          <div>
            <p className="mb-3 font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Reach Us
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground" role="list">
              <li role="listitem">{s.schoolName}</li>
              <li role="listitem">{s.location}</li>
              <li role="listitem">
                <a
                  href={`mailto:${s.email}`}
                  className="hover:text-primary transition-colors focus-visible:rounded"
                >
                  {s.email}
                </a>
              </li>
              <li role="listitem">
                <Link
                  to="/contact"
                  className="hover:text-primary transition-colors focus-visible:rounded"
                >
                  Contact page →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-border pt-5 flex flex-col items-center gap-1 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {s.unitName}, {s.schoolName}.
          </span>
          <span className="text-muted-foreground/60">
            Built as a permanent digital legacy.
          </span>
        </div>
      </div>
    </footer>
  );
}
