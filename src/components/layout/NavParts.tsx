import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import {
  Users,
  Info,
  History,
  UserCheck,
  BookOpen,
  Bell,
  Heart,
  School,
  Hammer,
  Tent,
  Star,
  Camera,
  Image,
  Video,
  FileText,
  Home,
  Mail,
  ChevronDown,
  HelpCircle,
  Flower,
} from "lucide-react";

export function getLucideIcon(name: string) {
  switch (name) {
    case "group": return Users;
    case "info": return Info;
    case "timeline": return History;
    case "people": return UserCheck;
    case "auto_stories": return BookOpen;
    case "notifications": return Bell;
    case "favorite": return Heart;
    case "local_florist": return Flower;
    case "school": return School;
    case "construction": return Hammer;
    case "forest": return Tent;
    case "star": return Star;
    case "photo_camera": return Camera;
    case "photo_library": return Image;
    case "videocam": return Video;
    case "description": return FileText;
    case "home_app_logo": return Home;
    case "mail": return Mail;
    case "expand_more": return ChevronDown;
    default: return HelpCircle;
  }
}

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

// ─── NavDropdownGroup ─────────────────────────────────────────────────────────

/**
 * A single desktop dropdown group (label + animated panel with links) (Vanilla CSS implementation)
 */
export function NavDropdownGroup({
  group,
  isOpen,
  onMouseEnter,
  onMouseLeave,
}: {
  group: NavGroup;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        type="button"
        onClick={() => isOpen ? onMouseLeave() : onMouseEnter()}
        className={cn(
          "nss-flex nss-items-center nss-gap-1 cursor-pointer select-none"
        )}
        style={{
          minHeight: "2.25rem",
          borderRadius: "9999px",
          padding: "0.5rem 0.875rem",
          fontSize: "14px",
          fontWeight: 500,
          fontFamily: "var(--font-sans)",
          backgroundColor: isOpen ? "var(--primary)" : "transparent",
          color: isOpen ? "#ffffff" : "var(--muted-foreground)",
          transition: "all 0.15s ease"
        }}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {(() => {
          const IconComp = getLucideIcon(group.icon);
          return <IconComp style={{ height: "0.9375rem", width: "0.9375rem" }} aria-hidden="true" />;
        })()}
        {group.label}
        {(() => {
          const ArrowComp = getLucideIcon("expand_more");
          return (
            <ArrowComp
              style={{
                height: "0.9375rem",
                width: "0.9375rem",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease"
              }}
              aria-hidden="true"
            />
          );
        })()}
      </button>

      {/* Dropdown panel */}
      <div
        className={cn(
          "transition-all duration-150"
        )}
        style={{
          position: "absolute",
          left: 0,
          top: "100%",
          paddingTop: "0.5rem",
          width: "13rem",
          zIndex: 60,
          transformOrigin: "top left",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "scale(1) translateY(0)" : "scale(0.95) translateY(-8px)",
          pointerEvents: isOpen ? "auto" : "none"
        }}
      >
        <div style={{
          background: "var(--background)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border)",
          boxShadow: "0 8px 30px rgba(4,36,19,0.12), 0 2px 8px rgba(4,36,19,0.06)",
          padding: "0.375rem",
          overflow: "hidden"
        }}>
          {group.items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="nss-flex nss-items-center"
              style={{
                width: "100%",
                borderRadius: "var(--radius-md)",
                padding: "0.625rem 0.75rem",
                fontSize: "14px",
                fontFamily: "var(--font-sans)",
                color: "var(--muted-foreground)",
                gap: "10px",
                transition: "background-color 0.15s ease, color 0.15s ease"
              }}
              activeProps={{
                style: {
                  color: "var(--primary)",
                  background: "var(--muted)",
                  fontWeight: 600,
                },
              }}
            >
              {(() => {
                const IconComp = getLucideIcon(item.icon);
                return <IconComp className="nss-shrink-0" style={{ height: "1rem", width: "1rem", color: "var(--muted-foreground)", opacity: 0.8 }} aria-hidden="true" />;
              })()}
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── BottomPillNav ────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import { useLocation } from "@tanstack/react-router";

/**
 * Mobile fixed bottom pill navigation bar. (Vanilla CSS implementation)
 * Features:
 * - Hides smoothly when scrolling down, shows when scrolling up.
 * - Sliding active background bubble indicator when switching tabs.
 */
export function BottomPillNav({
  items,
}: {
  items: { to: string; label: string; icon: string }[];
}) {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Match current path to one of the nav items
  const activeIndex = items.findIndex((item) => {
    if (item.to === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(item.to);
  });
  const hasActive = activeIndex !== -1;

  // Scroll visibility handling
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show near the top of the page
      if (currentScrollY < 60) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current + 10) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 10) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="nss-xl-hidden"
      style={{
        position: "fixed",
        bottom: "1rem",
        left: "50%",
        transform: isVisible ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(80px)",
        opacity: isVisible ? 1 : 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        padding: "0 0.5rem",
        borderRadius: "9999px",
        background: "rgba(4, 36, 19, 0.94)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 8px 32px rgba(4,36,19,0.4), 0 2px 8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
        width: "min(calc(100% - 24px), 360px)",
        height: "60px",
        justifyContent: "space-around",
        willChange: "transform, opacity",
        transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      aria-label="Bottom navigation"
    >
      {/* Sliding background indicator */}
      {hasActive && (
        <div
          style={{
            position: "absolute",
            top: "6px",
            bottom: "6px",
            width: `calc((100% - 16px) / ${items.length})`,
            left: `calc(8px + ${activeIndex} * (100% - 16px) / ${items.length})`,
            background: "rgba(160, 64, 33, 0.85)", // Warm Terracotta Stitch secondary
            borderRadius: "9999px",
            transition: "left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.3s ease",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      )}

      {items.map((item, idx) => {
        const isActive = idx === activeIndex;
        return (
          <Link
            key={item.to}
            to={item.to}
            className="nss-flex nss-flex-col nss-items-center nss-justify-center nss-gap-1"
            style={{
              color: isActive ? "#ffffff" : "rgba(255,255,255,0.62)",
              minWidth: "52px",
              height: "2.75rem",
              flex: 1,
              textDecoration: "none",
              transition: "color 0.25s ease",
              zIndex: 1,
              position: "relative",
            }}
            aria-label={item.label}
          >
            {(() => {
              const IconComp = getLucideIcon(item.icon);
              return <IconComp className="nss-leading-none" style={{ height: "1.25rem", width: "1.25rem" }} aria-hidden="true" />;
            })()}
            <span
              style={{
                fontSize: "8.5px",
                fontFamily: "var(--font-sans)",
                fontWeight: isActive ? 700 : 600,
                letterSpacing: "0",
                lineHeight: 1,
                transition: "font-weight 0.25s ease",
              }}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
