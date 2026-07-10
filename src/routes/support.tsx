import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout";
import { getSiteSettings } from "@/lib/data";
import { usePageMeta } from "@/hooks/usePageMeta";
import type { SiteSettings } from "@/types";
import {
  SupportHero,
  CausesGrid,
  SupportMethods,
  TransparencyBlock,
  SupportEnquiryCTA,
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
  usePageMeta({
    title: "Support NSS",
    description: "Support the work of NSS Unit 466 at KHMHSS Valakkulam through volunteering and community partnership.",
  });

  return (
    <PageShell>
      <SupportHero />
      <CausesGrid />
      <SupportMethods />
      <TransparencyBlock s={s} />
      <SupportEnquiryCTA s={s} />
    </PageShell>
  );
}
