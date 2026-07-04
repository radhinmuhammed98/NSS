import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { Reveal, EmptyState } from "@/components/clay";
import { BatchCard } from "@/components/media";

import { getBatches } from "@/lib/data";
import type { Batch } from "@/types";

export const Route = createFileRoute("/batches/")({
  loader: async () => {
    const batchesList = await getBatches();
    return { batchesList };
  },
  component: Batches,
});

function Batches() {
  const { batchesList: batches } = Route.useLoaderData() as { batchesList: Batch[] };
  return (
    <PageShell>
      <PageHeader
        eyebrow="Batches"
        title="Every Batch, Every Chapter"
        description="Each batch serves and leaves, but their journey stays forever. Explore them newest first."
      />
      <Container className="nss-py-8">
        {batches.length === 0 ? (
          <EmptyState message="No batches added yet." />
        ) : (
          <div className="nss-grid nss-gap-5 nss-sm-grid-cols-2 lg-grid-cols-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {batches.map((b, i) => (
              <Reveal key={b.slug} delay={i * 0.08}>
                <BatchCard batch={b} />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </PageShell>
  );
}
