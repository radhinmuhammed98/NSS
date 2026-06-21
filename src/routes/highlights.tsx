import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { Reveal, EmptyState, FilterBar, type FilterGroup } from "@/components/clay";
import { HighlightCard } from "@/components/media";

import {
  getBatches,
  getHighlights,
  getHighlightTypes,
  getYearsFromHighlights,
} from "@/lib/data";

export const Route = createFileRoute("/highlights")({
  component: Highlights,
});

type SortMode = "featured" | "newest" | "oldest";

const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "featured", label: "Featured first" },
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
];

function Highlights() {
  const highlights = getHighlights();
  const batches = getBatches();
  const highlightTypes = getHighlightTypes();
  const years = getYearsFromHighlights();

  const [active, setActive] = useState<Record<string, string>>({});
  const [sort, setSort] = useState<SortMode>("featured");

  const handleFilter = (key: string, value: string) => {
    setActive((prev) => ({ ...prev, [key]: value }));
  };

  const clearAll = () => setActive({});
  const hasActive = Object.values(active).some((v) => v && v !== "all");

  const groups: FilterGroup[] = [
    {
      key: "batch",
      label: "Batch",
      options: [
        { value: "all", label: "All" },
        ...batches.map((b) => ({ value: b.slug, label: b.yearRange })),
      ],
    },
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
      const batchOk = !active.batch || active.batch === "all" || h.batchSlug === active.batch;
      const yearOk = !active.year || active.year === "all" || String(h.year) === active.year;
      const typeOk = !active.type || active.type === "all" || h.type === active.type;
      return batchOk && yearOk && typeOk;
    });

    if (sort === "featured") {
      return [...base].sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return a.priority - b.priority;
      });
    }
    if (sort === "newest") {
      return [...base].sort((a, b) => b.date.localeCompare(a.date));
    }
    // oldest
    return [...base].sort((a, b) => a.date.localeCompare(b.date));
  }, [highlights, active, sort]);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Highlights"
        title="Moments Worth Remembering"
        description="The proudest achievements and most impactful moments of the unit."
      />
      <Container className="py-8">
        {/* Toolbar row: sort on left, clear-all on right */}
        <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" aria-hidden />
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Sort
            </span>
            <div className="flex gap-1" role="group" aria-label="Sort highlights">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSort(opt.value)}
                  aria-pressed={sort === opt.value}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-offset-2 ${
                    sort === opt.value
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {hasActive && (
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-semibold text-primary underline underline-offset-2 hover:no-underline"
              aria-label="Clear all highlight filters"
            >
              Clear all
            </button>
          )}
        </div>

        <FilterBar groups={groups} active={active} onChange={handleFilter} />

        {filtered.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
