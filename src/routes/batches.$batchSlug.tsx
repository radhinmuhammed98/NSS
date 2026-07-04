import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import type { ImpactMetric, Batch, Project, Camp, Highlight, GalleryAlbum, VideoClip, Report, VolunteerStory, TeamMember } from "@/types";
import { PageShell, Container } from "@/components/layout";
import { ClayCard, Badge, Reveal, ImpactStat } from "@/components/clay";
import { MediaThumb, AlbumCard, CampCard, HighlightCard, ProjectCard, StoryCard } from "@/components/media";

import {
  formatDate,
  getAlbumsByBatch,
  getBatchBySlug,
  getCampsByBatch,
  getHighlightsByBatch,
  getProjectsByBatch,
  getReportsByBatch,
  getStoriesByBatch,
  getTeamByBatch,
  getVideosByBatch,
} from "@/lib/data";

export const Route = createFileRoute("/batches/$batchSlug")({
  loader: async ({ params }: { params: { batchSlug: string } }) => {
    const batch = await getBatchBySlug(params.batchSlug);
    if (!batch) throw notFound();
    
    // Query related collections concurrently
    const [
      projects,
      camps,
      highlights,
      albums,
      videos,
      reports,
      stories,
      team,
    ] = await Promise.all([
      getProjectsByBatch(params.batchSlug),
      getCampsByBatch(params.batchSlug),
      getHighlightsByBatch(params.batchSlug),
      getAlbumsByBatch(params.batchSlug),
      getVideosByBatch(params.batchSlug),
      getReportsByBatch(params.batchSlug),
      getStoriesByBatch(params.batchSlug),
      getTeamByBatch(params.batchSlug),
    ]);

    return {
      batch,
      projects,
      camps,
      highlights,
      albums,
      videos,
      reports,
      stories,
      team,
    };
  },

  notFoundComponent: () => (
    <PageShell>
      <Container className="nss-py-20 nss-text-center">
        <h1 className="nss-font-display nss-text-3xl nss-font-extrabold">Batch not found</h1>
        <Link to="/batches" style={{ display: "inline-block", marginTop: "1rem", color: "var(--primary)" }}>← Back to batches</Link>
      </Container>
    </PageShell>
  ),
  component: BatchPage,
});

