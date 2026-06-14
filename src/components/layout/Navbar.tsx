import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NSSLogo } from "@/assets/NSSLogo";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/batches", label: "Batches" },
  { to: "/projects", label: "Projects" },
  { to: "/camps", label: "Camps" },
  { to: "/highlights", label: "Highlights" },
  { to: "/gallery", label: "Gallery" },
  { to: "/videos", label: "Videos" },
  { to: "/reports", label: "Reports" },
  { to: "/journey", label: "Journey" },
  { to: "/team", label: "Team" },
  { to: "/stories", label: "Stories" },
  { to: "/notices", label: "Notices" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3">
      <nav
        className="clay-sm mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Brand lockup — logo + wordmark */}
        <Link
          to="/"
          className="flex items-center gap-2.5 focus-visible:rounded-lg"
          onClick={() => setOpen(false)}
          aria-label="NSS Digital Legacy — Home"
        >
          {/* Official SVG logo in a clean neutral frame — no red pill */}
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-white/80 p-0.5 shadow-sm ring-1 ring-border/50">
            <NSSLogo height={36} width={36} decorative />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-sm font-bold text-primary tracking-tight">
              NSS
            </span>
            <span className="font-sans text-[11px] font-medium text-muted-foreground tracking-wide">
              Digital Legacy
            </span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-0.5 xl:flex" role="list">
          {links.slice(0, 9).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              role="listitem"
              activeOptions={{ exact: l.to === "/" }}
              className="relative rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-offset-2"
              activeProps={{
                className:
                  "text-primary font-semibold after:absolute after:bottom-0 after:left-2.5 after:right-2.5 after:h-0.5 after:rounded-full after:bg-primary",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          id="mobile-menu-toggle"
          onClick={() => setOpen((v) => !v)}
          className="clay-sm flex h-10 w-10 items-center justify-center xl:hidden focus-visible:outline-offset-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="menu"
            aria-labelledby="mobile-menu-toggle"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="clay mx-auto mt-2 grid max-w-6xl grid-cols-2 gap-1 p-3 xl:hidden"
          >
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                role="menuitem"
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-offset-2"
                activeProps={{
                  className:
                    "bg-surface text-primary font-semibold border-l-2 border-primary",
                }}
              >
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
