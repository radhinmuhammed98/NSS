import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { Reveal, EmptyState } from "@/components/clay";
import { HighlightCard } from "@/components/media";

import { getHighlights } from "@/lib/data";

export const Route = createFileRoute("/highlights")({
  head: () => ({
    meta: [
      { title: "Highlights — NSS Digital Legacy" },
      { name: "description", content: "The best and most impactful moments from across the NSS unit's journey." },
      { property: "og:title", content: "NSS Highlights" },
      { property: "og:description", content: "Awards, milestones, and unforgettable moments." },
    ],
    links: [{ rel: "canonical", href: "/highlights" }],
  }),
  component: Highlights,
});

function Highlights() {
  const items = getHighlights();
  return (
    <PageShell>
      <PageHeader eyebrow="Highlights" title="Moments Worth Remembering" description="The proudest achievements and most impactful moments of the unit." />
      <Container className="py-8">
        {items.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((h, i) => (
              <Reveal key={h.slug} delay={i * 0.06}><HighlightCard highlight={h} /></Reveal>
            ))}
          </div>
        ) : (
          <EmptyState message="No highlights added yet." />
        )}
      </Container>
    </PageShell>
  );
}
