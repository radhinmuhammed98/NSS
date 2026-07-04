import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
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
 * A single desktop dropdown group (label + animated panel with links).
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
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        type="button"
        className={cn(
          "flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all duration-150",
          isOpen
            ? "bg-[#1b3a27] text-white"
            : "text-[#424843] hover:text-[#042413] hover:bg-[#f0eee9]"
        )}
        aria-expanded={isOpen}
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
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          expand_more
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-full mt-2 w-52 rounded-lg border overflow-hidden"
            style={{
              background: "#fbf9f4",
              borderColor: "#e4e2dd",
              boxShadow:
                "0 8px 30px rgba(4,36,19,0.12), 0 2px 8px rgba(4,36,19,0.06)",
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
                    style: {
                      color: "#042413",
                      background: "#f0eee9",
                      fontWeight: 600,
                    },
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
  );
}

// ─── BottomPillNav ────────────────────────────────────────────────────────────

/**
 * Mobile fixed bottom pill navigation bar.
 * Hidden on xl+ breakpoint.
 */
export function BottomPillNav({
  items,
}: {
  items: { to: string; label: string; icon: string }[];
}) {
  return (
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
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="relative flex flex-col items-center justify-center gap-0.5 h-11 rounded-lg transition-all duration-200"
          style={{ color: "rgba(255,255,255,0.45)", minWidth: "52px", flex: 1 }}
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
  );
}
