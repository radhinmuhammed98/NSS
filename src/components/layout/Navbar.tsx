import { Link, useLocation } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { NavDropdownGroup, BottomPillNav } from "./NavParts";
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

const bottomNavItems = [
  { to: "/",        label: "Home",    icon: "home_app_logo"  },
  { to: "/gallery", label: "Gallery", icon: "photo_library"  },
  { to: "/camps",   label: "Camps",   icon: "forest"         },
  { to: "/about",   label: "About",   icon: "group"          },
  { to: "/contact", label: "Contact", icon: "mail"           },
];

// ─── Navbar ───────────────────────────────────────────────────────────────────

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
          "/support":    true,
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
      {/* ── Top Header ──────────────────────────────────────────────────────── */}
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

          {/* ── Brand ─────────────────────────────────────────────────────── */}
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
                className="text-[10.5px] font-medium text-[#727972]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                NSS Unit 466
              </span>
            </span>
          </Link>

          {/* ── Desktop nav groups · xl+ only ───────────────────────────── */}
          <nav
            className="hidden xl:flex items-center gap-0.5"
            role="navigation"
            aria-label="Main navigation"
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
              style={{ fontFamily: "'DM Sans', sans-serif", background: "#042413", color: "#ffffff" }}
              activeProps={{ style: { background: "#1b3a27", color: "#ffffff" } }}
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Mobile Bottom Pill Nav ──────────────────────────────────────────── */}
      <BottomPillNav items={filteredBottomNavItems} />
    </>
  );
}
