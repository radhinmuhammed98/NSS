import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { ClayCard, Badge, Reveal, EmptyState } from "@/components/clay";

import { formatDate, getTimeline } from "@/lib/data";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "Journey — NSS Digital Legacy" },
      { name: "description", content: "The NSS unit's journey from its founding to today, milestone by milestone." },
      { property: "og:title", content: "NSS Journey Timeline" },
      { property: "og:description", content: "A timeline of the unit's history and milestones." },
    ],
    links: [{ rel: "canonical", href: "/journey" }],
  }),
  component: Journey,
});

function Journey() {
  const items = getTimeline();
  return (
    <PageShell>
      <PageHeader eyebrow="Journey" title="The NSS Journey" description="From the very beginning to the future — every milestone preserved." />
      <Container className="py-8">
        {items.length ? (
          <div className="relative space-y-6 before:absolute before:left-4 before:top-2 before:h-full before:w-0.5 before:bg-border sm:before:left-1/2">
            {items.map((t, i) => (
              <Reveal key={t.slug} delay={i * 0.05}>
                <div className={`relative pl-12 sm:w-1/2 sm:pl-0 ${i % 2 ? "sm:ml-auto sm:pl-10" : "sm:pr-10 sm:text-right"}`}>
                  <span className={`clay-accent absolute left-2 top-3 flex h-5 w-5 items-center justify-center rounded-full sm:left-auto ${i % 2 ? "sm:-left-2.5" : "sm:-right-2.5"}`} />
                  <ClayCard tilt={false}>
                    <Badge variant="accent">{t.type}</Badge>
                    <h3 className="mt-2 font-display text-lg font-bold">{t.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{formatDate(t.date)}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{t.description}</p>
                  </ClayCard>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState message="The journey is being documented." />
        )}
      </Container>
    </PageShell>
  );
}
