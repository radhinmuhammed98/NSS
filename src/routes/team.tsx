import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { ClayCard, Reveal, EmptyState } from "@/components/clay";

import { getBatchTitle, getTeam } from "@/lib/data";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — NSS Digital Legacy" },
      { name: "description", content: "Meet the officers and volunteers behind the NSS unit." },
      { property: "og:title", content: "NSS Team & Volunteers" },
      { property: "og:description", content: "The people who power every campaign." },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
  component: Team,
});

function Team() {
  const team = getTeam();
  return (
    <PageShell>
      <PageHeader eyebrow="Team" title="Team & Volunteers" description="The people behind the service." />
      <Container className="py-8">
        {team.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.slug} delay={i * 0.06}>
                <ClayCard className="h-full text-center">
                  <img src={m.photo} alt={m.name} loading="lazy" decoding="async" className="mx-auto h-24 w-24 rounded-full object-cover" />
                  <h3 className="mt-3 font-display font-bold">{m.name}</h3>
                  <p className="text-xs font-semibold text-accent">{m.role}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{getBatchTitle(m.batchSlug)}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{m.bio}</p>
                </ClayCard>
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState message="Team details coming soon." />
        )}
      </Container>
    </PageShell>
  );
}
