import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ArrowUpDown } from "lucide-react";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { cn } from "@/lib/utils";
import { ClayCard, Badge, Reveal, EmptyState } from "@/components/clay";

import { formatDate, getTimeline } from "@/lib/data";

export const Route = createFileRoute("/journey")({
  loader: async () => {
    const items = await getTimeline();
    return { items };
  },
  component: Journey,
});

function Journey() {
  const { items } = Route.useLoaderData();
  const [newestFirst, setNewestFirst] = useState(false);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) =>
      newestFirst ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)
    );
  }, [items, newestFirst]);

  return (
    <PageShell>
      <PageHeader eyebrow="Journey" title="The NSS Journey" description="From the very beginning to the future — every milestone preserved." />
      <Container className="nss-py-8">
        <div className="nss-mb-6 nss-flex nss-items-center nss-gap-2">
          <ArrowUpDown style={{ height: "1rem", width: "1rem", color: "var(--muted-foreground)" }} aria-hidden />
          <span className="nss-text-xs nss-font-semibold nss-text-muted">Order:</span>
          <div className="nss-flex nss-gap-1">
            <button
              type="button"
              onClick={() => setNewestFirst(false)}
              className="cursor-pointer transition-all"
              style={{
                borderRadius: "var(--radius-md)",
                padding: "0.25rem 0.625rem",
                fontSize: "12px",
                fontWeight: 600,
                backgroundColor: !newestFirst ? "var(--primary)" : "var(--muted)",
                color: !newestFirst ? "var(--primary-foreground)" : "var(--muted-foreground)"
              }}
            >
              Oldest first
            </button>
            <button
              type="button"
              onClick={() => setNewestFirst(true)}
              className="cursor-pointer transition-all"
              style={{
                borderRadius: "var(--radius-md)",
                padding: "0.25rem 0.625rem",
                fontSize: "12px",
                fontWeight: 600,
                backgroundColor: newestFirst ? "var(--primary)" : "var(--muted)",
                color: newestFirst ? "var(--primary-foreground)" : "var(--muted-foreground)"
              }}
            >
              Newest first
            </button>
          </div>
        </div>

        {sortedItems.length ? (
          <div className="nss-timeline">
            {sortedItems.map((t, i) => {
              const isEven = i % 2 === 0;
              return (
                <Reveal key={t.slug} delay={i * 0.05}>
                  <div
                    style={{
                      position: "relative",
                      paddingLeft: "3rem",
                      width: "100%"
                    }}
                    className={cnHelper(isEven)}
                  >
                    {/* Circle Node */}
                    <span
                      className={cn("nss-badge-accent", cnDotHelper(isEven))}
                      style={{
                        position: "absolute",
                        left: "0.75rem",
                        top: "0.75rem",
                        display: "flex",
                        height: "0.75rem",
                        width: "0.75rem",
                        borderRadius: "50%"
                      }}
                    />
                    <ClayCard tilt={false} className="nss-p-4 nss-sm-p-5">
                      <Badge variant="accent" className="w-fit">{t.type}</Badge>
                      <h3 className="nss-mt-2 nss-font-display nss-text-lg nss-font-bold">{t.title}</h3>
                      <p className="nss-mt-1 nss-text-xs nss-text-muted">{formatDate(t.date)}</p>
                      <p className="nss-mt-2 nss-text-sm nss-text-muted">{t.description}</p>
                    </ClayCard>
                  </div>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <EmptyState message="The journey is being documented." />
        )}
      </Container>
    </PageShell>
  );
}

// Simple layout class helper for timeline nodes
function cnHelper(isEven: boolean) {
  // We can write simple logic that gets applied via JS/CSS.
  // Standard CSS class selectors handle this nicely.
  return isEven ? "nss-timeline-even" : "nss-timeline-odd";
}

function cnDotHelper(isEven: boolean) {
  return isEven ? "nss-timeline-dot-even" : "nss-timeline-dot-odd";
}
