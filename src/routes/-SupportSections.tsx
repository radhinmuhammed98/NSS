/**
 * SupportSections — extracted section components for the Support/Donate page (Vanilla CSS implementation)
 */

import { Link } from "@tanstack/react-router";
import {
  Heart,
  Landmark,
  QrCode,
  Phone,
  Shield,
  ArrowRight,
  Droplets,
  Tent,
  Users,
  Leaf,
  Baby,
} from "lucide-react";
import { Container } from "@/components/layout";
import { ClayCard, Badge, Reveal, ActivityCard } from "@/components/clay";
import { DonateCard } from "@/components/clay/DonateCard";
import type { SiteSettings } from "@/types";

// ─── Static Data ──────────────────────────────────────────────────────────────

const causes = [
  {
    icon: Droplets,
    title: "Blood Donation Awareness",
    subtitle: "ജീവനായ് രക്തദാനം",
    description:
      "Organising blood donation camps and awareness drives that have saved countless lives across the community.",
    accentColor: "#a04021",
  },
  {
    icon: Tent,
    title: "Special Camps",
    subtitle: "സഹവാസ ക്യാമ്പുകൾ",
    description:
      "Seven-day residential NSS special camps that build leadership, discipline, and community bonds.",
    accentColor: "#1b3a27",
  },
  {
    icon: Users,
    title: "Community Service",
    subtitle: "കൈത്താങ്ങും കാരുണ്യവും",
    description:
      "Palliative care visits, housing drives, and reaching the unreached in our local community.",
    accentColor: "#042413",
  },
  {
    icon: Leaf,
    title: "Environmental Activities",
    subtitle: "ഹരിത സംരക്ഷണം",
    description:
      "Tree plantations, Haritha Bhavanam, plastic-free campaigns, and river clean-up drives.",
    accentColor: "#1b3a27",
  },
  {
    icon: Baby,
    title: "Children's Welfare",
    subtitle: "കുരുന്നുകൾക്ക് സ്നേഹസ്പർശം",
    description:
      "Educational support, awareness sessions, and welfare activities for underprivileged children.",
    accentColor: "#a04021",
  },
];

// ─── SupportHero ──────────────────────────────────────────────────────────────

export function SupportHero() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(160deg, #042413 0%, #1b3a27 60%, #2d5a3d 100%)",
      }}
    >
      {/* Subtle texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <Container className="nss-py-16 nss-sm-py-20" style={{ position: "relative" }}>
        <div style={{ maxWidth: "42rem" }}>
          <span
            className="nss-flex nss-items-center nss-gap-2"
            style={{
              display: "inline-flex",
              borderRadius: "9999px",
              padding: "0.375rem 1rem",
              fontSize: "12px",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
              background: "rgba(160,64,33,0.25)",
              color: "#ff9e7a",
              border: "1px solid rgba(160,64,33,0.4)",
            }}
          >
            <Heart style={{ height: "0.875rem", width: "0.875rem" }} aria-hidden />
            Support · പിന്തുണ
          </span>

          <h1
            className="nss-text-4xl nss-font-extrabold nss-leading-tight nss-text-white nss-sm-text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Support NSS
          </h1>

          <p
            className="nss-mt-2 nss-text-2xl nss-font-bold nss-sm-text-3xl"
            style={{ fontFamily: "'Noto Sans Malayalam', sans-serif", color: "rgba(255,255,255,0.7)" }}
          >
            നന്മയ്ക്കായി കൈകോർക്കാം
          </p>

          <p
            className="nss-mt-4 nss-text-sm nss-leading-relaxed"
            style={{ color: "rgba(255,255,255,0.75)", maxWidth: "32rem" }}
          >
            Your support empowers NSS volunteers of KHMHSS Valakkulam to conduct
            community service activities — from blood donation camps to environmental
            drives. Every contribution, big or small, fuels the spirit of{" "}
            <span className="nss-font-semibold nss-italic" style={{ color: "rgba(255,255,255,0.9)" }}>"Not Me, But You."</span>
          </p>

          <div
            className="nss-mt-6"
            style={{ borderLeft: "2px solid var(--accent)", paddingLeft: "1rem" }}
          >
            <p
              className="nss-text-base nss-font-semibold nss-italic"
              style={{ fontFamily: "var(--font-display)", color: "rgba(255,255,255,0.9)" }}
            >
              "Not Me, But You"
            </p>
            <p
              className="nss-text-sm"
              style={{ fontFamily: "'Noto Sans Malayalam', sans-serif", color: "rgba(255,255,255,0.6)" }}
            >
              മനസ്സ് നന്നാവട്ടെ
            </p>
          </div>
        </div>
      </Container>

      {/* Bottom wave */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} aria-hidden="true">
        <svg
          viewBox="0 0 1440 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", display: "block" }}
        >
          <path d="M0 40L1440 40L1440 10C1200 35 720 -5 0 20L0 40Z" fill="var(--background)" />
        </svg>
      </div>
    </section>
  );
}

