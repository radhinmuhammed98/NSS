import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calendar, MapPin, Users } from "lucide-react";
import { PageShell, Container } from "@/components/layout";
import { ClayCard, Badge, Reveal, ImpactStat } from "@/components/clay";
import { HighlightCard } from "@/components/media";

import { formatDate, getCampBySlug, getProjectBySlug, getReportsBySlugs } from "@/lib/data";
import type { ImpactMetric, Camp, Project, Report } from "@/types";

export const Route = createFileRoute("/projects/$projectSlug")({
  loader: async ({ params }: { params: { projectSlug: string } }) => {
    const project = await getProjectBySlug(params.projectSlug);
    if (!project) throw notFound();

    // Query related camp & reports concurrently
    const [relatedCamp, reports] = await Promise.all([
      project.relatedCampSlug ? getCampBySlug(project.relatedCampSlug) : Promise.resolve(null),
      getReportsBySlugs(project.reportSlugs),
    ]);

    return { project, relatedCamp, reports };
  },

  notFoundComponent: () => (
    <PageShell>
      <Container className="nss-py-20 nss-text-center">
        <h1 className="nss-font-display nss-text-3xl nss-font-extrabold">Project not found</h1>
        <Link to="/projects" style={{ display: "inline-block", marginTop: "1rem", color: "var(--primary)" }}>← Back to projects</Link>
      </Container>
    </PageShell>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { project, relatedCamp, reports } = Route.useLoaderData() as {
    project: Project;
    relatedCamp: Camp | null;
    reports: Report[];
  };

  return (
    <PageShell>
      <section className="nss-px-3 nss-pt-4">
        <Container className="nss-px-0">
          <Reveal>
            <div className="nss-card nss-p-0" style={{ overflow: "hidden" }}>
              <div style={{ position: "relative" }}>
                <img
                  src={project.coverImage}
                  alt={project.title}
                  width={1280}
                  height={549}
                  fetchPriority="high"
                  decoding="async"
                  style={{ aspectRatio: "21/9", width: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(27, 28, 25, 0.7) 0%, transparent 100%)" }} />
                <div style={{ position: "absolute", bottom: 0, padding: "1.5rem", color: "#ffffff" }}>
                  <Badge variant="accent">{project.category}</Badge>
                  <h1 className="nss-mt-2 nss-font-display nss-text-3xl nss-font-extrabold nss-text-balance nss-sm-text-4xl" style={{ color: "#ffffff" }}>
                    {project.title}
                  </h1>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <Container className="nss-py-8">
        <div className="nss-flex nss-flex-wrap nss-gap-4 nss-text-sm nss-text-muted">
          <span className="nss-flex nss-items-center nss-gap-1">
            <MapPin style={{ height: "1rem", width: "1rem" }} /> {project.location}
          </span>
          <span className="nss-flex nss-items-center nss-gap-1">
            <Calendar style={{ height: "1rem", width: "1rem" }} /> {formatDate(project.date)}
          </span>
        </div>

        <ClayCard tilt={false} className="nss-mt-6 nss-p-4 nss-sm-p-6">
          <h2 className="nss-font-display nss-text-xl nss-font-bold">Overview</h2>
          <p className="nss-mt-3 nss-text-muted">{project.description}</p>
        </ClayCard>

        {project.impactMetrics && project.impactMetrics.length > 0 && (
          <div className="nss-mt-6 nss-grid nss-grid-cols-2 nss-gap-4 nss-sm-grid-cols-4">
            {project.impactMetrics.map((m: ImpactMetric) => (
              <ImpactStat key={m.label} label={m.label} value={m.value} />
            ))}
          </div>
        )}

        {relatedCamp && (
          <div className="nss-mt-10">
            <h2 className="nss-mb-4 nss-font-display nss-text-xl nss-font-bold">Linked Camp</h2>
            <Reveal>
              <ClayCard tilt={false} className="nss-flex nss-flex-col nss-gap-4 nss-sm-flex-row nss-p-4 nss-sm-p-6">
                <div className="nss-badge-accent nss-flex nss-shrink-0 nss-flex-col nss-items-center nss-justify-center" style={{ height: "4rem", width: "4rem", borderRadius: "var(--radius-lg)" }}>
                  <Calendar style={{ height: "1.5rem", width: "1.5rem" }} />
                </div>
                <div>
                  <h3 className="nss-font-display nss-text-lg nss-font-bold">{relatedCamp.title}</h3>
                  <p className="nss-text-xs nss-text-muted">{formatDate(relatedCamp.startDate)}</p>
                  <p className="nss-mt-2 nss-text-sm nss-text-muted">{relatedCamp.summary}</p>
                  <Link
                    to="/camps/$campSlug"
                    params={{ campSlug: relatedCamp.slug }}
                    className="nss-mt-4 nss-flex nss-items-center nss-gap-1 nss-text-sm nss-font-semibold nss-text-primary hover:underline"
                  >
                    View camp details →
                  </Link>
                </div>
              </ClayCard>
            </Reveal>
          </div>
        )}

        {reports.length > 0 && (
          <div className="nss-mt-10">
            <h2 className="nss-mb-4 nss-font-display nss-text-xl nss-font-bold">Reports</h2>
            <div className="nss-grid nss-gap-4 nss-sm-grid-cols-2 lg-grid-cols-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
              {reports.map((r) => (
                <ClayCard key={r.slug} className="nss-p-4 nss-sm-p-6">
                  <Badge variant="outline">{r.type}</Badge>
                  <h3 className="nss-mt-3 nss-font-display nss-font-bold">{r.title}</h3>
                  <p className="nss-mt-2 nss-text-sm nss-text-muted">{r.description}</p>
                </ClayCard>
              ))}
            </div>
          </div>
        )}
      </Container>
    </PageShell>
  );
}
