import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { ClayCard, Badge, Reveal, EmptyState } from "@/components/clay";

import { formatDate, getReports } from "@/lib/data";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — NSS Digital Legacy" },
      { name: "description", content: "Official NSS reports, brochures, and records by year and batch." },
      { property: "og:title", content: "NSS Reports" },
      { property: "og:description", content: "Annual, project, and camp reports archive." },
    ],
    links: [{ rel: "canonical", href: "/reports" }],
  }),
  component: Reports,
});

function Reports() {
  const reports = getReports();
  return (
    <PageShell>
      <PageHeader eyebrow="Reports" title="Reports & Documents" description="Official records preserved for reference." />
      <Container className="py-8">
        {reports.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reports.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.05}>
                <ClayCard className="flex h-full flex-col">
                  <FileText className="h-8 w-8 text-primary" />
                  <div className="mt-3"><Badge variant="outline">{r.type}</Badge></div>
                  <h3 className="mt-2 font-display font-bold">{r.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{r.description}</p>
                  <p className="mt-3 text-xs text-muted-foreground">{formatDate(r.date)}</p>
                  <a href={r.file} className="mt-3 text-sm font-semibold text-primary">View / download →</a>
                </ClayCard>
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState message="Reports will be published soon." />
        )}
      </Container>
    </PageShell>
  );
}
