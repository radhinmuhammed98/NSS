import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, ExternalLink, FileText, HandHeart, Images, MapPin, PlayCircle, Target, Users } from "lucide-react";
import { PageShell, Container } from "@/components/layout";
import { Badge, ClayCard, ImpactStat, Reveal, SectionHeading } from "@/components/clay";
import { HighlightCard, ImageLightbox, VideoLightbox } from "@/components/media";
import { usePageMeta } from "@/hooks/usePageMeta";

import { formatDate, getCampBySlug, getHighlightsBySlugs, getProjectBySlug, getReportsBySlugs } from "@/lib/data";
import type { Camp, Highlight, ImageAsset, ImpactMetric, Project, Report } from "@/types";

export const Route = createFileRoute("/projects/$projectSlug")({
  loader: async ({ params }: { params: { projectSlug: string } }) => {
    const project = await getProjectBySlug(params.projectSlug);
    if (!project) throw notFound();

    const [relatedCamp, reports, highlights] = await Promise.all([
      project.relatedCampSlug ? getCampBySlug(project.relatedCampSlug) : Promise.resolve(null),
      getReportsBySlugs(project.reportSlugs ?? []),
      getHighlightsBySlugs(project.highlightSlugs ?? []),
    ]);

    return { project, relatedCamp, reports, highlights };
  },

  notFoundComponent: () => (
    <PageShell>
      <Container className="nss-py-20 nss-text-center">
        <h1 className="nss-font-display nss-text-3xl nss-font-extrabold">Project not found</h1>
        <Link to="/projects" style={{ display: "inline-block", marginTop: "1rem", color: "var(--primary)" }}>
          Back to projects
        </Link>
      </Container>
    </PageShell>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { project, relatedCamp, reports, highlights } = Route.useLoaderData() as {
    project: Project;
    relatedCamp: Camp | null;
    reports: Report[];
    highlights: Highlight[];
  };

  usePageMeta({
    title: project.title,
    description: project.summary || textFromRichContent(project.description),
  });

  const [activeImage, setActiveImage] = useState<ImageAsset | null>(null);
  const [activeVideo, setActiveVideo] = useState<any | null>(null);
  const galleryImages = project.images?.filter((image) => image.src).slice(0, 6) ?? [];
  const organizers = project.organizers?.filter(Boolean) ?? [];

  return (
    <PageShell>
      <Container className="nss-py-8">
        <Link to="/projects" className="nss-button nss-button-soft" style={{ marginBottom: "1.25rem" }}>
          <ArrowLeft style={{ height: "1rem", width: "1rem" }} /> Projects
        </Link>

        <Reveal>
          <ClayCard tilt={false} className="nss-p-0" style={{ overflow: "hidden" }}>
            <div style={{ position: "relative", minHeight: "22rem" }}>
              {project.coverImage ? (
                <img
                  src={project.coverImage}
                  alt={project.title}
                  width={1280}
                  height={720}
                  fetchPriority="high"
                  decoding="async"
                  style={{ height: "100%", minHeight: "22rem", width: "100%", objectFit: "cover" }}
                />
              ) : (
                <div style={{ minHeight: "22rem", background: "var(--clay-deep)" }} />
              )}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, rgba(0,0,0,0.72), rgba(0,0,0,0.28) 58%, rgba(0,0,0,0.08))",
                }}
              />
              <div
                className="nss-flex nss-flex-col nss-justify-between nss-gap-8 nss-p-5 nss-sm-p-8"
                style={{ position: "absolute", inset: 0, color: "#fff", maxWidth: "48rem" }}
              >
                <div className="nss-flex nss-flex-wrap nss-gap-2">
                  <Badge variant="accent">{project.category}</Badge>
                  <Badge variant="outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.55)" }}>
                    {project.status}
                  </Badge>
                  {project.featured && <Badge variant="accent">Featured</Badge>}
                </div>
                <div>
                  <h1 className="nss-font-display nss-text-4xl nss-font-extrabold nss-text-balance nss-sm-text-5xl" style={{ color: "#fff" }}>
                    {project.title}
                  </h1>
                  <p className="nss-mt-4 nss-text-base nss-leading-relaxed" style={{ color: "rgba(255,255,255,0.86)", maxWidth: "42rem" }}>
                    {project.summary}
                  </p>
                  <div className="nss-mt-5 nss-flex nss-flex-wrap nss-gap-4 nss-text-sm" style={{ color: "rgba(255,255,255,0.82)" }}>
                    <span className="nss-flex nss-items-center nss-gap-1"><MapPin style={{ height: "1rem", width: "1rem" }} /> {project.location}</span>
                    <span className="nss-flex nss-items-center nss-gap-1"><Calendar style={{ height: "1rem", width: "1rem" }} /> {formatDate(project.date)}</span>
                    <span className="nss-flex nss-items-center nss-gap-1"><Users style={{ height: "1rem", width: "1rem" }} /> {project.year}</span>
                  </div>
                </div>
              </div>
            </div>
          </ClayCard>
        </Reveal>

        <div className="nss-mt-6 nss-grid nss-gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22rem), 1fr))" }}>
          <div className="nss-flex nss-flex-col nss-gap-5" style={{ minWidth: 0 }}>
            <InfoCard icon={FileText} title="Overview">
              <p className="nss-text-muted">{textFromRichContent(project.description)}</p>
            </InfoCard>

            {project.problemAddressed && (
              <InfoCard icon={Target} title="Problem addressed">
                <p className="nss-text-muted">{project.problemAddressed}</p>
              </InfoCard>
            )}

            {project.whatNssDid && (
              <InfoCard icon={HandHeart} title="What NSS did">
                <p className="nss-text-muted">{project.whatNssDid}</p>
              </InfoCard>
            )}
          </div>

          <aside className="nss-flex nss-flex-col nss-gap-5">
            <ClayCard tilt={false} className="nss-p-5">
              <h2 className="nss-font-display nss-text-xl nss-font-bold">Project details</h2>
              <DetailRow label="Category" value={project.category} />
              <DetailRow label="Location" value={project.location} />
              <DetailRow label="Date" value={formatDate(project.date)} />
              <DetailRow label="Batch" value={project.batchSlug?.replace("batch-", "")} />
              {organizers.length > 0 && (
                <div className="nss-mt-4">
                  <p className="nss-text-xs nss-font-bold nss-uppercase nss-text-muted">Organizers</p>
                  <div className="nss-mt-2 nss-flex nss-flex-wrap nss-gap-2">
                    {organizers.map((name) => <Badge key={name} variant="outline">{name}</Badge>)}
                  </div>
                </div>
              )}
            </ClayCard>

            {relatedCamp?.slug && (
              <ClayCard tilt={false} className="nss-p-5">
                <Badge variant="accent">Linked Camp</Badge>
                <h3 className="nss-mt-3 nss-font-display nss-text-xl nss-font-bold">{relatedCamp.title}</h3>
                <p className="nss-mt-2 nss-text-sm nss-text-muted">{relatedCamp.summary}</p>
                <Link to="/camps/$campSlug" params={{ campSlug: relatedCamp.slug }} className="nss-mt-4 nss-flex nss-items-center nss-gap-1 nss-text-sm nss-font-semibold nss-text-primary">
                  View camp <ExternalLink style={{ height: "0.9rem", width: "0.9rem" }} />
                </Link>
              </ClayCard>
            )}
          </aside>
        </div>

        {project.impactMetrics?.length > 0 && (
          <div className="nss-mt-8 nss-grid nss-grid-cols-2 nss-gap-4 nss-sm-grid-cols-4">
            {project.impactMetrics.map((metric: ImpactMetric) => (
              <ImpactStat key={metric.label} label={metric.label} value={metric.value} />
            ))}
          </div>
        )}

        {galleryImages.length > 0 && (
          <section className="nss-mt-10">
            <SectionHeading eyebrow="Gallery" title="Project photos" description="A quick visual record from this activity." />
            <div className="nss-columns-1 nss-sm-columns-2 nss-lg-columns-3">
              {galleryImages.map((image, index) => (
                <div key={image.id} className="nss-break-inside-avoid nss-mb-4">
                  <Reveal delay={index * 0.04}>
                    <img src={image.src} alt={image.alt} loading="lazy" decoding="async" onClick={() => setActiveImage(image)} className="nss-card nss-p-0 nss-card-tilt nss-w-full" style={{ height: "auto", objectFit: "contain", cursor: "zoom-in" }} />
                  </Reveal>
                </div>
              ))}
            </div>
          </section>
        )}

        {project.videos && project.videos.length > 0 && (
          <section className="nss-mt-10">
            <SectionHeading eyebrow="Media" title="Project videos" description="Watch moments from this activity." />
            <div className="nss-columns-1 nss-sm-columns-2 nss-lg-columns-3">
              {project.videos.map((video, index) => (
                <div key={video.slug} className="nss-break-inside-avoid nss-mb-4">
                  <Reveal delay={index * 0.04}>
                    <figure className="nss-card nss-p-0 nss-flex nss-flex-col" style={{ overflow: "hidden" }}>
                      <div style={{ position: "relative" }}>
                        {video.thumbnail ? (
                          <img src={video.thumbnail} alt={video.title} style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }} />
                        ) : (
                          <div style={{ width: "100%", aspectRatio: "16/9", background: "var(--clay-deep)" }} />
                        )}
                        <button type="button" onClick={() => setActiveVideo(video)} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.3)" }} className="nss-transition-opacity hover:nss-opacity-100" aria-label={`Play ${video.title}`}>
                           <PlayCircle style={{ height: "3rem", width: "3rem", color: "#fff", opacity: 0.9 }} />
                        </button>
                      </div>
                      <div className="nss-p-4">
                        <h3 className="nss-font-bold nss-text-sm nss-line-clamp-1">{video.title}</h3>
                        {video.duration && <p className="nss-mt-1 nss-text-xs nss-text-muted">{video.duration}</p>}
                      </div>
                    </figure>
                  </Reveal>
                </div>
              ))}
            </div>
          </section>
        )}

        {reports.length > 0 && (
          <section className="nss-mt-10">
            <SectionHeading eyebrow="Reports" title="Attached reports" description="Official documents connected to this project." />
            <div className="nss-grid nss-gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))" }}>
              {reports.map((report) => (
                <ClayCard key={report.slug} tilt={false} className="nss-flex nss-flex-col nss-gap-3 nss-p-5">
                  <Badge variant="outline">{report.type}</Badge>
                  <h3 className="nss-font-display nss-text-lg nss-font-bold">{report.title}</h3>
                  <p className="nss-flex-1 nss-text-sm nss-text-muted">{report.description}</p>
                  <a href={report.file} className="nss-flex nss-items-center nss-gap-1 nss-text-sm nss-font-semibold nss-text-primary">
                    Open report <ExternalLink style={{ height: "0.9rem", width: "0.9rem" }} />
                  </a>
                </ClayCard>
              ))}
            </div>
          </section>
        )}

        {highlights.length > 0 && (
          <section className="nss-mt-10">
            <SectionHeading eyebrow="Highlights" title="Related highlights" description="Milestones and stories attached to this project." />
            <div className="nss-grid nss-gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))" }}>
              {highlights.map((highlight) => <HighlightCard key={highlight.slug} highlight={highlight} />)}
            </div>
          </section>
        )}

        {galleryImages.length === 0 && (!project.videos || project.videos.length === 0) && reports.length === 0 && highlights.length === 0 && (
          <ClayCard tilt={false} className="nss-mt-10 nss-flex nss-items-center nss-gap-3 nss-p-5">
            <Images style={{ height: "1.25rem", width: "1.25rem", color: "var(--secondary)" }} aria-hidden />
            <p className="nss-text-sm nss-text-muted">More project media and documents can be attached from the content studio when available.</p>
          </ClayCard>
        )}
      </Container>
      <ImageLightbox image={activeImage} onClose={() => setActiveImage(null)} />
      <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
    </PageShell>
  );
}

