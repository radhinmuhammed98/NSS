import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { Reveal, EmptyState, FilterBar, type FilterGroup } from "@/components/clay";
import { CampCard } from "@/components/media";

import { getBatches, getCamps } from "@/lib/data";

export const Route = createFileRoute("/camps/")({
  head: () => ({
    meta: [
      { title: "Camps — NSS Digital Legacy" },
      { name: "description", content: "Explore NSS special camps with day-wise documentary archives." },
      { property: "og:title", content: "NSS Camps" },
      { property: "og:description", content: "Day-wise NSS camp archives across the years." },
    ],
    links: [{ rel: "canonical", href: "/camps" }],
  }),
  component: Camps,
});

function Camps() {
  const all = getCamps();
  const batches = getBatches();
  const [active, setActive] = useState<Record<string, string>>({});
  const groups: FilterGroup[] = [
    {
      key: "batch",
      label: "Batch",
      options: [{ value: "all", label: "All" }, ...batches.map((b) => ({ value: b.slug, label: b.yearRange }))],
    },
    {
      key: "featured",
      label: "Show",
      options: [{ value: "all", label: "All" }, { value: "featured", label: "Featured" }],
    },
  ];
  const filtered = all.filter((c) => {
    if (active.batch && active.batch !== "all" && c.batchSlug !== active.batch) return false;
    if (active.featured === "featured" && !c.featured) return false;
    return true;
  });
  return (
    <PageShell>
      <PageHeader eyebrow="Camps" title="NSS Camps" description="Each camp is a complete documentary-style archive of a week of service." />
      <Container className="py-8">
        <FilterBar groups={groups} active={active} onChange={(k, v) => setActive((s) => ({ ...s, [k]: v }))} />
        {filtered.length ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {filtered.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.06}><CampCard camp={c} /></Reveal>
            ))}
          </div>
        ) : (
          <EmptyState message="No camps match these filters." />
        )}
      </Container>
    </PageShell>
  );
}