// ─── CausesGrid ───────────────────────────────────────────────────────────────

export function CausesGrid() {
  return (
    <Container className="nss-py-16">
      <Reveal>
        <div className="nss-mb-8 nss-text-center" style={{ maxWidth: "36rem", margin: "0 auto 2.5rem auto" }}>
          <span
            className="nss-badge nss-badge-default nss-mb-3"
            style={{ background: "#1b3a27", color: "#c7ebd0" }}
          >
            Why Support Us
          </span>
          <h2
            className="nss-text-3xl nss-font-extrabold nss-text-balance nss-sm-text-4xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--primary)" }}
          >
            Where your support goes
          </h2>
          <p className="nss-mt-3 nss-text-sm nss-text-muted nss-leading-relaxed">
            Every rupee supports one of these five pillars of NSS service at
            KHMHSS Valakkulam.
          </p>
        </div>
      </Reveal>

      <div className="nss-grid nss-grid-cols-1 nss-gap-5 nss-sm-grid-cols-2 lg-grid-cols-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        {causes.map((cause, i) => (
          <Reveal key={cause.title} delay={i * 0.07}>
            <ActivityCard
              icon={cause.icon}
              title={cause.title}
              subtitle={cause.subtitle}
              description={cause.description}
              accentColor={cause.accentColor}
            />
          </Reveal>
        ))}
      </div>
    </Container>
  );
}

// ─── DonationMethods ──────────────────────────────────────────────────────────

type BankDetails = {
  name: string;
  account: string;
  ifsc: string;
  bank: string;
  branch: string;
};

