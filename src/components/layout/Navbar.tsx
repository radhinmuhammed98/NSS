import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { NSSLogo } from "@/assets/NSSLogo";
import { cn } from "@/lib/utils";

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

const navGroups: NavGroup[] = [
  {
    label: "About Us",
    icon: "group",
    items: [
      { to: "/about", label: "About Page", icon: "info" },
      { to: "/journey", label: "Our Journey", icon: "timeline" },
      { to: "/team", label: "Our Team", icon: "people" },
      { to: "/stories", label: "Volunteer Stories", icon: "auto_stories" },
      { to: "/notices", label: "Notices", icon: "notifications" },
    ],
  },
  {
    label: "Our Legacy",
    icon: "local_florist",
    items: [
      { to: "/batches", label: "Batches", icon: "school" },
      { to: "/projects", label: "Projects", icon: "construction" },
      { to: "/camps", label: "Camps", icon: "forest" },
      { to: "/highlights", label: "Highlights", icon: "star" },
    ],
  },
  {
    label: "Media",
    icon: "photo_camera",
    items: [
      { to: "/gallery", label: "Gallery", icon: "photo_library" },
      { to: "/videos", label: "Videos", icon: "videocam" },
      { to: "/reports", label: "Reports", icon: "description" },
    ],
  },
];

// Bottom nav items for mobile
const bottomNavItems = [
  { to: "/", label: "Home", icon: "home_app_logo" },
  { to: "/gallery", label: "Gallery", icon: "photo_library" },
  { to: "/camps", label: "Camps", icon: "forest" },
  { to: "/about", label: "About", icon: "group" },
  { to: "/contact", label: "Contact", icon: "mail" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ─── Top header ─────────────────────────────────────────────────── */}
      <header
        ref={dropdownRef}
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          scrolled
            ? "bg-[#fbf9f4]/90 backdrop-blur-md shadow-sm"
            : "bg-[#fbf9f4]/80 backdrop-blur-md"
        )}
      >
        <div className="mx-auto max-w-7xl flex justify-between items-center px-6 md:px-10 h-16">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 focus-visible:rounded-lg"
          onClick={() => { setOpen(false); setActiveDropdown(null); }}
          aria-label="NSS KHMHSS — Home"
        >
          <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-white/90 p-0.5 shadow-sm">
            <NSSLogo height={34} width={34} decorative />
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

        {/* Desktop nav groups */}
        <nav className="hidden xl:flex items-center gap-1" role="navigation" aria-label="Main navigation">
          {navGroups.map((group) => (
            <div
              key={group.label}
              className="relative"
              onMouseEnter={() => setActiveDropdown(group.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
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
                    transform: activeDropdown === group.label ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  expand_more
                </span>
              </button>

              <AnimatePresence>
                {activeDropdown === group.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute left-0 top-full mt-1 w-52 rounded-xl border shadow-lg overflow-hidden"
                    style={{
                      background: "#fbf9f4",
                      borderColor: "#c2c8c1",
                      boxShadow: "8px 8px 22px rgba(27, 58, 39, 0.10), -4px -4px 14px rgba(255,255,255,0.8)",
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
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: "16px", color: "#727972" }}>
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

          <Link
            to="/contact"
            className="ml-2 px-5 py-2 rounded-full text-sm font-bold transition-all"
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

        {/* Mobile hamburger */}
        <button
          type="button"
          id="mobile-menu-toggle"
          onClick={() => setOpen((v) => !v)}
          className="xl:hidden flex h-10 w-10 items-center justify-center rounded-full transition-colors"
          style={{ background: open ? "#1b3a27" : "#f0eee9", color: open ? "#ffffff" : "#042413" }}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>
            {open ? "close" : "menu"}
          </span>
        </button>
        </div>
      </header>

      {/* ─── Mobile full-screen menu ─────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="menu"
            aria-labelledby="mobile-menu-toggle"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-16 z-40 mx-4 rounded-2xl overflow-hidden"
            style={{
              background: "#fbf9f4",
              border: "1px solid #c2c8c1",
              boxShadow: "8px 8px 32px rgba(27, 58, 39, 0.15)",
            }}
          >
            <div className="p-4 flex flex-col gap-1">
              {navGroups.map((group) => (
                <div key={group.label} className="flex flex-col border-b last:border-0" style={{ borderColor: "#e4e2dd" }}>
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpandedGroup((prev) => (prev === group.label ? null : group.label))
                    }
                    className="flex items-center justify-between px-3 py-3 rounded-xl transition-colors"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "#042413", fontWeight: 700, fontSize: "15px" }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined" style={{ fontSize: "18px", color: "#727972" }}>
                        {group.icon}
                      </span>
                      {group.label}
                    </span>
                    <span
                      className="material-symbols-outlined transition-transform duration-200"
                      style={{
                        fontSize: "18px",
                        color: "#727972",
                        transform: mobileExpandedGroup === group.label ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      expand_more
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileExpandedGroup === group.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-4 pb-2"
                      >
                        {group.items.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            role="menuitem"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-colors"
                            style={{ fontFamily: "'DM Sans', sans-serif", color: "#424843" }}
                            activeProps={{ style: { color: "#042413", background: "#f0eee9", fontWeight: 600 } }}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: "16px", color: "#a04021" }}>
                              {item.icon}
                            </span>
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <Link
                to="/contact"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-bold"
                style={{ background: "#a04021", color: "#ffffff", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em" }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>mail</span>
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Mobile bottom floating nav ──────────────────────────────────── */}
      <nav
        className="xl:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-3 py-2 rounded-full"
        style={{
          background: "#042413",
          boxShadow: "0 8px 32px rgba(4, 36, 19, 0.35)",
          width: "calc(100% - 48px)",
          maxWidth: "400px",
          justifyContent: "space-around",
        }}
        aria-label="Bottom navigation"
      >
        {bottomNavItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200"
            style={{ color: "rgba(255,255,255,0.6)" }}
            activeProps={{
              style: {
                background: "#a04021",
                color: "#ffffff",
                transform: "scale(1.1)",
              },
            }}
            aria-label={item.label}
            onClick={() => setOpen(false)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>
              {item.icon}
            </span>
          </Link>
        ))}
      </nav>
    </>
  );
}
