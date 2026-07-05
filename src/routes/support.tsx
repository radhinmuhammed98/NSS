import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";
import { getSiteSettings, getDonation } from "@/lib/data";
import { usePageMeta } from "@/hooks/usePageMeta";
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
  usePageMeta({
    title: "Support NSS",
    description: "Support the work of NSS Unit 466 at KHMHSS Valakkulam through donations and volunteering.",
  });

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