function BatchPage() {
  const {
    batch,
    projects,
    camps,
    highlights,
    albums,
    videos,
    reports,
    stories,
    team,
  } = Route.useLoaderData() as {
    batch: Batch;
    projects: Project[];
    camps: Camp[];
    highlights: Highlight[];
    albums: GalleryAlbum[];
    videos: VideoClip[];
    reports: Report[];
    stories: VolunteerStory[];
    team: TeamMember[];
  };

  const activeTabs = [
    "Overview",
    ...(batch.impactMetrics?.length > 0 ? ["Impact"] : []),
    ...(projects.length > 0 ? ["Projects"] : []),
    ...(camps.length > 0 ? ["Camps"] : []),
    ...(highlights.length > 0 ? ["Highlights"] : []),
    ...(albums.length > 0 ? ["Gallery"] : []),
    ...(videos.length > 0 ? ["Videos"] : []),
    ...(reports.length > 0 ? ["Reports"] : []),
    ...(stories.length > 0 ? ["Stories"] : []),
    ...(team.length > 0 ? ["Team"] : []),
  ];

  const [tab, setTab] = useState("Overview");
  const currentTab = activeTabs.includes(tab) ? tab : activeTabs[0];

  return (
    <PageShell>
      {/* Hero */}
      <section className="nss-px-3 nss-pt-4">
        <Container className="nss-px-0">
          <Reveal>
            <div className="nss-card nss-p-0" style={{ overflow: "hidden" }}>
              <div style={{ position: "relative" }}>
                <img
                  src={batch.coverImage}
                  alt={batch.title}
                  width={1280}
                  height={549}
                  fetchPriority="high"
                  decoding="async"
                  style={{ aspectRatio: "21/9", width: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(27, 28, 25, 0.7) 0%, transparent 100%)" }} />
                <div style={{ position: "absolute", bottom: 0, padding: "1.5rem", color: "#ffffff" }}>
                  <Badge variant="accent">{batch.yearRange}</Badge>
                  <h1 className="nss-mt-2 nss-font-display nss-text-3xl nss-font-extrabold nss-text-balance nss-sm-text-4xl" style={{ color: "#ffffff" }}>
                    {batch.title}
                  </h1>
                  <p className="nss-mt-1 nss-text-sm" style={{ opacity: 0.9 }}>
                    PO: {batch.programmeOfficer} · Secretary: {batch.volunteerSecretary}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Tabs */}
      <Container className="nss-py-6">
        {activeTabs.length > 1 && (
          <div className="nss-card nss-p-2 nss-flex nss-gap-1" style={{ overflowX: "auto", minHeight: "3.5rem" }}>
            {activeTabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className="cursor-pointer transition-all"
                style={{
                  borderRadius: "var(--radius-md)",
                  padding: "0.5rem 1rem",
                  fontSize: "14px",
                  fontWeight: 600,
                  backgroundColor: currentTab === t ? "var(--primary)" : "transparent",
                  color: currentTab === t ? "var(--primary-foreground)" : "var(--muted-foreground)"
                }}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        <div className="nss-mt-8">
          {currentTab === "Overview" && (
            <ClayCard tilt={false} className="nss-p-4 nss-sm-p-6">
              <h2 className="nss-font-display nss-text-xl nss-font-bold">Batch Overview</h2>
              <p className="nss-mt-3 nss-text-muted">{batch.description}</p>
              <p className="nss-mt-4 nss-text-sm">
                <span className="nss-font-semibold">Theme:</span> {batch.theme}
              </p>
              <p className="nss-mt-1 nss-text-sm">
                <span className="nss-font-semibold">Volunteers:</span> {batch.volunteerCount}
              </p>
              <div className="nss-mt-4">
                <p className="nss-text-sm nss-font-semibold">Volunteer leaders</p>
                <div className="nss-mt-2 nss-flex nss-flex-wrap nss-gap-2">
                  {batch.leaders.map((l: string) => (
                    <Badge key={l}>{l}</Badge>
                  ))}
                </div>
              </div>
            </ClayCard>
          )}

          {currentTab === "Impact" && (
            <div className="nss-grid nss-grid-cols-2 nss-gap-4 nss-sm-grid-cols-4">
              {batch.impactMetrics.map((m: ImpactMetric) => (
                <ImpactStat key={m.label} label={m.label} value={m.value} />
              ))}
            </div>
          )}

          {currentTab === "Projects" && (
            <div className="nss-grid nss-gap-5 nss-sm-grid-cols-2 lg-grid-cols-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          )}

          {currentTab === "Camps" && (
            <div className="nss-grid nss-gap-5 nss-sm-grid-cols-2">
              {camps.map((c) => (
                <CampCard key={c.slug} camp={c} />
              ))}
            </div>
          )}

          {currentTab === "Highlights" && (
            <div className="nss-grid nss-gap-5 nss-sm-grid-cols-2 lg-grid-cols-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
              {highlights.map((h) => (
                <HighlightCard key={h.slug} highlight={h} />
              ))}
            </div>
          )}

          {currentTab === "Gallery" && (
            <div className="nss-grid nss-gap-5 nss-sm-grid-cols-2 lg-grid-cols-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
              {albums.map((a) => (
                <AlbumCard key={a.slug} album={a} />
              ))}
            </div>
          )}

          {currentTab === "Videos" && (
            <div className="nss-grid nss-gap-5 nss-sm-grid-cols-2">
              {videos.map((v) => (
                <MediaThumb key={v.slug} video={v} />
              ))}
            </div>
          )}

          {currentTab === "Reports" && (
            <div className="nss-grid nss-gap-4 nss-sm-grid-cols-2 lg-grid-cols-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
              {reports.map((r) => (
                <ClayCard key={r.slug} className="nss-p-4 nss-sm-p-6">
                  <Badge variant="outline">{r.type}</Badge>
                  <h3 className="nss-mt-3 nss-font-display nss-font-bold">{r.title}</h3>
                  <p className="nss-mt-2 nss-text-sm nss-text-muted">{r.description}</p>
                  <p className="nss-mt-3 nss-text-xs nss-text-muted">{formatDate(r.date)}</p>
                </ClayCard>
              ))}
            </div>
          )}

          {currentTab === "Stories" && (
            <div className="nss-grid nss-gap-5 nss-sm-grid-cols-2">
              {stories.map((st) => (
                <StoryCard key={st.slug} story={st} />
              ))}
            </div>
          )}

          {currentTab === "Team" && (
            <div className="nss-grid nss-gap-5 nss-sm-grid-cols-2 lg-grid-cols-4">
              {team.map((m) => (
                <ClayCard key={m.slug} className="nss-text-center nss-p-4">
                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={m.name}
                      loading="lazy" decoding="async"
                      style={{ margin: "0 auto", height: "5rem", width: "5rem", borderRadius: "50%", objectFit: "cover" }}
                    />
                  ) : (
                    <div style={{ margin: "0 auto", height: "5rem", width: "5rem", borderRadius: "50%", backgroundColor: "rgba(27, 58, 63, 0.05)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--primary)", border: "1px solid rgba(27, 58, 63, 0.1)" }}>
                      <span className="material-symbols-outlined" style={{ fontSize: "2rem" }} aria-hidden>account_circle</span>
                    </div>
                  )}
                  <h3 className="nss-mt-3 nss-font-display nss-font-bold">{m.name}</h3>
                  <p className="nss-text-xs nss-text-accent">{m.role}</p>
                  <p className="nss-mt-2 nss-text-xs nss-text-muted">{m.bio}</p>
                </ClayCard>
              ))}
            </div>
          )}
        </div>
      </Container>
    </PageShell>
  );
}
