import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import type { ImpactMetric, Batch, Project, Camp, Highlight, GalleryAlbum, VideoClip, Report, VolunteerStory, TeamMember } from "@/types";
import { PageShell, Container } from "@/components/layout";
import { ClayCard, Badge, Reveal, ImpactStat, EmptyState } from "@/components/clay";
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
      <Container className="py-20 text-center">
        <h1 className="font-display text-3xl font-extrabold">Batch not found</h1>
        <Link to="/batches" className="mt-4 inline-block text-primary">← Back to batches</Link>
      </Container>
    </PageShell>
  ),
  component: BatchPage,
});

const TABS = [
  "Overview",
  "Impact",
  "Projects",
  "Camps",
  "Highlights",
  "Gallery",
  "Videos",
  "Reports",
  "Stories",
  "Team",
] as const;

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
      <section className="px-3 pt-4">
        <Container className="px-0">
          <Reveal>
            <div className="clay overflow-hidden p-0">
              <div className="relative">
                <img
                  src={batch.coverImage}
                  alt={batch.title}
                  width={1280}
                  height={549}
                  fetchPriority="high"
                  decoding="async"
                  className="aspect-[21/9] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                <div className="absolute bottom-0 p-6 text-background sm:p-8">
                  <Badge variant="accent">{batch.yearRange}</Badge>
                  <h1 className="mt-2 font-display text-3xl font-extrabold text-balance sm:text-4xl">
                    {batch.title}
                  </h1>
                  <p className="mt-1 text-sm opacity-90">
                    PO: {batch.programmeOfficer} · Secretary: {batch.volunteerSecretary}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Tabs */}
      <Container className="py-6">
        {activeTabs.length > 1 && (
          <div className="clay-sm flex gap-1 overflow-x-auto p-2">
            {activeTabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-all cursor-pointer ${
                  currentTab === t
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        <div className="mt-8">
          {currentTab === "Overview" && (
            <ClayCard tilt={false}>
              <h2 className="font-display text-xl font-bold">Batch Overview</h2>
              <p className="mt-3 text-muted-foreground">{batch.description}</p>
              <p className="mt-4 text-sm">
                <span className="font-semibold">Theme:</span> {batch.theme}
              </p>
              <p className="mt-1 text-sm">
                <span className="font-semibold">Volunteers:</span> {batch.volunteerCount}
              </p>
              <div className="mt-4">
                <p className="text-sm font-semibold">Volunteer leaders</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {batch.leaders.map((l: string) => (
                    <Badge key={l}>{l}</Badge>
                  ))}
                </div>
              </div>
            </ClayCard>
          )}

          {currentTab === "Impact" && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {batch.impactMetrics.map((m: ImpactMetric) => (
                <ImpactStat key={m.label} label={m.label} value={m.value} />
              ))}
            </div>
          )}

          {currentTab === "Projects" && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          )}

          {currentTab === "Camps" && (
            <div className="grid gap-5 sm:grid-cols-2">
              {camps.map((c) => (
                <CampCard key={c.slug} camp={c} />
              ))}
            </div>
          )}

          {currentTab === "Highlights" && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((h) => (
                <HighlightCard key={h.slug} highlight={h} />
              ))}
            </div>
          )}

          {currentTab === "Gallery" && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {albums.map((a) => (
                <AlbumCard key={a.slug} album={a} />
              ))}
            </div>
          )}

          {currentTab === "Videos" && (
            <div className="grid gap-5 sm:grid-cols-2">
              {videos.map((v) => (
                <MediaThumb key={v.slug} video={v} />
              ))}
            </div>
          )}

          {currentTab === "Reports" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reports.map((r) => (
                <ClayCard key={r.slug}>
                  <Badge variant="outline">{r.type}</Badge>
                  <h3 className="mt-3 font-display font-bold">{r.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.description}</p>
                  <p className="mt-3 text-xs text-muted-foreground">{formatDate(r.date)}</p>
                </ClayCard>
              ))}
            </div>
          )}

          {currentTab === "Stories" && (
            <div className="grid gap-5 sm:grid-cols-2">
              {stories.map((st) => (
                <StoryCard key={st.slug} story={st} />
              ))}
            </div>
          )}

          {currentTab === "Team" && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((m) => (
                <ClayCard key={m.slug} className="text-center">
                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={m.name}
                      loading="lazy" decoding="async"
                      className="mx-auto h-20 w-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="mx-auto h-20 w-20 rounded-full bg-[#1b3a27]/5 flex flex-col items-center justify-center text-[#1b3a27] border border-[#1b3a27]/10">
                      <span className="material-symbols-outlined text-2xl" aria-hidden>account_circle</span>
                    </div>
                  )}
                  <h3 className="mt-3 font-display font-bold">{m.name}</h3>
                  <p className="text-xs text-accent">{m.role}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{m.bio}</p>
                </ClayCard>
              ))}
            </div>
          )}
        </div>
      </Container>
    </PageShell>
  );
}
