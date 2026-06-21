import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { ClayCard, Reveal, EmptyState } from "@/components/clay";

import { getBatches, getTeam } from "@/lib/data";

export const Route = createFileRoute("/team")({
  component: Team,
});

function Team() {
  const batches = getBatches();
  const team = getTeam();

  // Pre-filter members per batch
  const groupedBatches = batches
    .map((batch) => ({
      batch,
      members: team.filter((m) => m.batchSlug === batch.slug),
    }))
    .filter((g) => g.members.length > 0);

  // Catch any team member that might not match any batch slug
  const batchSlugs = new Set(batches.map((b) => b.slug));
  const otherMembers = team.filter((m) => !m.batchSlug || !batchSlugs.has(m.batchSlug));

  const hasAnyTeam = groupedBatches.length > 0 || otherMembers.length > 0;

  return (
    <PageShell>
      <PageHeader eyebrow="Team" title="Team & Volunteers" description="The people behind the service." />
      <Container className="py-8">
        {hasAnyTeam ? (
          <div className="space-y-12">
            {groupedBatches.map(({ batch, members }) => (
              <div key={batch.slug}>
                <h2 className="mb-6 font-display text-2xl font-bold tracking-tight border-b pb-2 border-border/60">
                  {batch.title}{" "}
                  <span className="text-muted-foreground font-sans text-sm font-normal">
                    ({batch.yearRange})
                  </span>
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {members.map((m, i) => (
                    <Reveal key={m.slug} delay={i * 0.06}>
                      <ClayCard className="h-full text-center">
                        <img
                          src={m.photo}
                          alt={m.name}
                          loading="lazy"
                          decoding="async"
                          className="mx-auto h-24 w-24 rounded-full object-cover"
                        />
                        <h3 className="mt-3 font-display font-bold">{m.name}</h3>
                        <p className="text-xs font-semibold text-accent">{m.role}</p>
                        <p className="mt-2 text-xs text-muted-foreground">{m.bio}</p>
                      </ClayCard>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}

            {otherMembers.length > 0 && (
              <div>
                <h2 className="mb-6 font-display text-2xl font-bold tracking-tight border-b pb-2 border-border/60">
                  Advisors & General Staff
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {otherMembers.map((m, i) => (
                    <Reveal key={m.slug} delay={i * 0.06}>
                      <ClayCard className="h-full text-center">
                        <img
                          src={m.photo}
                          alt={m.name}
                          loading="lazy"
                          decoding="async"
                          className="mx-auto h-24 w-24 rounded-full object-cover"
                        />
                        <h3 className="mt-3 font-display font-bold">{m.name}</h3>
                        <p className="text-xs font-semibold text-accent">{m.role}</p>
                        <p className="mt-2 text-xs text-muted-foreground">{m.bio}</p>
                      </ClayCard>
                    </Reveal>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <EmptyState message="Team details coming soon." />
        )}
      </Container>
    </PageShell>
  );
}
