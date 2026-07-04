import { Link } from "@tanstack/react-router";
import { getSiteSettingsSync } from "@/lib/content";
import { NSSLogo } from "@/assets/NSSLogo";

export function Footer() {
  const s = getSiteSettingsSync();

  return (
    <footer
      className="nss-mt-16 nss-px-3 nss-pb-28 nss-sm-py-8"
      aria-label="Site footer"
      style={{ background: "#f5f3ee", paddingLeft: "1rem", paddingRight: "1rem", paddingBottom: "7rem" }}
    >
      {/* Decorative top border */}
      <div
        style={{
          maxWidth: "77rem",
          margin: "0 auto 1.5rem auto",
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(160,64,33,0.35), transparent)",
        }}
        aria-hidden="true"
      />

      <div
        className="nss-mx-auto nss-container nss-card nss-p-6 nss-sm-p-8"
        style={{
          background: "#fbf9f4",
          boxShadow: "0 14px 34px rgba(27, 58, 39, 0.09), 0 1px 0 rgba(255,255,255,0.70)",
        }}
      >
        <div className="nss-grid nss-gap-6 nss-sm-grid-cols-2 nss-lg-grid-cols-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          {/* Brand block */}
          <div style={{ gridColumn: "span 1", minWidth: "260px" }}>
            <Link
              to="/"
              className="nss-flex nss-items-center nss-gap-3"
              aria-label="NSS Digital Legacy — Home"
            >
              <span className="nss-flex nss-items-center nss-justify-center" style={{ height: "3rem", width: "3rem", borderRadius: "var(--radius-lg)", backgroundColor: "#ffffff", padding: "4px", border: "1px solid var(--border)", boxShadow: "var(--card-shadow-sm)" }}>
                <NSSLogo height={40} width={40} decorative />
              </span>
              <div className="nss-leading-tight">
                <p
                  className="nss-text-base nss-font-bold"
                  style={{ fontFamily: "var(--font-display)", color: "var(--primary)" }}
                >
                  NSS Digital Legacy
                </p>
                <p
                  className="nss-text-xs"
                  style={{ fontFamily: "var(--font-sans)", color: "var(--muted-foreground)" }}
                >
                  {s.unitName}
                </p>
              </div>
            </Link>

            <p
              className="nss-mt-4 nss-text-sm nss-leading-relaxed"
              style={{ fontFamily: "var(--font-sans)", color: "var(--muted-foreground)", maxWidth: "20rem" }}
            >
              A living archive of service, leadership, camps, projects, and memories.
              Every batch serves and leaves, but their journey stays forever.
            </p>

            <p
              className="nss-mt-4 nss-text-sm nss-italic nss-font-semibold"
              style={{ fontFamily: "var(--font-display)", color: "var(--primary-container)" }}
            >
              &ldquo;{s.motto}&rdquo;
            </p>

            {/* Decorative underline */}
            <div className="nss-mt-4" style={{ width: "4rem", height: "4px", borderRadius: "9999px", background: "var(--secondary)" }} />
          </div>

          {/* About Us column */}
          <FooterColumn
            title="About Us"
            icon="group"
            links={[
              { to: "/about",   label: "About Page"       },
              { to: "/journey", label: "Our Journey"       },
              { to: "/team",    label: "Our Team"          },
              { to: "/stories", label: "Volunteer Stories" },
              { to: "/notices", label: "Notices"           },
              { to: "/support", label: "Support NSS"       },
            ]}
          />

          {/* Legacy column */}
          <FooterColumn
            title="Our Legacy"
            icon="local_florist"
            links={[
              { to: "/batches", label: "Batches" },
              { to: "/projects", label: "Projects" },
              { to: "/camps", label: "Camps" },
              { to: "/highlights", label: "Highlights" },
            ]}
          />

          {/* Contact column */}
          <div>
            <p
              className="nss-mb-3 nss-text-xs nss-font-bold nss-uppercase nss-flex nss-items-center"
              style={{ fontFamily: "var(--font-sans)", color: "var(--muted-foreground)", gap: "6px" }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>location_on</span>
              Reach Us
            </p>
            <ul
              style={{ fontFamily: "var(--font-sans)", color: "var(--muted-foreground)", listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}
              role="list"
            >
              <li className="nss-leading-tight nss-font-medium" style={{ color: "var(--primary)" }}>
                {s.schoolName}
              </li>
              <li className="nss-leading-tight nss-text-xs" style={{ opacity: 0.8 }}>{s.location}</li>
              <li style={{ paddingTop: "0.25rem" }}>
                <a
                  href={`mailto:${s.email}`}
                  style={{ color: "var(--secondary)", textDecoration: "underline" }}
                >
                  {s.email}
                </a>
              </li>
              <li style={{ paddingTop: "0.5rem" }}>
                <Link
                  to="/contact"
                  className="nss-flex nss-items-center nss-font-semibold"
                  style={{ color: "var(--primary)", gap: "4px" }}
                >
                  Contact Page
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_forward</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="nss-mt-8 nss-flex nss-flex-col nss-items-center nss-sm-flex-row nss-justify-between"
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "1.25rem",
            fontFamily: "var(--font-sans)",
            color: "var(--muted-foreground)",
            fontSize: "12px",
            gap: "0.5rem"
          }}
        >
          <span>
            © {new Date().getFullYear()} Not Me, But You — {s.unitName}, {s.schoolName}.
          </span>
          <span className="nss-flex nss-items-center nss-gap-1" style={{ opacity: 0.6 }}>
            <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>favorite</span>
            Built as a permanent digital legacy.
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  icon,
  links,
}: {
  title: string;
  icon: string;
  links: { to: string; label: string }[];
}) {
  return (
    <div>
      <p
        className="nss-mb-3 nss-text-xs nss-font-bold nss-uppercase nss-flex nss-items-center"
        style={{ fontFamily: "var(--font-sans)", color: "var(--muted-foreground)", gap: "6px" }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
          {icon}
        </span>
        {title}
      </p>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }} role="list">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              style={{ fontFamily: "var(--font-sans)", color: "var(--muted-foreground)" }}
              activeProps={{ style: { color: "var(--primary)", fontWeight: 600 } }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