export function DonationMethods({
  upiId,
  bankAccount,
  qrImageUrl,
}: {
  upiId: string | null;
  bankAccount: BankDetails | null;
  qrImageUrl: string | null;
}) {
  const hasDonationDetails = upiId || bankAccount || qrImageUrl;

  return (
    <section style={{ background: "#f5f3ee" }}>
      <Container className="nss-py-16">
        <Reveal>
          <div className="nss-mb-8 nss-text-center" style={{ maxWidth: "36rem", margin: "0 auto 2.5rem auto" }}>
            <span
              className="nss-badge nss-badge-accent nss-mb-3"
            >
              Donate · സംഭാവന
            </span>
            <h2
              className="nss-text-3xl nss-font-extrabold nss-text-balance nss-sm-text-4xl"
              style={{ fontFamily: "var(--font-display)", color: "var(--primary)" }}
            >
              How to contribute
            </h2>
          </div>
        </Reveal>

        {hasDonationDetails ? (
          <div className="nss-grid nss-grid-cols-1 nss-gap-5 nss-sm-grid-cols-2 lg-grid-cols-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {upiId && (
              <Reveal>
                <DonateCard icon={Phone} badge="UPI" title="Pay via UPI" iconBg="#042413">
                  <p className="nss-text-sm nss-text-muted">
                    Send directly to our registered UPI ID:
                  </p>
                  <p
                    className="nss-mt-3 nss-text-base nss-font-bold nss-break-all"
                    style={{ background: "var(--muted)", color: "var(--primary)", padding: "0.75rem 1rem", borderRadius: "var(--radius-lg)", fontFamily: "monospace", userSelect: "all" }}
                  >
                    {upiId}
                  </p>
                </DonateCard>
              </Reveal>
            )}

            {bankAccount && (
              <Reveal delay={0.08}>
                <DonateCard icon={Landmark} badge="Bank Transfer" title="Bank Account" iconBg="#1b3a27">
                  <ul className="nss-mt-1 nss-flex nss-flex-col nss-gap-2 nss-text-sm" style={{ listStyle: "none" }}>
                    {(
                      [
                        ["Account Name", bankAccount.name],
                        ["Account No.", bankAccount.account],
                        ["IFSC Code",   bankAccount.ifsc],
                        ["Bank",        bankAccount.bank],
                        ["Branch",      bankAccount.branch],
                      ] as [string, string][]
                    ).map(([label, value]) => (
                      <li key={label} className="nss-flex nss-flex-col">
                        <span className="nss-text-xs nss-text-muted">{label}</span>
                        <span className="nss-font-semibold" style={{ fontFamily: "monospace" }}>{value}</span>
                      </li>
                    ))}
                  </ul>
                </DonateCard>
              </Reveal>
            )}

            {qrImageUrl && (
              <Reveal delay={0.16}>
                <DonateCard
                  icon={QrCode}
                  badge="QR Code"
                  title="Scan to Pay"
                  iconBg="#a04021"
                  className="nss-items-center nss-text-center"
                >
                  <p className="nss-text-sm nss-text-muted">Scan with any UPI app</p>
                  <img
                    src={qrImageUrl}
                    alt="NSS donation QR code"
                    style={{ background: "#ffffff", padding: "8px", height: "12rem", width: "12rem", borderRadius: "var(--radius-lg)", objectFit: "contain", margin: "1rem auto 0 auto" }}
                  />
                </DonateCard>
              </Reveal>
            )}
          </div>
        ) : (
          /* Graceful empty state — no dummy data ever shown */
          <Reveal>
            <div className="nss-mx-auto nss-flex nss-flex-col nss-items-center nss-gap-4 nss-p-6 nss-text-center nss-sm-p-8" style={{ maxWidth: "32rem", borderRadius: "var(--radius-lg)", border: "1px solid rgba(194, 200, 193, 0.4)", backgroundColor: "var(--surface)" }}>
              <span
                className="nss-flex nss-items-center nss-justify-center"
                style={{ background: "#1b3a27", height: "3.5rem", width: "3.5rem", borderRadius: "var(--radius-lg)" }}
              >
                <Heart style={{ height: "1.5rem", width: "1.5rem", color: "#ffffff" }} aria-hidden />
              </span>
              <h3
                className="nss-text-xl nss-font-bold"
                style={{ fontFamily: "var(--font-display)", color: "var(--primary)" }}
              >
                Coming Soon
              </h3>
              <p className="nss-text-sm nss-text-muted nss-leading-relaxed">
                Official donation details will be updated soon. Please contact
                the school office to make a contribution directly.
              </p>
              <p
                className="nss-text-sm nss-font-semibold nss-italic"
                style={{
                  fontFamily: "'Noto Sans Malayalam', sans-serif",
                  color: "var(--muted-foreground)",
                }}
              >
                സഹായ വിവരങ്ങൾ ഉടൻ ലഭ്യമാകും
              </p>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}

// ─── TransparencyBlock ────────────────────────────────────────────────────────

export function TransparencyBlock({ s }: { s: SiteSettings }) {
  return (
    <Container className="nss-py-16">
      <Reveal>
        <div className="nss-flex nss-flex-col nss-items-start nss-gap-5 nss-p-5 nss-sm-flex-row nss-sm-p-6 nss-card tilt-false">
          <span
            className="nss-shrink-0 nss-flex nss-items-center nss-justify-center"
            style={{ background: "var(--primary)", height: "3.5rem", width: "3.5rem", borderRadius: "var(--radius-lg)" }}
          >
            <Shield style={{ height: "1.5rem", width: "1.5rem", color: "#ffffff" }} aria-hidden />
          </span>
          <div>
            <h2
              className="nss-text-2xl nss-font-extrabold"
              style={{ fontFamily: "var(--font-display)", color: "var(--primary)" }}
            >
              Our Commitment to Transparency
            </h2>
            <p className="nss-mt-3 nss-text-sm nss-leading-relaxed nss-text-muted">
              All contributions received are intended <strong>exclusively</strong>{" "}
              for the NSS activities of <strong>{s.unitName}</strong>,{" "}
              {s.schoolName}, Valakkulam. Funds are used for camp expenses,
              community service materials, awareness programmes, and student
              welfare activities under the supervision of the Programme Officer.
            </p>
            <p
              className="nss-mt-4 nss-text-sm nss-font-semibold nss-italic"
              style={{ fontFamily: "'Noto Sans Malayalam', sans-serif", color: "var(--primary-container)" }}
            >
              "സ്വച്ഛഭാരതം — ഒരു ജനതയുടെ സ്വപ്‌നം"
            </p>
          </div>
        </div>
      </Reveal>
    </Container>
  );
}

// ─── DonationEnquiryCTA ───────────────────────────────────────────────────────

export function DonationEnquiryCTA({ s }: { s: SiteSettings }) {
  return (
    <section style={{ background: "var(--primary)" }}>
      <Container className="nss-py-12">
        <Reveal>
          <div className="nss-flex nss-flex-col nss-items-center nss-text-center nss-gap-5">
            <p
              className="nss-text-base nss-font-medium"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              For donation enquiries
            </p>
            <h2
              className="nss-text-2xl nss-font-extrabold nss-text-white nss-sm-text-3xl nss-text-balance"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Please contact the school office
            </h2>
            <p
              className="nss-text-sm nss-leading-relaxed"
              style={{ color: "rgba(255,255,255,0.65)", maxWidth: "28rem" }}
            >
              Visit {s.schoolName} during school hours, or reach us by email for
              any donation-related questions or to arrange a direct contribution.
            </p>

            <div className="nss-flex nss-flex-col sm-flex-row nss-gap-3 nss-mt-2" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
              <a
                href={`mailto:${s.email}`}
                className="nss-flex nss-items-center nss-gap-2"
                style={{
                  background: "var(--secondary)",
                  color: "#ffffff",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "9999px",
                  fontWeight: "bold",
                  fontSize: "14px"
                }}
              >
                Email us · {s.email}
                <ArrowRight style={{ height: "1rem", width: "1rem" }} aria-hidden />
              </a>
              <Link
                to="/contact"
                className="nss-flex nss-items-center nss-gap-2"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.2)",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "9999px",
                  fontWeight: "bold",
                  fontSize: "14px"
                }}
              >
                Contact page
                <ArrowRight style={{ height: "1rem", width: "1rem" }} aria-hidden />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
