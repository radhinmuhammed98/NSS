import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";
import { getSiteSettings, getDonation } from "@/lib/data";
import type { SiteSettings, Donation } from "@/types";
import {
  SupportHero,
  CausesGrid,
  DonationMethods,
  TransparencyBlock,
  DonationEnquiryCTA,
} from "./-SupportSections";

// ─── Route ────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/support")({
  loader: async () => {
    const [s, d] = await Promise.all([getSiteSettings(), getDonation()]);
    return { s, d };
  },
  component: Support,
});

// ─── Page Component ───────────────────────────────────────────────────────────

function Support() {
  const { s, d } = Route.useLoaderData() as { s: SiteSettings; d: Donation };

  const upiId        = d.enabled ? (d.upiId || null) : null;
  const bankAccount  = d.enabled ? (d.bankAccount || null) : null;
  const qrImageUrl   = d.enabled ? (d.qrImageUrl || null) : null;

  return (
    <PageShell>
      <SupportHero />
      <CausesGrid />
      <DonationMethods upiId={upiId} bankAccount={bankAccount as any} qrImageUrl={qrImageUrl} />
      <TransparencyBlock s={s} />
      <DonationEnquiryCTA s={s} />
    </PageShell>
  );
}
