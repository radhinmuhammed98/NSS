import { Link, useLocation } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NavDropdownGroup, BottomPillNav } from "./NavParts";
import { getSiteSettingsSync } from "@/lib/content";
import { NavbarLogo, useHeroLogoProgress } from "./HeroLogoImpl";
import {
  getCamps,
  getHighlights,
  getNotices,
  getProjects,
  getReports,
  getStories,
  getTeam,
  getTimeline,
} from "@/lib/data";

// ─── Nav Data ─────────────────────────────────────────────────────────────────

const navGroups = [
  {
    label: "About Us",
    icon: "group",
    items: [
      { to: "/about",   label: "About Page",       icon: "info"          },
      { to: "/journey", label: "Our Journey",       icon: "timeline"      },
      { to: "/team",    label: "Our Team",          icon: "people"        },
      { to: "/stories", label: "Volunteer Stories", icon: "auto_stories"  },
      { to: "/notices", label: "Notices",           icon: "notifications" },
    ],
  },
  {
    label: "Our Legacy",
    icon: "local_florist",
    items: [
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
      { to: "/reports", label: "Reports", icon: "description"   },
    ],
  },
];

const bottomNavItems = [
  { to: "/",        label: "Home",    icon: "home_app_logo"  },
  { to: "/gallery", label: "Gallery", icon: "photo_library"  },
  { to: "/camps",   label: "Camps",   icon: "forest"         },
  { to: "/about",   label: "About",   icon: "group"          },
  { to: "/contact", label: "Contact", icon: "mail"           },
];

// ─── Navbar ───────────────────────────────────────────────────────────────────

export function Navbar() {
  const s = getSiteSettingsSync();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled]             = useState(false);
  const dropdownRef                          = useRef<HTMLDivElement>(null);
  const location                             = useLocation();
  const isHomePage                           = location.pathname === "/";

  // Shared-element logo progress (0 = hero visible, 1 = hero gone)
  const heroLogoProgress = useHeroLogoProgress(isHomePage);

  // Active-item visibility gates (hide links to empty sections)
  const [activeItems, setActiveItems] = useState<Record<string, boolean>>({
    "/reports":    true,
    "/stories":    true,
    "/projects":   true,
    "/camps":      true,
    "/journey":    true,
    "/notices":    true,
    "/team":       true,
    "/highlights": true,
    "/about":      true,
  });

  useEffect(() => {
    async function checkActive() {
      try {
        const [rep, st, pr, ca, tl, no, tm, hl] = await Promise.all([
          getReports(),
          getStories(),
          getProjects(),
          getCamps(),
          getTimeline(),
          getNotices(),
          getTeam(),
          getHighlights(),
        ]);
        setActiveItems({
          "/reports":    rep.length > 0,
          "/stories":    st.length  > 0,
          "/projects":   pr.length  > 0,
          "/camps":      ca.length  > 0,
          "/journey":    tl.length  > 0,
          "/notices":    no.length  > 0,
          "/team":       tm.length  > 0,
          "/highlights": hl.length  > 0,
          "/about":      true,
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

  // On homepage: navbar is transparent until scroll begins
  // Scrolled or non-homepage: solid background
  const navSolid = scrolled || !isHomePage;

  return (
    <>
      {/* ── Top Header ──────────────────────────────────────────────────────── */}
      <motion.header
        ref={dropdownRef as React.RefObject<HTMLElement>}
        className={cn("nss-navbar", scrolled && "nss-navbar-scrolled")}
        animate={{
          backgroundColor: navSolid
            ? "var(--background)"
            : "rgba(255,255,255,0)",
          boxShadow: scrolled
            ? "0 1px 0 rgba(27,58,39,0.07), 0 4px 16px rgba(27,58,39,0.06)"
            : "none",
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "4rem",
          display: "flex",
          alignItems: "center",
          zIndex: 50,
          backdropFilter: navSolid ? "blur(12px)" : "none",
          WebkitBackdropFilter: navSolid ? "blur(12px)" : "none",
        }}
      >
        <div className="nss-container nss-flex nss-items-center nss-justify-between" style={{ height: "100%" }}>

          {/* ── Brand ─────────────────────────────────────────────────────── */}
          <Link
            to="/"
            className="nss-flex nss-items-center"
            style={{ gap: "0.625rem", minWidth: 0 }}
          >
            {/* Shared-element logo — morphs from hero on scroll */}
            <NavbarLogo isHomePage={isHomePage} progress={heroLogoProgress} />

            {/* Unit name text — fades in as navbar becomes solid */}
            <motion.span
              className="nss-flex nss-flex-col nss-leading-none"
              style={{ minWidth: 0 }}
              animate={{ opacity: navSolid ? 1 : 0, x: navSolid ? 0 : -8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="nss-truncate nss-text-xs nss-font-extrabold nss-uppercase"
                style={{ fontFamily: "var(--font-sans)", color: "var(--primary)", fontSize: "13.5px", letterSpacing: "0.03em" }}
              >
                {s.unitName || "NSS Unit 466"}
              </span>
              <span
                className="nss-text-xs nss-font-semibold nss-mt-1"
                style={{ fontFamily: "var(--font-sans)", color: "var(--muted-foreground)", fontSize: "10px" }}
              >
                {s.schoolName || "KHMHSS Valakkulam"}
              </span>
            </motion.span>
          </Link>

          {/* ── Desktop nav groups · fade in with scroll ──────────────────── */}
          <motion.nav
            className="nss-xl-flex nss-items-center nss-gap-1 nss-xl-only"
            role="navigation"
            aria-label="Main navigation"
            animate={{ opacity: navSolid ? 1 : 0, y: navSolid ? 0 : -6 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {filteredNavGroups.map((group) => (
              <NavDropdownGroup
                key={group.label}
                group={group}
                isOpen={activeDropdown === group.label}
                onMouseEnter={() => setActiveDropdown(group.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              />
            ))}

            {/* Contact CTA */}
            <Link
              to="/contact"
              style={{ fontFamily: "var(--font-sans)", background: "var(--primary)", color: "#ffffff", padding: "0.5rem 1.25rem", borderRadius: "9999px", fontWeight: "bold" }}
              activeProps={{ style: { background: "var(--primary-container)", color: "#ffffff" } }}
            >
              Contact
            </Link>
          </motion.nav>
        </div>
      </motion.header>

      {/* ── Mobile Bottom Pill Nav ──────────────────────────────────────────── */}
      <BottomPillNav items={filteredBottomNavItems} />
    </>
  );
}
