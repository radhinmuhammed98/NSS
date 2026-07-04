import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { NSSLogo } from "@/assets/NSSLogo";
import { cn } from "@/lib/utils";
import {
  getBatches,
  getCamps,
  getHighlights,
  getNotices,
  getProjects,
  getReports,
  getStories,
  getTeam,
  getTimeline,
  getVideos,
} from "@/lib/data";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  to: string;
  label: string;
  icon: string;
}

interface NavGroup {
  label: string;
  icon: string;
  items: NavItem[];
}

// ─── Nav Data ─────────────────────────────────────────────────────────────────

const navGroups: NavGroup[] = [
  {
    label: "About Us",
    icon: "group",
    items: [
      { to: "/about",   label: "About Page",       icon: "info"           },
      { to: "/journey", label: "Our Journey",       icon: "timeline"       },
      { to: "/team",    label: "Our Team",          icon: "people"         },
      { to: "/stories", label: "Volunteer Stories", icon: "auto_stories"   },
      { to: "/notices", label: "Notices",           icon: "notifications"  },
    ],
  },
  {
    label: "Our Legacy",
    icon: "local_florist",
    items: [
      { to: "/batches",    label: "Batches",    icon: "school"      },
      { to: "/projects",   label: "Projects",   icon: "construction"},
      { to: "/camps",      label: "Camps",      icon: "forest"      },
      { to: "/highlights", label: "Highlights", icon: "star"        },
    ],
  },
  {
    label: "Media",
    icon: "photo_camera",
    items: [
      { to: "/gallery", label: "Gallery", icon: "photo_library" },
      { to: "/videos",  label: "Videos",  icon: "videocam"      },
      { to: "/reports", label: "Reports", icon: "description"   },
    ],
  },
];

/**
 * Bottom pill nav — the SOLE mobile navigation.
 * 5 items fit cleanly. No hamburger menu needed on mobile.
 */
