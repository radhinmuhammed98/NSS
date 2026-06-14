import { createFileRoute } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { ClayCard, Badge, Reveal, EmptyState } from "@/components/clay";

import { formatDate, getNotices } from "@/lib/data";

export const Route = createFileRoute("/notices")({
  head: () => ({
    meta: [
      { title: "Notices — NSS Digital Legacy" },
      { name: "description", content: "Latest NSS announcements, events, and updates." },
      { property: "og:title", content: "NSS Notices & Updates" },
      { property: "og:description", content: "Stay updated with the latest from the unit." },
    ],
    links: [{ rel: "canonical", href: "/notices" }],
  }),
  component: Notices,
});

function Notices() {
  const notices = getNotices();
  return (
    <PageShell>
      <PageHeader eyebrow="Notices" title="Notices & Updates" description="Latest announcements from the NSS unit." />
      <Container className="py-8">
        {notices.length ? (
          <div className="space-y-4">
            {notices.map((n, i) => (
              <Reveal key={n.slug} delay={i * 0.05}>
                <ClayCard tilt={false} className="flex items-start gap-4">
                  <span className="clay-accent flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                    <Bell className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline">{n.type}</Badge>
                      {n.important && <Badge variant="accent">Important</Badge>}
                      <span className="text-xs text-muted-foreground">{formatDate(n.date)}</span>
                    </div>
                    <h3 className="mt-2 font-display font-bold">{n.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{n.description}</p>
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
