import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FileText, Download, Eye } from "lucide-react";
import { PageShell, PageHeader, Container } from "@/components/layout";
import {
  ClayCard,
  Badge,
  Reveal,
  EmptyState,
  FilterBar,
  type FilterGroup,
} from "@/components/clay";

import {
  formatDate,
  getBatches,
  getReports,
  getReportTypes,
  getYearsFromReports,
} from "@/lib/data";
import type { Report, Batch } from "@/types";

export const Route = createFileRoute("/reports")({
  loader: async () => {
    const [reports, batches, reportTypes, years] = await Promise.all([
      getReports(),
      getBatches(),
      getReportTypes(),
      getYearsFromReports(),
    ]);
    return { reports, batches, reportTypes, years };
  },
  component: Reports,
});

function Reports() {
  const { reports, batches, reportTypes, years } = Route.useLoaderData() as {
    reports: Report[];
    batches: Batch[];
    reportTypes: string[];
    years: number[];
  };

  const [active, setActive] = useState<Record<string, string>>({});

  const handleFilter = (key: string, value: string) => {
    setActive((prev) => ({ ...prev, [key]: value }));
  };

  const clearAll = () => setActive({});
  const hasActive = Object.values(active).some((v) => v && v !== "all");

  const filtered = useMemo(() => {
    return reports.filter((r) => {
      const batchOk = !active.batch || active.batch === "all" || r.batchSlug === active.batch;
      const yearOk = !active.year || active.year === "all" || String(r.year) === active.year;
      const typeOk = !active.type || active.type === "all" || r.type === active.type;
      return batchOk && yearOk && typeOk;
    });
  }, [reports, active]);

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
      label: "Report Type",
      options: [
        { value: "all", label: "All" },
        ...reportTypes.map((t) => ({ value: t, label: t })),
      ],
    },
  ];

  return (
    <PageShell>
      <PageHeader
        eyebrow="Reports"
        title="Reports & Documents"
        description="Official records preserved for reference."
      />
      <Container className="py-8">
        {hasActive && (
          <div className="flex justify-end mb-2">
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-semibold text-primary underline underline-offset-2 hover:no-underline"
              aria-label="Clear all report filters"
            >
              Clear all
            </button>
          </div>
        )}
        <FilterBar groups={groups} active={active} onChange={handleFilter} />

        {filtered.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.05}>
                <ClayCard className="flex h-full flex-col">
                  <FileText className="h-8 w-8 text-primary" aria-hidden />
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="outline">{r.type}</Badge>
                    {r.batchSlug && (
                      <Badge variant="outline">
                        {batches.find((b) => b.slug === r.batchSlug)?.yearRange ?? r.batchSlug}
                      </Badge>
                    )}
                  </div>
                  <h3 className="mt-2 font-display font-bold">{r.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{r.description}</p>
                  <p className="mt-3 text-xs text-muted-foreground">{formatDate(r.date)}</p>

                  {r.isPublic && r.file && r.file !== "#" ? (
                    <div className="mt-4 flex gap-3">
                      <a
                        href={r.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${r.title}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
                      >
                        <Eye className="h-3.5 w-3.5" aria-hidden />
                        View
                      </a>
                      <a
                        href={r.file}
                        download
                        aria-label={`Download ${r.title}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
                      >
                        <Download className="h-3.5 w-3.5" aria-hidden />
                        Download
                      </a>
                    </div>
                  ) : (
                    <p className="mt-4 text-xs text-muted-foreground italic">
                      {r.isPublic ? "File link coming soon" : "Not publicly available"}
                    </p>
                  )}
                </ClayCard>
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState message="No reports match the selected filters." />
        )}
      </Container>
    </PageShell>
  );
}