function InfoCard({ icon: Icon, title, children }: { icon: typeof FileText; title: string; children: React.ReactNode }) {
  return (
    <ClayCard tilt={false} className="nss-p-5 nss-sm-p-6">
      <div className="nss-flex nss-items-center nss-gap-3">
        <span className="nss-flex nss-items-center nss-justify-center" style={{ height: "2.5rem", width: "2.5rem", borderRadius: "var(--radius-lg)", background: "hsl(15 65% 38% / 0.1)", color: "var(--secondary)" }}>
          <Icon style={{ height: "1.15rem", width: "1.15rem" }} aria-hidden />
        </span>
        <h2 className="nss-font-display nss-text-xl nss-font-bold">{title}</h2>
      </div>
      <div className="nss-mt-4 nss-leading-relaxed">{children}</div>
    </ClayCard>
  );
}

function DetailRow({ label, value }: { label: string; value?: string | number }) {
  if (!value) return null;
  return (
    <div className="nss-mt-4" style={{ borderTop: "1px solid var(--border)", paddingTop: "0.85rem" }}>
      <p className="nss-text-xs nss-font-bold nss-uppercase nss-text-muted">{label}</p>
      <p className="nss-mt-1 nss-text-sm nss-font-semibold">{value}</p>
    </div>
  );
}

function textFromRichContent(value: unknown): string {
  if (!value) return "Details will be updated soon.";
  if (typeof value === "string") return value;
  if (!Array.isArray(value)) return "Details will be updated soon.";

  const text = value
    .map((block) => {
      if (!block || typeof block !== "object") return "";
      const children = (block as { children?: unknown }).children;
      if (!Array.isArray(children)) return "";
      return children
        .map((child) => typeof child === "object" && child && "text" in child ? String((child as { text?: string }).text ?? "") : "")
        .join("");
    })
    .filter(Boolean)
    .join(" ")
    .trim();

  return text || "Details will be updated soon.";
}


