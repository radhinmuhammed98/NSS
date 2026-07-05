import { createFileRoute } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { ClayCard, Badge, Reveal, EmptyState } from "@/components/clay";
import { usePageMeta } from "@/hooks/usePageMeta";

import { formatDate, getNotices } from "@/lib/data";
import type { Notice } from "@/types";

export const Route = createFileRoute("/notices")({
  loader: async () => {
    const list = await getNotices();
    return { list };
  },
  component: Notices,
});

function Notices() {
  const { list: notices } = Route.useLoaderData() as { list: Notice[] };
  usePageMeta({
    title: "Notices",
    description: "Official notices and announcements from NSS Unit 466 at KHMHSS Valakkulam.",
  });
  return (
    <PageShell>
      <PageHeader eyebrow="Notices" title="Notices & Updates" description="Latest announcements from the NSS unit." />
      <Container className="nss-py-8">
        {notices.length ? (
          <div className="nss-flex nss-flex-col nss-gap-4">
            {notices.map((n, i) => (
              <Reveal key={n.slug} delay={i * 0.05}>
                <ClayCard tilt={false} className="nss-flex nss-items-start nss-gap-4 nss-p-4 nss-sm-p-6">
                  <span className="nss-badge-accent nss-flex nss-shrink-0 nss-items-center nss-justify-center" style={{ height: "2.75rem", width: "2.75rem", borderRadius: "var(--radius-lg)" }}>
                    <Bell style={{ height: "1.25rem", width: "1.25rem" }} />
                  </span>
                  <div>
                    <div className="nss-flex nss-flex-wrap nss-items-center nss-gap-2">
                      <Badge variant="outline">{n.type}</Badge>
                      {n.important && <Badge variant="accent">Important</Badge>}
                      <span className="nss-text-xs nss-text-muted">{formatDate(n.date)}</span>
                    </div>
                    <h3 className="nss-mt-2 nss-font-display nss-font-bold">{n.title}</h3>
                    <p className="nss-mt-1 nss-text-sm nss-text-muted">{n.description}</p>
                  </div>
                </ClayCard>
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState message="No notices right now." />
        )}
      </Container>
    </PageShell>
  );
}
