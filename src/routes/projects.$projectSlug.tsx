import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calendar, MapPin } from "lucide-react";
import { PageShell, Container } from "@/components/layout";
import { ClayCard, Badge, Reveal, ImpactStat, EmptyState } from "@/components/clay";
import { CampCard, HighlightCard } from "@/components/media";

import {
  formatDate,
  getBatchTitle,
  getCampBySlug,
  getHighlightsBySlugs,
  getProjectBySlug,
  getReportsBySlugs,
} from "@/lib/data";
import type { ImageAsset, ImpactMetric } from "@/types";

export const Route = createFileRoute("/projects/$projectSlug")({
  loader: ({ params }: { params: { projectSlug: string } }) => {
    const project = getProjectBySlug(params.projectSlug);
    if (!project) throw notFound();
    return { project };
  },

  notFoundComponent: () => (
    <PageShell>
      <Container className="py-20 text-center">
        <h1 className="font-display text-3xl font-extrabold">Project not found</h1>
        <Link to="/projects" className="mt-4 inline-block text-primary">← Back to projects</Link>
      </Container>
    </PageShell>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const reports = getReportsBySlugs(project.reportSlugs);
  const highlights = getHighlightsBySlugs(project.highlightSlugs);
  const relatedCamp = project.relatedCampSlug ? getCampBySlug(project.relatedCampSlug) : undefined;

  return (
    <PageShell>
      <section className="px-3 pt-4">
        <Container className="px-0">
          <Reveal>
            <div className="clay overflow-hidden p-0">
              <img src={project.coverImage} alt={project.title} width={1280} height={549} fetchPriority="high" decoding="async" className="aspect-[21/9] w-full object-cover" />
            </div>
          </Reveal>
        </Container>
      </section>

      <Container className="py-8">
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge variant="accent">{project.category}</Badge>
          <Badge>{getBatchTitle(project.batchSlug)}</Badge>
          <Badge variant="outline">{project.status}</Badge>
        </div>
        <h1 className="text-3xl font-extrabold text-balance sm:text-4xl">{project.title}</h1>
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {formatDate(project.date)}</span>
          <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {project.location}</span>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <ClayCard tilt={false}>
              <h2 className="font-display text-xl font-bold">About this project</h2>
              <p className="mt-3 text-muted-foreground">{project.description}</p>
              <h3 className="mt-5 font-display font-bold">Problem addressed</h3>
              <p className="mt-1 text-sm text-muted-foreground">{project.problemAddressed}</p>
              <h3 className="mt-5 font-display font-bold">What NSS did</h3>
              <p className="mt-1 text-sm text-muted-foreground">{project.whatNssDid}</p>
            </ClayCard>

            {project.images.length > 0 && (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {project.images.map((im: ImageAsset) => (
                  <img key={im.id} src={im.src} alt={im.alt} loading="lazy" decoding="async" className="clay aspect-square w-full object-cover p-0" />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <ClayCard tilt={false}>
              <h2 className="font-display text-lg font-bold">Impact</h2>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {project.impactMetrics.map((m: ImpactMetric) => (
                  <ImpactStat key={m.label} label={m.label} value={m.value} />
                ))}
              </div>
            </ClayCard>
            <ClayCard tilt={false}>
              <h2 className="font-display text-lg font-bold">Organizers</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.organizers.map((o: string) => <Badge key={o}>{o}</Badge>)}
              </div>
            </ClayCard>
          </div>
        </div>

        {relatedCamp && (
          <div className="mt-10">
            <h2 className="mb-4 font-display text-xl font-bold">Related Camp</h2>
            <CampCard camp={relatedCamp} />
          </div>
        )}

        {highlights.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 font-display text-xl font-bold">Highlights</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((h) => <HighlightCard key={h.slug} highlight={h} />)}
            </div>
          </div>
        )}

        <div className="mt-10">
          <h2 className="mb-4 font-display text-xl font-bold">Reports</h2>
          {reports.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reports.map((r) => (
                <ClayCard key={r.slug}>
                  <Badge variant="outline">{r.type}</Badge>
                  <h3 className="mt-3 font-display font-bold">{r.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.description}</p>
                </ClayCard>
              ))}
            </div>
          ) : (
            <EmptyState message="No reports linked to this project yet." />
          )}
        </div>
      </Container>
    </PageShell>
  );
}