const bottomNavItems = [
  { to: "/",       label: "Home",    icon: "home_app_logo"  },
  { to: "/gallery",label: "Gallery", icon: "photo_library"  },
  { to: "/camps",  label: "Camps",   icon: "forest"         },
  { to: "/about",  label: "About",   icon: "group"          },
  { to: "/contact",label: "Contact", icon: "mail"           },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled]             = useState(false);
  const dropdownRef                          = useRef<HTMLDivElement>(null);
  const location                             = useLocation();

  // ── Active-item visibility (hide empty sections) ──────────────────────────
  const [activeItems, setActiveItems] = useState<Record<string, boolean>>({
    "/reports":    true,
    "/videos":     true,
    "/stories":    true,
    "/projects":   true,
    "/camps":      true,
    "/journey":    true,
    "/notices":    true,
    "/team":       true,
    "/batches":    true,
    "/highlights": true,
    "/about":      true,
  });

  useEffect(() => {
    async function checkActive() {
      try {
        const [rep, vid, st, pr, ca, tl, no, tm, ba, hl] = await Promise.all([
          getReports(),
          getVideos(),
          getStories(),
          getProjects(),
          getCamps(),
          getTimeline(),
          getNotices(),
          getTeam(),
          getBatches(),
          getHighlights(),
        ]);
        setActiveItems({
          "/reports":    rep.length > 0,
          "/videos":     vid.length > 0,
          "/stories":    st.length  > 0,
          "/projects":   pr.length  > 0,
          "/camps":      ca.length  > 0,
          "/journey":    tl.length  > 0,
          "/notices":    no.length  > 0,
          "/team":       tm.length  > 0,
          "/batches":    ba.length  > 1,
          "/highlights": hl.length  > 0,
          "/about":      true,
        });
      } catch (err) {
        console.error("Error loading active nav items:", err);
      }
    }
    checkActive();
  }, []);

  // ── Auto-close dropdown on route change ───────────────────────────────────
  useEffect(() => {
    setActiveDropdown(null);
  }, [location.pathname]);

  // ── Close dropdown on outside click ──────────────────────────────────────
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Scroll shadow ─────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Derived data ─────────────────────────────────────────────────────────
  const filteredNavGroups = navGroups
    .map((g) => ({ ...g, items: g.items.filter((i) => activeItems[i.to] !== false) }))
    .filter((g) => g.items.length > 0);

  const filteredBottomNavItems = bottomNavItems.filter(
    (item) => activeItems[item.to] !== false
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          TOP HEADER  ·  z-50  ·  visible on ALL viewports
          On mobile this shows the brand logo only (no nav items).
          On desktop (xl+) it shows the full nav groups + Contact button.
      ══════════════════════════════════════════════════════════════════════ */}
      <header
        ref={dropdownRef}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#fbf9f4]/95 backdrop-blur-md shadow-sm"
            : "bg-[#fbf9f4]/85 backdrop-blur-sm"
        )}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">

          {/* Brand ────────────────────────────────────────────────────────── */}
          <Link
            to="/"
            className="flex items-center gap-2 focus-visible:rounded-lg"
            aria-label="NSS KHMHSS — Home"
          >
            <span className="flex h-10 w-10 md:h-11 md:w-11 items-center justify-center overflow-hidden rounded-lg bg-white/90 p-0.5 shadow-sm ring-1 ring-black/5">
              <NSSLogo height="100%" width="100%" decorative />
            </span>
            <span className="flex flex-col leading-none">
              <span
                className="text-sm font-bold tracking-tight"
                style={{ fontFamily: "'Libre Caslon Text', serif", color: "#042413" }}
              >
                NSS KHMHSS
              </span>
              <span
                className="text-[11px] font-medium tracking-wide"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "#424843" }}
              >
                Valakkulam
              </span>
            </span>
          </Link>

          {/* Desktop nav  ·  xl+ only ────────────────────────────────────── */}
          <nav
            className="hidden xl:flex items-center gap-1"
            role="navigation"
            aria-label="Main navigation"
          >
            {filteredNavGroups.map((group) => (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(group.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {/* Group trigger button */}
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-colors",
                    activeDropdown === group.label
                      ? "bg-[#1b3a27] text-white"
                      : "text-[#424843] hover:text-[#042413] hover:bg-[#f0eee9]"
                  )}
                  aria-expanded={activeDropdown === group.label}
                  aria-haspopup="true"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                    {group.icon}
                  </span>
                  {group.label}
                  <span
                    className="material-symbols-outlined transition-transform duration-200"
                    style={{
                      fontSize: "16px",
                      transform:
                        activeDropdown === group.label ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    expand_more
                  </span>
                </button>

                {/* Dropdown panel — z-[60] so it always floats above everything */}
                <AnimatePresence>
                  {activeDropdown === group.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute left-0 top-full mt-1 w-52 rounded-xl border overflow-hidden"
                      style={{
                        background: "#fbf9f4",
                        borderColor: "#c2c8c1",
                        boxShadow:
                          "8px 8px 22px rgba(27,58,39,0.10), -4px -4px 14px rgba(255,255,255,0.8)",
                        zIndex: 60,
                      }}
                    >
                      <div className="p-1.5">
                        {group.items.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className="flex items-center gap-2.5 w-full rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-[#f0eee9] hover:text-[#042413]"
                            style={{ fontFamily: "'DM Sans', sans-serif", color: "#424843" }}
                            activeProps={{
                              style: { color: "#042413", background: "#f0eee9", fontWeight: 600 },
                            }}
                          >
                            <span
                              className="material-symbols-outlined"
                              style={{ fontSize: "16px", color: "#727972" }}
                            >
                              {item.icon}
                            </span>
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Contact CTA */}
            <Link
              to="/contact"
              className="ml-2 px-5 py-2 rounded-full text-sm font-bold transition-opacity hover:opacity-90 active:scale-95"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: "#a04021",
                color: "#ffffff",
                letterSpacing: "0.05em",
              }}
              activeProps={{ style: { background: "#042413", color: "#ffffff" } }}
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE BOTTOM PILL NAV  ·  z-50  ·  mobile/tablet only (hidden xl+)

          This is the SOLE navigation element on mobile. No hamburger needed —
          the 5 primary routes cover all top-level destinations. This eliminates
          the "two nav bars" visual conflict entirely.

          will-change: transform  →  compositor layer for smooth 60fps sliding.
      ══════════════════════════════════════════════════════════════════════ */}
      <nav
        className="xl:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center px-2 py-1.5 rounded-full backdrop-blur-md"
        style={{
          background: "rgba(4, 36, 19, 0.92)",
          boxShadow: "0 8px 32px rgba(4,36,19,0.35), 0 2px 8px rgba(0,0,0,0.2)",
          width: "min(calc(100% - 32px), 380px)",
          justifyContent: "space-around",
          willChange: "transform",
        }}
        aria-label="Bottom navigation"
      >
        {filteredBottomNavItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-2xl transition-all duration-200"
            style={{ color: "rgba(255,255,255,0.5)" }}
            activeProps={{
              style: {
                background: "rgba(160,64,33,0.9)",
                color: "#ffffff",
              },
            }}
            aria-label={item.label}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "21px" }}>
              {item.icon}
            </span>
            <span
              style={{
                fontSize: "9px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                letterSpacing: "0.04em",
                lineHeight: 1,
              }}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </>
  );
}
