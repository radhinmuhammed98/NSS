import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { Reveal, EmptyState, LeaderCard } from "@/components/clay";
import { getCurrentBatchTeam, getCurrentBatch } from "@/lib/data";
import { usePageMeta } from "@/hooks/usePageMeta";
import type { TeamMember, Batch } from "@/types";

export const Route = createFileRoute("/team")({
  loader: async () => {
    const [team, currentBatch] = await Promise.all([
      getCurrentBatchTeam(),
      getCurrentBatch(),
    ]);
    return { team, currentBatch };
  },
  component: Team,
});

function Team() {
  const { team, currentBatch } = Route.useLoaderData() as {
    team: TeamMember[];
    currentBatch: Batch | undefined;
  };

  usePageMeta({
    title: "Our Team",
    description: "Meet the Programme Officers, Volunteer Secretaries, and dedicated volunteers of NSS Unit 466.",
  });

  // 1. Filter out student leaders from the team collection so we only show staff (Principal, POs)
  const staff = team.filter((m) => {
    const roleLower = m.role.toLowerCase();
    return (
      roleLower.includes("officer") || 
      roleLower.includes("principal") || 
      roleLower.includes("po") || 
      roleLower.includes("teacher")
    );
  });

  // 2. Dynamically inject the two leaders defined inside the current batch
  const displayTeam: TeamMember[] = [...staff];
  if (currentBatch) {
    if (currentBatch.leader1Name) {
      displayTeam.push({
        slug: "current-batch-leader-1",
        name: currentBatch.leader1Name,
        role: currentBatch.leader1Role || "Volunteer Secretary",
        photo: currentBatch.leader1Photo || "",
        bio: `Student Volunteer Secretary for the ${currentBatch.academicYear} academic year.`,
        order: 10,
      });
    }
    if (currentBatch.leader2Name) {
      displayTeam.push({
        slug: "current-batch-leader-2",
        name: currentBatch.leader2Name,
        role: currentBatch.leader2Role || "Volunteer Secretary",
        photo: currentBatch.leader2Photo || "",
        bio: `Student Volunteer Secretary for the ${currentBatch.academicYear} academic year.`,
        order: 11,
      });
    }
  }

  const batchLabel = currentBatch?.title ?? "Current Batch";
  const hasAnyTeam = displayTeam.length > 0;

  return (
    <PageShell>
      <PageHeader
        eyebrow="Team"
        title="Team & Volunteers"
        description={`The people behind the service — ${batchLabel}.`}
      />
      <Container className="nss-py-8">
        {hasAnyTeam ? (
          <div className="nss-flex nss-flex-col nss-gap-8">
            <div className="nss-grid nss-gap-5 nss-sm-grid-cols-2 nss-lg-grid-cols-4">
              {displayTeam.map((m, i) => (
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
        ) : (
          <EmptyState message="Team details coming soon." />
        )}
      </Container>
    </PageShell>
  );
}
