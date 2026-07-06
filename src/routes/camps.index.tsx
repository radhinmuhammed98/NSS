import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { Reveal, EmptyState, FilterBar, type FilterGroup } from "@/components/clay";
import { CampCard } from "@/components/media";
import { usePageMeta } from "@/hooks/usePageMeta";
import { getCamps } from "@/lib/data";
import type { Camp } from "@/types";

export const Route = createFileRoute("/camps/")({
  loader: async () => {
    const allCamps = await getCamps();
    return { allCamps: allCamps.filter((c) => c.slug) };
  },
  component: Camps,
});

function Camps() {
  const { allCamps: all } = Route.useLoaderData() as {
    allCamps: Camp[];
  };
  const [active, setActive] = useState<Record<string, string>>({});

  usePageMeta({
    title: "Camps",
    description: "Explore all NSS camps organised by Unit 466 at KHMHSS Valakkulam — special and regular camps.",
  });
  const groups: FilterGroup[] = [
    {
      key: "featured",
      label: "Show",
      options: [{ value: "all", label: "All" }, { value: "featured", label: "Featured" }],
    },
  ];
  const filtered = all.filter((c) => {
    if (active.featured === "featured" && !c.featured) return false;
    return true;
  });
  return (
    <PageShell>
      <PageHeader eyebrow="Camps" title="NSS Camps" description="Each camp is a complete documentary-style archive of a week of service." />
      <Container className="nss-py-8">
        <FilterBar groups={groups} active={active} onChange={(k, v) => setActive((s) => ({ ...s, [k]: v }))} />
        {filtered.length ? (
          <div className="nss-grid nss-gap-5 nss-sm-grid-cols-2">
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
