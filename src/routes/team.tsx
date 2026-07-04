import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { ClayCard, Reveal, EmptyState, LeaderCard } from "@/components/clay";

import { getBatches, getTeam } from "@/lib/data";
import type { Batch, TeamMember } from "@/types";

export const Route = createFileRoute("/team")({
  loader: async () => {
    const [batches, team] = await Promise.all([
      getBatches(),
      getTeam(),
    ]);
    return { batches, team };
  },
  component: Team,
});

function Team() {
  const { batches, team } = Route.useLoaderData() as {
    batches: Batch[];
    team: TeamMember[];
  };

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
          <div className="space-y-10 sm:space-y-12">
            {groupedBatches.map(({ batch, members }) => (
              <div key={batch.slug}>
                <h2 className="mb-5 border-b border-border/60 pb-2 font-display text-2xl font-bold leading-tight">
                  {batch.title}{" "}
                  <span className="text-muted-foreground font-sans text-sm font-normal">
                    ({batch.yearRange})
                  </span>
                </h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {members.map((m, i) => (
                    <Reveal key={m.slug} delay={i * 0.06}>
                      <LeaderCard
                        name={m.name}
                        role={m.role}
                        bio={m.bio}
                        photo={m.photo}
                      />
                    </Reveal>
                  ))}
                </div>
                
                {batch.slug === "batch-2025-26" && (
                  <div className="mt-8 flex flex-col items-start gap-4 rounded-lg border border-[#1b3a27]/10 bg-[#1b3a27]/5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                    <div>
                      <h3 className="font-display text-lg font-bold text-[#1b3a27]">50 NSS Volunteers</h3>
                      <p className="text-sm text-muted-foreground mt-1">The complete volunteer list will be updated soon.</p>
                    </div>
                    <div className="rounded-md bg-[#1b3a27] px-4 py-2 font-display text-xs font-bold uppercase text-white">
                      Active Batch
                    </div>
                  </div>
                )}
              </div>
            ))}

            {otherMembers.length > 0 && (
              <div>
                <h2 className="mb-5 border-b border-border/60 pb-2 font-display text-2xl font-bold leading-tight">
                  Advisors & General Staff
                </h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {otherMembers.map((m, i) => (
                    <Reveal key={m.slug} delay={i * 0.06}>
                      <LeaderCard
                        name={m.name}
                        role={m.role}
                        bio={m.bio}
                        photo={m.photo}
                      />
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
