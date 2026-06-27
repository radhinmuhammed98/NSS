import { Link } from "@tanstack/react-router";
import { getSiteSettingsSync } from "@/lib/content";
import { NSSLogo } from "@/assets/NSSLogo";

export function Footer() {
  const s = getSiteSettingsSync();

  return (
    <footer
      className="mt-20 px-6 pb-24 md:pb-8"
      aria-label="Site footer"
      style={{ background: "#f5f3ee" }}
    >
      {/* Decorative top border */}
      <div
        className="max-w-6xl mx-auto mb-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(160,64,33,0.35), transparent)",
        }}
        aria-hidden="true"
      />

      <div
        className="max-w-6xl mx-auto rounded-2xl p-8"
        style={{
          background: "#fbf9f4",
          boxShadow: "8px 8px 22px rgba(27, 58, 39, 0.10), -6px -6px 18px rgba(255,255,255,0.85)",
        }}
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand block */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-3 focus-visible:rounded-lg"
              aria-label="NSS Digital Legacy — Home"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 p-1 shadow-sm ring-1" style={{ "--tw-ring-color": "#c2c8c1" } as React.CSSProperties}>
                <NSSLogo height={40} width={40} decorative />
              </span>
              <div className="leading-tight">
                <p
                  className="text-base font-bold"
                  style={{ fontFamily: "'Libre Caslon Text', serif", color: "#042413" }}
                >
                  NSS Digital Legacy
                </p>
                <p
                  className="text-xs"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#424843" }}
                >
                  {s.unitName}
                </p>
              </div>
            </Link>

            <p
              className="mt-4 max-w-xs text-sm leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#424843" }}
            >
              A living archive of service, leadership, camps, projects, and memories.
              Every batch serves and leaves, but their journey stays forever.
            </p>

            <p
              className="mt-4 text-sm italic font-semibold"
              style={{ fontFamily: "'Libre Caslon Text', serif", color: "#1b3a27" }}
            >
              &ldquo;{s.motto}&rdquo;
            </p>

            {/* Decorative underline */}
            <div className="mt-4 w-16 h-1 rounded-full" style={{ background: "#a04021" }} />
          </div>

          {/* About Us column */}
          <FooterColumn
            title="About Us"
            icon="group"
            links={[
              { to: "/about", label: "About Page" },
              { to: "/journey", label: "Our Journey" },
              { to: "/team", label: "Our Team" },
              { to: "/stories", label: "Volunteer Stories" },
              { to: "/notices", label: "Notices" },
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
              className="mb-3 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#727972" }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>location_on</span>
              Reach Us
            </p>
            <ul
              className="space-y-2 text-sm"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#424843" }}
              role="list"
            >
              <li className="leading-tight font-medium" style={{ color: "#042413" }}>
                {s.schoolName}
              </li>
              <li className="leading-tight text-xs opacity-80">{s.location}</li>
              <li className="pt-1">
                <a
                  href={`mailto:${s.email}`}
                  className="break-all hover:underline transition-all"
                  style={{ color: "#a04021", textDecorationColor: "#a04021" }}
                >
                  {s.email}
                </a>
              </li>
              <li className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 font-semibold hover:underline"
                  style={{ color: "#042413" }}
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
          className="mt-8 pt-5 flex flex-col items-center gap-2 text-center text-xs sm:flex-row sm:justify-between"
          style={{
            borderTop: "1px solid #c2c8c1",
            fontFamily: "'DM Sans', sans-serif",
            color: "#727972",
          }}
        >
          <span>
            © {new Date().getFullYear()} Not Me, But You — {s.unitName}, {s.schoolName}.
          </span>
          <span className="flex items-center gap-1 opacity-60">
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
        className="mb-3 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5"
        style={{ fontFamily: "'DM Sans', sans-serif", color: "#727972" }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
          {icon}
        </span>
        {title}
      </p>
      <ul className="space-y-2 text-sm" role="list">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="transition-colors hover:underline"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#424843", textDecorationColor: "#a04021" }}
              activeProps={{ style: { color: "#042413", fontWeight: 600 } }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
