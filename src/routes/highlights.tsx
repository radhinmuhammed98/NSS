import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { Reveal, EmptyState, FilterBar, type FilterGroup } from "@/components/clay";
import { HighlightCard } from "@/components/media";
import { usePageMeta } from "@/hooks/usePageMeta";

import {
  getHighlights,
  getHighlightTypes,
  getYearsFromHighlights,
} from "@/lib/data";
import type { Highlight } from "@/types";

export const Route = createFileRoute("/highlights")({
  loader: async () => {
    const [highlights, highlightTypes, years] = await Promise.all([
      getHighlights(),
      getHighlightTypes(),
      getYearsFromHighlights(),
    ]);
    return { highlights, highlightTypes, years };
  },
  component: Highlights,
});

type SortMode = "featured" | "newest" | "oldest";

const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "featured", label: "Featured first" },
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
];

function Highlights() {
  const { highlights, highlightTypes, years } = Route.useLoaderData() as {
    highlights: Highlight[];
    highlightTypes: string[];
    years: number[];
  };

  const [active, setActive] = useState<Record<string, string>>({});
  const [sort, setSort] = useState<SortMode>("featured");

  usePageMeta({
    title: "Highlights",
    description: "Key achievements, milestones, and proud moments from NSS Unit 466 at KHMHSS Valakkulam.",
  });

  const handleFilter = (key: string, value: string) => {
    setActive((prev) => ({ ...prev, [key]: value }));
  };

  const clearAll = () => setActive({});
  const hasActive = Object.values(active).some((v) => v && v !== "all");

  const groups: FilterGroup[] = [
    {
      key: "year",
      label: "Year",
      options: [
        { value: "all", label: "All" },
        ...years.map((y) => ({ value: String(y), label: String(y) })),
      ],
    },
    {
      key: "type",
      label: "Type",
      options: [
        { value: "all", label: "All" },
        ...highlightTypes.map((t) => ({ value: t, label: t })),
      ],
    },
  ];

  const filtered = useMemo(() => {
    const base = highlights.filter((h) => {
      const yearOk = !active.year || active.year === "all" || String(h.year) === active.year;
      const typeOk = !active.type || active.type === "all" || h.type === active.type;
      return yearOk && typeOk;
    });

    if (sort === "featured") {
      return [...base].sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return (a.priority || 10) - (b.priority || 10);
      });
    }
    if (sort === "newest") {
      return [...base].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    }
    // oldest
    return [...base].sort((a, b) => (a.date || "").localeCompare(b.date || ""));
  }, [highlights, active, sort]);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Highlights"
        title="Moments Worth Remembering"
        description="The proudest achievements and most impactful moments of the unit."
      />
      <Container className="nss-py-8">
        <div className="nss-mb-3 nss-flex nss-flex-col nss-gap-3 nss-sm-flex-row nss-sm-items-center nss-justify-between">
          <div className="nss-flex nss-flex-wrap nss-items-center nss-gap-2" style={{ minWidth: 0 }}>
            <ArrowUpDown style={{ height: "1rem", width: "1rem", color: "var(--muted-foreground)" }} aria-hidden />
            <span className="nss-text-xs nss-font-bold nss-uppercase nss-text-muted">
              Sort
            </span>
            <div className="nss-flex nss-flex-wrap nss-gap-1" role="group" aria-label="Sort highlights">
              {SORT_OPTIONS.map((opt) => {
                const isSelected = sort === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setSort(opt.value)}
                    aria-pressed={isSelected}
                    className="nss-badge cursor-pointer"
                    style={{
                      borderRadius: "var(--radius-md)",
                      padding: "0.375rem 0.75rem",
                      fontSize: "12px",
                      fontWeight: 600,
                      backgroundColor: isSelected ? "var(--primary)" : "var(--background)",
                      color: isSelected ? "var(--primary-foreground)" : "var(--muted-foreground)",
                      border: isSelected ? "none" : "1px solid var(--border)"
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {hasActive && (
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-semibold text-primary underline hover:no-underline cursor-pointer"
              aria-label="Clear all highlight filters"
            >
              Clear all
            </button>
          )}
        </div>

        <FilterBar groups={groups} active={active} onChange={handleFilter} />

        {filtered.length ? (
          <div className="nss-grid nss-gap-5 nss-sm-grid-cols-2 nss-lg-grid-cols-3">
            {filtered.map((h, i) => (
              <Reveal key={h.slug} delay={i * 0.06}>
                <HighlightCard highlight={h} />
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState message="No highlights match the selected filters." />
        )}
      </Container>
    </PageShell>
  );
}
