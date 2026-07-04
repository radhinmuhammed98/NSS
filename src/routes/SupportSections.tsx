/**
 * SupportSections — extracted section components for the Support/Donate page.
 *
 * Sections:
 *  SupportHero          — dark gradient hero with Malayalam subtitle
 *  CausesGrid           — "Why Support Us" cause cards grid
 *  DonationMethods      — UPI / Bank / QR cards, or Coming Soon state
 *  TransparencyBlock    — "Our Commitment to Transparency" panel
 *  DonationEnquiryCTA   — Dark footer CTA with email + contact page links
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
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #042413 0%, #1b3a27 60%, #2d5a3d 100%)",
      }}
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <Container className="relative py-20 sm:py-28">
        <div className="max-w-2xl">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase mb-6"
            style={{
              background: "rgba(160,64,33,0.25)",
              color: "#ff9e7a",
              border: "1px solid rgba(160,64,33,0.4)",
            }}
          >
            <Heart className="h-3.5 w-3.5" aria-hidden />
            Support · പിന്തുണ
          </span>

          <h1
            className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl text-balance"
            style={{ fontFamily: "'Libre Caslon Text', serif" }}
          >
            Support NSS
          </h1>

          <p
            className="mt-3 text-2xl font-bold text-white/70 sm:text-3xl"
            style={{ fontFamily: "'Noto Sans Malayalam', sans-serif" }}
          >
            നന്മയ്ക്കായി കൈകോർക്കാം
          </p>

          <p
            className="mt-6 max-w-lg text-base leading-relaxed"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Your support empowers NSS volunteers of KHMHSS Valakkulam to conduct
            community service activities — from blood donation camps to environmental
            drives. Every contribution, big or small, fuels the spirit of{" "}
            <span className="font-semibold text-white/90 italic">"Not Me, But You."</span>
          </p>

          <div
            className="mt-8 inline-flex flex-col gap-1 border-l-2 pl-4"
            style={{ borderColor: "#a04021" }}
          >
            <p
              className="text-base font-semibold italic text-white/90"
              style={{ fontFamily: "'Libre Caslon Text', serif" }}
            >
              "Not Me, But You"
            </p>
            <p
              className="text-sm text-white/60"
              style={{ fontFamily: "'Noto Sans Malayalam', sans-serif" }}
            >
              മനസ്സ് നന്നാവട്ടെ
            </p>
          </div>
        </div>
      </Container>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path d="M0 40L1440 40L1440 10C1200 35 720 -5 0 20L0 40Z" fill="#fbf9f4" />
        </svg>
      </div>
    </section>
  );
}

// ─── CausesGrid ───────────────────────────────────────────────────────────────

export function CausesGrid() {
  return (
    <Container className="py-16">
      <Reveal>
        <div className="mb-10 text-center max-w-xl mx-auto">
          <span
            className="inline-block mb-3 rounded-md px-3 py-1 text-xs font-bold uppercase"
            style={{ background: "#1b3a27", color: "#c7ebd0" }}
          >
            Why Support Us
          </span>
          <h2
            className="text-3xl font-extrabold text-balance sm:text-4xl"
            style={{ fontFamily: "'Libre Caslon Text', serif", color: "#042413" }}
          >
            Where your support goes
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
            Every rupee supports one of these five pillars of NSS service at
            KHMHSS Valakkulam.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
      <Container className="py-16">
        <Reveal>
          <div className="mb-10 text-center max-w-xl mx-auto">
            <span
              className="inline-block mb-3 rounded-md px-3 py-1 text-xs font-bold uppercase"
              style={{ background: "#a04021", color: "#ffffff" }}
            >
              Donate · സംഭാവന
            </span>
            <h2
              className="text-3xl font-extrabold text-balance sm:text-4xl"
              style={{ fontFamily: "'Libre Caslon Text', serif", color: "#042413" }}
            >
              How to contribute
            </h2>
          </div>
        </Reveal>

        {hasDonationDetails ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {upiId && (
              <Reveal>
                <DonateCard icon={Phone} badge="UPI" title="Pay via UPI" iconBg="#042413">
                  <p className="text-sm text-muted-foreground">
                    Send directly to our registered UPI ID:
                  </p>
                  <p
                    className="mt-3 select-all rounded-lg px-4 py-3 font-mono text-base font-bold break-all"
                    style={{ background: "#f0eee9", color: "#042413" }}
                  >
                    {upiId}
                  </p>
                </DonateCard>
              </Reveal>
            )}

            {bankAccount && (
              <Reveal delay={0.08}>
                <DonateCard icon={Landmark} badge="Bank Transfer" title="Bank Account" iconBg="#1b3a27">
                  <ul className="mt-1 space-y-2 text-sm">
                    {(
                      [
                        ["Account Name", bankAccount.name],
                        ["Account No.", bankAccount.account],
                        ["IFSC Code",   bankAccount.ifsc],
                        ["Bank",        bankAccount.bank],
                        ["Branch",      bankAccount.branch],
                      ] as [string, string][]
                    ).map(([label, value]) => (
                      <li key={label} className="flex flex-col">
                        <span className="text-xs text-muted-foreground">{label}</span>
                        <span className="font-semibold text-foreground font-mono">{value}</span>
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
                  className="items-center text-center"
                >
                  <p className="text-sm text-muted-foreground">Scan with any UPI app</p>
                  <img
                    src={qrImageUrl}
                    alt="NSS donation QR code"
                    className="mx-auto mt-4 h-48 w-48 rounded-lg object-contain"
                    style={{ background: "#ffffff", padding: "8px" }}
                  />
                </DonateCard>
              </Reveal>
            )}
          </div>
        ) : (
          /* Graceful empty state — no dummy data ever shown */
          <Reveal>
            <div
              className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-lg border border-border/50 p-6 text-center sm:p-8 lg:p-10"
              style={{
                background: "#fbf9f4",
                boxShadow:
                  "0 12px 28px rgba(27,58,39,0.08), 0 1px 0 rgba(255,255,255,0.70)",
              }}
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-lg"
                style={{ background: "#1b3a27" }}
              >
                <Heart className="h-6 w-6 text-white" aria-hidden />
              </span>
              <h3
                className="text-xl font-bold"
                style={{ fontFamily: "'Libre Caslon Text', serif", color: "#042413" }}
              >
                Coming Soon
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Official donation details will be updated soon. Please contact
                the school office to make a contribution directly.
              </p>
              <p
                className="text-sm font-semibold italic"
                style={{
                  fontFamily: "'Noto Sans Malayalam', sans-serif",
                  color: "#727972",
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
    <Container className="py-16">
      <Reveal>
        <div
          className="flex flex-col items-start gap-5 rounded-lg border border-border/50 p-5 sm:flex-row sm:p-6 lg:p-8"
          style={{
            background: "#f5f3ee",
            boxShadow:
              "0 12px 28px rgba(27,58,39,0.08), 0 1px 0 rgba(255,255,255,0.70)",
          }}
        >
          <span
            className="shrink-0 flex h-14 w-14 items-center justify-center rounded-lg"
            style={{ background: "#042413" }}
          >
            <Shield className="h-6 w-6 text-white" aria-hidden />
          </span>
          <div>
            <h2
              className="text-2xl font-extrabold"
              style={{ fontFamily: "'Libre Caslon Text', serif", color: "#042413" }}
            >
              Our Commitment to Transparency
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              All contributions received are intended <strong>exclusively</strong>{" "}
              for the NSS activities of <strong>{s.unitName}</strong>,{" "}
              {s.schoolName}, Valakkulam. Funds are used for camp expenses,
              community service materials, awareness programmes, and student
              welfare activities under the supervision of the Programme Officer.
            </p>
            <p
              className="mt-4 text-sm font-semibold italic"
              style={{ fontFamily: "'Noto Sans Malayalam', sans-serif", color: "#1b3a27" }}
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
    <section style={{ background: "#042413" }}>
      <Container className="py-14">
        <Reveal>
          <div className="flex flex-col items-center text-center gap-5">
            <p
              className="text-base font-medium"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              For donation enquiries
            </p>
            <h2
              className="text-2xl font-extrabold text-white sm:text-3xl text-balance"
              style={{ fontFamily: "'Libre Caslon Text', serif" }}
            >
              Please contact the school office
            </h2>
            <p
              className="max-w-md text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Visit {s.schoolName} during school hours, or reach us by email for
              any donation-related questions or to arrange a direct contribution.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <a
                href={`mailto:${s.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-opacity hover:opacity-90"
                style={{ background: "#a04021", color: "#ffffff" }}
              >
                Email us · {s.email}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-opacity hover:opacity-90"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                Contact page
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
