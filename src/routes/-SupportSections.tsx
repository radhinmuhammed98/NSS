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
            drives. Every act of involvement, big or small, fuels the spirit of{" "}
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
            Every act of support empowers one of these five pillars of NSS service at
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

export function SupportMethods() {
  return (
    <section style={{ background: "#f5f3ee" }}>
      <Container className="nss-py-16">
        <Reveal>
          <div className="nss-mb-8 nss-text-center" style={{ maxWidth: "36rem", margin: "0 auto 2.5rem auto" }}>
            <span
              className="nss-badge nss-badge-accent nss-mb-3"
            >
              Get Involved · പങ്കാളിത്തം
            </span>
            <h2
              className="nss-text-3xl nss-font-extrabold nss-text-balance nss-sm-text-4xl"
              style={{ fontFamily: "var(--font-display)", color: "var(--primary)" }}
            >
              Ways to support us
            </h2>
          </div>
        </Reveal>

        <div className="nss-grid nss-grid-cols-1 nss-gap-5 nss-sm-grid-cols-2 lg-grid-cols-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <Reveal>
            <DonateCard icon={Users} badge="Volunteer" title="Participate in Drives" iconBg="#042413">
              <p className="nss-text-sm nss-text-muted">
                Join us as an associate volunteer during public health camps, blood donations, and community outreach drives.
              </p>
              <p className="nss-mt-4 nss-text-xs nss-text-muted">
                No formal registration required—just your presence and willingness to serve.
              </p>
            </DonateCard>
          </Reveal>

          <Reveal delay={0.08}>
            <DonateCard icon={Leaf} badge="Contribution" title="Material & Saplings" iconBg="#1b3a27">
              <p className="nss-text-sm nss-text-muted">
                Donate plant saplings, organic seeds, books, or tools to support our environmental initiatives and camp libraries.
              </p>
              <p className="nss-mt-4 nss-text-xs nss-text-muted">
                Drop them off at the school NSS office during working hours.
              </p>
            </DonateCard>
          </Reveal>

          <Reveal delay={0.16}>
            <DonateCard icon={Heart} badge="Advocacy" title="Spread the Word" iconBg="#a04021">
              <p className="nss-text-sm nss-text-muted">
                Help us raise awareness about health, hygiene, and environmental preservation by sharing our reports and activities.
              </p>
              <p className="nss-mt-4 nss-text-xs nss-text-muted">
                Follow our official social links in the footer and stay connected.
              </p>
            </DonateCard>
          </Reveal>
        </div>
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
              Our Commitment to Community
            </h2>
            <p className="nss-mt-3 nss-text-sm nss-leading-relaxed nss-text-muted">
              All community service activities and programs of <strong>{s.unitName}</strong> at {s.schoolName}, Valakkulam are planned and executed with maximum responsibility. We ensure resources are directed fully toward student leadership development and community welfare.
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

// ─── SupportEnquiryCTA ───────────────────────────────────────────────────────

export function SupportEnquiryCTA({ s }: { s: SiteSettings }) {
  return (
    <section style={{ background: "var(--primary)" }}>
      <Container className="nss-py-12">
        <Reveal>
          <div className="nss-flex nss-flex-col nss-items-center nss-text-center nss-gap-5">
            <p
              className="nss-text-base nss-font-medium"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Have ideas or want to partner?
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
              Visit {s.schoolName} during school hours, or reach us by email to collaborate on community projects or share resources.
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
