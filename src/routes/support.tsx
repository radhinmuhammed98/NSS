import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";
import { getSiteSettings } from "@/lib/data";
import type { SiteSettings } from "@/types";
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
    const s = await getSiteSettings();
    return { s };
  },
  component: Support,
});

// ─── Page Component ───────────────────────────────────────────────────────────

function Support() {
  const { s } = Route.useLoaderData() as { s: SiteSettings };

  // Donation details — kept null intentionally until official details confirmed.
  const upiId        = null as string | null;
  const bankAccount  = null as {
    name: string; account: string; ifsc: string; bank: string; branch: string;
  } | null;
  const qrImageUrl   = null as string | null;

  return (
    <PageShell>
      <SupportHero />
      <CausesGrid />
      <DonationMethods upiId={upiId} bankAccount={bankAccount} qrImageUrl={qrImageUrl} />
      <TransparencyBlock s={s} />
      <DonationEnquiryCTA s={s} />
    </PageShell>
  );
}
