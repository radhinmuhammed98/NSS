import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
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
      { to: "/about",   label: "About Page",       icon: "info"          },
      { to: "/journey", label: "Our Journey",       icon: "timeline"      },
      { to: "/team",    label: "Our Team",          icon: "people"        },
      { to: "/stories", label: "Volunteer Stories", icon: "auto_stories"  },
      { to: "/notices", label: "Notices",           icon: "notifications" },
      { to: "/support", label: "Support NSS",       icon: "favorite"      },
    ],
  },
  {
    label: "Our Legacy",
    icon: "local_florist",
    items: [
      { to: "/batches",    label: "Batches",    icon: "school"       },
      { to: "/projects",   label: "Projects",   icon: "construction" },
      { to: "/camps",      label: "Camps",      icon: "forest"       },
      { to: "/highlights", label: "Highlights", icon: "star"         },
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
 * Bottom pill nav — sole mobile navigation.
 * 5 primary destinations that cover the top-level user journeys.
 */
const bottomNavItems: { to: string; label: string; icon: string }[] = [
  { to: "/",        label: "Home",    icon: "home_app_logo"  },
  { to: "/gallery", label: "Gallery", icon: "photo_library"  },
  { to: "/camps",   label: "Camps",   icon: "forest"         },
  { to: "/about",   label: "About",   icon: "group"          },
  { to: "/contact", label: "Contact", icon: "mail"           },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled]             = useState(false);
  const dropdownRef                          = useRef<HTMLDivElement>(null);
  const location                             = useLocation();

  // Active-item visibility gates (hide links to empty sections)
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
    "/support":    true,
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
          "/support":    true, // always shown — page is always available
        });
      } catch (err) {
        console.error("Error loading active nav items:", err);
      }
    }
    checkActive();
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll shadow for top header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredNavGroups = navGroups
    .map((g) => ({ ...g, items: g.items.filter((i) => activeItems[i.to] !== false) }))
    .filter((g) => g.items.length > 0);

  const filteredBottomNavItems = bottomNavItems.filter(
    (item) => activeItems[item.to] !== false
  );

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          TOP HEADER · z-50 · visible on ALL viewports
          Mobile: brand logo + unit name only
          Desktop (xl+): full nav groups + Contact button
      ══════════════════════════════════════════════════════════════════════ */}
      <header
        ref={dropdownRef}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#fbf9f4]/97 backdrop-blur-lg shadow-[0_1px_0_0_rgba(194,200,193,0.6)]"
            : "bg-[#fbf9f4]/90 backdrop-blur-md"
        )}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">

          {/* ── Brand ──────────────────────────────────────────────────────── */}
          <Link
            to="/"
            className="flex items-center gap-2.5 focus-visible:rounded-lg min-w-0"
            aria-label="NSS KHMHSS — Home"
          >
            <span className="shrink-0 flex h-10 w-10 md:h-11 md:w-11 items-center justify-center overflow-hidden rounded-lg bg-white p-0.5 shadow-sm ring-1 ring-black/8">
              <img src="/khm logo.png" alt="KHMHSS Logo" className="h-full w-full object-contain" />
            </span>
            <span className="flex flex-col leading-tight min-w-0">
              <span
                className="truncate text-sm font-bold tracking-normal"
                style={{ fontFamily: "'Libre Caslon Text', serif", color: "#042413" }}
              >
                KHMHSS Valakkulam
              </span>
              <span
                className="text-[10.5px] font-medium  text-[#727972]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                NSS Unit 466
              </span>
            </span>
          </Link>

          {/* ── Desktop nav groups · xl+ only ──────────────────────────────── */}
          <nav
            className="hidden xl:flex items-center gap-0.5"
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
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all duration-150",
                    activeDropdown === group.label
                      ? "bg-[#1b3a27] text-white"
                      : "text-[#424843] hover:text-[#042413] hover:bg-[#f0eee9]"
                  )}
                  aria-expanded={activeDropdown === group.label}
                  aria-haspopup="true"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "15px" }}>
                    {group.icon}
                  </span>
                  {group.label}
                  <span
                    className="material-symbols-outlined transition-transform duration-200"
                    style={{
                      fontSize: "15px",
                      transform: activeDropdown === group.label ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    expand_more
                  </span>
                </button>

                {/* Dropdown panel · z-[60] — always above pill nav */}
                <AnimatePresence>
                  {activeDropdown === group.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-0 top-full mt-2 w-52 rounded-lg border overflow-hidden"
                      style={{
                        background: "#fbf9f4",
                        borderColor: "#e4e2dd",
                        boxShadow: "0 8px 30px rgba(4,36,19,0.12), 0 2px 8px rgba(4,36,19,0.06)",
                        zIndex: 60,
                      }}
                    >
                      <div className="p-1.5">
                        {group.items.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className="flex items-center gap-2.5 w-full rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-[#f0eee9] hover:text-[#042413]"
                            style={{ fontFamily: "'DM Sans', sans-serif", color: "#424843" }}
                            activeProps={{
                              style: { color: "#042413", background: "#f0eee9", fontWeight: 600 },
                            }}
                          >
                            <span
                              className="material-symbols-outlined shrink-0"
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

            {/* Support NSS prominent link */}
            <Link
              to="/support"
              className="ml-1 flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all duration-150 text-[#a04021] hover:bg-[#a04021]/8"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              activeProps={{ style: { background: "#a04021", color: "#ffffff" } }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "15px" }}>favorite</span>
              Support
            </Link>

            {/* Contact CTA */}
            <Link
              to="/contact"
              className="ml-2 px-5 py-2 rounded-full text-sm font-bold transition-all hover:opacity-90 active:scale-95"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: "#042413",
                color: "#ffffff",
                letterSpacing: "0",
              }}
              activeProps={{ style: { background: "#1b3a27", color: "#ffffff" } }}
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE BOTTOM PILL NAV · z-50 · hidden on xl+

          Redesigned for mobile-first:
          • Taller pill (h-14) with visible icon + label on each item
          • Smooth spring active-state background
          • Active item gets a warm terracotta fill
          • Labels are 9px — legible without cluttering
          • will-change: transform → own compositor layer for 60fps
          • padding-bottom accounts for iPhone home indicator via env()
      ══════════════════════════════════════════════════════════════════════ */}
      <nav
        className="xl:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center px-2 rounded-full"
        style={{
          background: "rgba(4, 36, 19, 0.94)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow:
            "0 8px 32px rgba(4,36,19,0.4), 0 2px 8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
          width: "min(calc(100% - 24px), 360px)",
          height: "60px",
          justifyContent: "space-around",
          willChange: "transform",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
        aria-label="Bottom navigation"
      >
        {filteredBottomNavItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="relative flex flex-col items-center justify-center gap-0.5 h-11 rounded-lg transition-all duration-200"
            style={{
              color: "rgba(255,255,255,0.45)",
              minWidth: "52px",
              flex: 1,
            }}
            activeProps={{
              style: {
                background: "rgba(160, 64, 33, 0.85)",
                color: "#ffffff",
                borderRadius: "8px",
              },
            }}
            aria-label={item.label}
          >
            <span
              className="material-symbols-outlined leading-none"
              style={{ fontSize: "20px" }}
            >
              {item.icon}
            </span>
            <span
              style={{
                fontSize: "8.5px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                letterSpacing: "0",
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
