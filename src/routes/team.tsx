import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { Reveal, EmptyState, LeaderCard } from "@/components/clay";
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
      <Container className="nss-py-8">
        {hasAnyTeam ? (
          <div className="nss-flex nss-flex-col nss-gap-8">
            {groupedBatches.map(({ batch, members }) => (
              <div key={batch.slug}>
                <h2 className="nss-mb-5 nss-font-display nss-text-2xl nss-font-bold nss-leading-tight" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem" }}>
                  {batch.title}{" "}
                  <span className="nss-text-sm nss-font-semibold nss-text-muted" style={{ fontWeight: "normal", fontFamily: "var(--font-sans)" }}>
                    ({batch.yearRange})
                  </span>
                </h2>
                <div className="nss-grid nss-gap-5 nss-sm-grid-cols-2 nss-lg-grid-cols-4">
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
                  <div className="nss-mt-8 nss-flex nss-flex-col nss-items-start nss-gap-4 nss-sm-flex-row nss-sm-items-center nss-justify-between" style={{ padding: "1.25rem", borderRadius: "var(--radius-lg)", border: "1px solid rgba(27, 58, 39, 0.1)", backgroundColor: "rgba(27, 58, 39, 0.05)" }}>
                    <div>
                      <h3 className="nss-font-display nss-text-lg nss-font-bold nss-text-primary">50 NSS Volunteers</h3>
                      <p className="nss-text-sm nss-text-muted nss-mt-1">The complete volunteer list will be updated soon.</p>
                    </div>
                    <div className="nss-badge nss-badge-default" style={{ padding: "0.5rem 1rem" }}>
                      Active Batch
                    </div>
                  </div>
                )}
              </div>
            ))}

            {otherMembers.length > 0 && (
              <div>
                <h2 className="nss-mb-5 nss-font-display nss-text-2xl nss-font-bold nss-leading-tight" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem" }}>
                  Advisors & General Staff
                </h2>
                <div className="nss-grid nss-gap-5 nss-sm-grid-cols-2 nss-lg-grid-cols-4">
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
