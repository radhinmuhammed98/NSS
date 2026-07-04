import { Link } from "@tanstack/react-router";
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
        <span className="material-symbols-outlined" style={{ fontSize: "15px" }}>
          {group.icon}
        </span>
        {group.label}
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: "15px",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease"
          }}
        >
          expand_more
        </span>
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
          marginTop: "0.5rem",
          width: "13rem",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border)",
          overflow: "hidden",
          background: "var(--background)",
          boxShadow: "0 8px 30px rgba(4,36,19,0.12), 0 2px 8px rgba(4,36,19,0.06)",
          zIndex: 60,
          transformOrigin: "top left",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "scale(1) translateY(0)" : "scale(0.95) translateY(-8px)",
          pointerEvents: isOpen ? "auto" : "none"
        }}
      >
        <div style={{ padding: "0.375rem" }}>
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
              <span
                className="material-symbols-outlined nss-shrink-0"
                style={{ fontSize: "16px", color: "var(--muted-foreground)", opacity: 0.8 }}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── BottomPillNav ────────────────────────────────────────────────────────────

/**
 * Mobile fixed bottom pill navigation bar. (Vanilla CSS implementation)
 */
export function BottomPillNav({
  items,
}: {
  items: { to: string; label: string; icon: string }[];
}) {
  return (
    <nav
      className="nss-xl-hidden"
      style={{
        position: "fixed",
        bottom: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
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
        willChange: "transform",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      aria-label="Bottom navigation"
    >
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="nss-flex nss-flex-col nss-items-center nss-justify-center nss-gap-1"
          style={{
            color: "rgba(255,255,255,0.45)",
            minWidth: "52px",
            height: "2.75rem",
            flex: 1,
            textDecoration: "none",
            transition: "all 0.2s ease"
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
            className="material-symbols-outlined nss-leading-none"
            style={{ fontSize: "20px" }}
          >
            {item.icon}
          </span>
          <span
            style={{
              fontSize: "8.5px",
              fontFamily: "var(--font-sans)",
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
  );
}
