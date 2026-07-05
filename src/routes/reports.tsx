import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FileText, Download, Eye } from "lucide-react";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { ClayCard, Badge, Reveal, EmptyState, FilterBar, type FilterGroup } from "@/components/clay";
import { usePageMeta } from "@/hooks/usePageMeta";

import {
  formatDate,
  getReports,
  getReportTypes,
  getYearsFromReports,
} from "@/lib/data";
import type { Report } from "@/types";

export const Route = createFileRoute("/reports")({
  loader: async () => {
    const [reports, reportTypes, years] = await Promise.all([
      getReports(),
      getReportTypes(),
      getYearsFromReports(),
    ]);
    return { reports, reportTypes, years };
  },
  component: Reports,
});

function Reports() {
  const { reports, reportTypes, years } = Route.useLoaderData() as {
    reports: Report[];
    reportTypes: string[];
    years: number[];
  };

  const [active, setActive] = useState<Record<string, string>>({});

  usePageMeta({
    title: "Reports",
    description: "Download official activity reports and documentation from NSS Unit 466 at KHMHSS Valakkulam.",
  });

  const handleFilter = (key: string, value: string) => {
    setActive((prev) => ({ ...prev, [key]: value }));
  };

  const clearAll = () => setActive({});
  const hasActive = Object.values(active).some((v) => v && v !== "all");

  const filtered = useMemo(() => {
    return reports.filter((r) => {
      const yearOk = !active.year || active.year === "all" || String(r.year) === active.year;
      const typeOk = !active.type || active.type === "all" || r.type === active.type;
      return yearOk && typeOk;
    });
  }, [reports, active]);

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
      label: "Report Type",
      options: [
        { value: "all", label: "All" },
        ...reportTypes.map((t) => ({ value: t, label: t })),
      ],
    },
  ];

  const buttonStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    borderRadius: "var(--radius-md)",
    backgroundColor: "rgba(4, 36, 19, 0.1)",
    padding: "0.375rem 0.75rem",
    fontSize: "12px",
    fontWeight: 600,
    color: "var(--primary)",
    transition: "background-color 0.15s ease",
    cursor: "pointer"
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Reports"
        title="Reports & Documents"
        description="Official records preserved for reference."
      />
      <Container className="nss-py-8">
        {hasActive && (
          <div className="nss-flex nss-justify-end nss-mb-2">
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-semibold text-primary underline hover:no-underline cursor-pointer"
              aria-label="Clear all report filters"
            >
              Clear all
            </button>
          </div>
        )}
        <FilterBar groups={groups} active={active} onChange={handleFilter} />

        {filtered.length ? (
          <div className="nss-grid nss-gap-4 nss-sm-grid-cols-2 lg-grid-cols-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {filtered.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.05}>
                <ClayCard className="nss-flex nss-flex-col" style={{ height: "100%" }}>
                  <FileText style={{ height: "2rem", width: "2rem", color: "var(--primary)" }} aria-hidden />
                  <div className="nss-mt-3 nss-flex nss-flex-wrap nss-gap-2">
                    <Badge variant="outline">{r.type}</Badge>
                  </div>
                  <h3 className="nss-mt-2 nss-font-display nss-font-bold">{r.title}</h3>
                  <p className="nss-mt-2 nss-flex-1 nss-text-sm nss-text-muted">{r.description}</p>
                  <p className="nss-mt-3 nss-text-xs nss-text-muted">{formatDate(r.date)}</p>

                  {r.isPublic && r.file && r.file !== "#" ? (
                    <div className="nss-mt-4 nss-flex nss-gap-3">
                      <a
                        href={r.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${r.title}`}
                        style={buttonStyle}
                      >
                        <Eye style={{ height: "0.875rem", width: "0.875rem" }} aria-hidden />
                        View
                      </a>
                      <a
                        href={r.file}
                        download
                        aria-label={`Download ${r.title}`}
                        style={buttonStyle}
                      >
                        <Download style={{ height: "0.875rem", width: "0.875rem" }} aria-hidden />
                        Download
                      </a>
                    </div>
                  ) : (
                    <p className="nss-mt-4 nss-text-xs nss-text-muted nss-italic">
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
