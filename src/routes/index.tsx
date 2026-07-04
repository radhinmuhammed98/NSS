import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { PageShell, Container } from "@/components/layout";
import {
  SectionHeading,
  ClayButton,
  ClayCard,
  Badge,
  ImpactStat,
  Reveal,
} from "@/components/clay";
import {
  MediaThumb,
  AlbumCard,
  CampCard,
  ProjectCard,
  StoryCard,
} from "@/components/media";
import {
  formatDate,
  getAlbums,
  getBatches,
  getCurrentBatch,
  getFeaturedCamp,
  getFeaturedHighlight,
  getFeaturedProjects,
  getFeaturedStories,
  getFeaturedVideos,
  getReports,
  getSiteSettings,
} from "@/lib/data";
import type {
  SiteSettings,
  Batch,
  Highlight,
  Project,
  Camp,
  GalleryAlbum,
  VideoClip,
  Report,
  VolunteerStory,
} from "@/types";

// ─── Route ────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/")(
  {
    loader: async () => {
      const s         = await getSiteSettings();
      const batch     = await getCurrentBatch();
      const batches   = await getBatches();
      const highlight = await getFeaturedHighlight();
      const projects  = await getFeaturedProjects(3);
      const camp      = await getFeaturedCamp();
      const allAlbums = await getAlbums();
      const albums    = allAlbums.slice(0, 3);
      const videos    = await getFeaturedVideos(2);
      const allReports = await getReports();
      const reports   = allReports.slice(0, 3);
      const stories   = await getFeaturedStories(2);
      return { s, batch, batches, highlight, projects, camp, albums, videos, reports, stories };
    },
    component: Home,
  }
);

// ─── Page Component ───────────────────────────────────────────────────────────

function Home() {
  const {
    s,
    batch,
    batches,
    highlight,
    projects,
    camp,
    albums,
    videos,
    reports,
    stories,
  } = Route.useLoaderData() as {
    s:         SiteSettings;
    batch:     Batch;
    batches:   Batch[];
    highlight: Highlight;
    projects:  Project[];
    camp:      Camp;
    albums:    GalleryAlbum[];
    videos:    VideoClip[];
    reports:   Report[];
    stories:   VolunteerStory[];
  };

  return (
    <PageShell>
      <Container className="flex flex-col gap-y-10 py-6 sm:gap-y-12 sm:py-10 lg:gap-y-14 lg:py-12">

        {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 items-center gap-6 rounded-lg border border-border/60 bg-surface-elevated p-4 shadow-[0_18px_44px_rgba(27,58,39,0.08)] sm:p-6 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-8 lg:p-8">

          {/* Text column */}
          <div className="flex min-w-0 flex-col lg:pr-2">
            <div>
              <Badge variant="accent">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                KHMHSS Valakkulam · Unit 466 · {s.academicYear}
              </Badge>
            </div>

            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[0.95] tracking-normal break-words text-balance sm:text-5xl lg:text-[3.55rem]" style={{ fontFamily: "'Libre Caslon Text', serif" }}>
              KHMHSS Valakkulam
            </h1>
            <p className="mt-3 text-xl font-bold leading-tight text-primary sm:text-2xl">
              National Service Scheme · Unit 466
            </p>

            <p 
              className="mt-5 max-w-xl text-2xl font-bold leading-snug text-accent sm:text-[1.7rem]"
              style={{ fontFamily: "'Noto Sans Malayalam', sans-serif" }}
            >
              "നമുക്കല്ല, സമൂഹത്തിനായി."
            </p>

            {/* Bilingual motto */}
            <div className="mt-5 border-l-4 border-accent pl-4">
              <p className="font-display text-base font-semibold italic text-foreground">
                &ldquo;Not Me, But You&rdquo;
              </p>
              <p
                className="mt-1 text-sm text-muted-foreground"
                style={{ fontFamily: "'Noto Sans Malayalam', sans-serif" }}
              >
                മനസ്സ് നന്നാവട്ടെ
              </p>
            </div>

            {/* CTA buttons */}
            <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <ClayButton to="/camps" variant="primary" className="w-full sm:w-auto justify-center">
                Special Camp <ArrowRight className="h-4 w-4" />
              </ClayButton>
              <ClayButton to="/projects" variant="soft" className="w-full sm:w-auto justify-center">
                Our Initiatives
              </ClayButton>
            </div>
          </div>

          {/* Media column */}
          <div className="grid min-w-0 gap-3">
            <div className="overflow-hidden rounded-lg border border-border/60 bg-background p-0 shadow-sm">
              <img
                src="/gate.png"
                alt="KHMHSS Valakkulam School Gate"
                width={1280}
                height={960}
                fetchPriority="high"
                decoding="async"
                className="aspect-[4/3] w-full object-cover sm:aspect-[16/10] lg:aspect-[4/3]"
              />
            </div>
            {/* Volunteer count badge */}
            <div
              className="grid min-h-20 w-full min-w-0 grid-cols-[auto_1fr] items-center gap-4 rounded-lg px-5 py-4"
              style={{
                background: "#042413",
                color: "#ffffff",
                boxShadow:
                  "0 12px 28px rgba(27,58,39,0.14), 0 1px 0 rgba(255,255,255,0.55)",
              }}
            >
              <p className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 font-display text-2xl font-bold leading-none">50</p>
              <p className="text-sm font-semibold uppercase leading-tight text-white/85">NSS Volunteers</p>
            </div>
          </div>
        </section>

        {/* ── 2. Active Batch + Impact Metrics ────────────────────────────── */}
        {batch?.impactMetrics?.length > 0 && (
          <section className="flex flex-col gap-4">
            <Reveal>
              <ClayCard tilt={false} className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)] lg:items-center">
                <div>
                  <Badge>Current Batch</Badge>
                  <h2 className="mt-2 font-display text-2xl font-extrabold leading-tight break-words">
                    {batch.yearRange} · {batch.title}
                  </h2>
                  {(batch.programmeOfficer?.trim() || batch.volunteerSecretary?.trim()) && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {batch.programmeOfficer && `Programme Officer: ${batch.programmeOfficer}`}
                      {batch.programmeOfficer && batch.volunteerSecretary && " · "}
                      {batch.volunteerSecretary && `Secretary: ${batch.volunteerSecretary}`}
                    </p>
                  )}
                </div>
                <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
                  {batch.impactMetrics.map((m) => (
                    <div key={m.label} className="min-w-0">
                      <ImpactStat label={m.label} value={m.value} />
                    </div>
                  ))}
                </div>
              </ClayCard>
            </Reveal>
          </section>
        )}

        {/* ── 3. Featured Highlight ────────────────────────────────────────── */}
        {highlight && (
          <section className="flex flex-col gap-4">
            <Reveal>
              <div className="clay grid min-w-0 overflow-hidden p-0 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                {highlight.image && (
                  <img
                    src={highlight.image}
                    alt={highlight.title}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/9] h-full w-full object-cover"
                  />
                )}
                <div className="flex min-w-0 flex-col justify-center p-5 sm:p-6 lg:p-8">
                  <Badge variant="accent" className="self-start">★ Featured Highlight</Badge>
                  <h2 className="mt-3 font-display text-2xl font-extrabold text-balance sm:text-3xl">
                    {highlight.title}
                  </h2>
                  <p className="mt-3 text-muted-foreground">{highlight.description}</p>
                  <div className="mt-6">
                    <ClayButton to="/highlights" variant="soft">
                      See all highlights <ArrowRight className="h-4 w-4" />
                    </ClayButton>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>
        )}

        {/* ── 4. Latest Projects ──────────────────────────────────────────── */}
        {projects?.length > 0 && (
          <section className="flex flex-col gap-4">
            <SectionHeading
              eyebrow="Recent Work"
              title="Latest Projects"
              description="A glimpse of the campaigns making a difference this year."
              action={
                <ClayButton to="/projects" variant="soft">
                  All projects <ArrowRight className="h-4 w-4" />
                </ClayButton>
              }
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ── 5. Camp Spotlight ────────────────────────────────────────────── */}
        {camp && (
          <section className="flex flex-col gap-4">
            <SectionHeading eyebrow="Camp Spotlight" title="Special Camp" />
            <Reveal>
              <CampCard camp={camp} />
            </Reveal>
          </section>
        )}

        {/* ── 6. Batch Legacy Preview ──────────────────────────────────────── */}
        {batches?.length > 1 && (
          <section className="flex flex-col gap-4">
            <SectionHeading
              eyebrow="The Journey"
              title="Batch-wise Legacy"
              description="Every batch leaves a chapter behind. Explore them all."
              action={
                <ClayButton to="/batches" variant="soft">
                  All batches <ArrowRight className="h-4 w-4" />
                </ClayButton>
              }
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Reveal>
                <Link to="/journey">
                  <ClayCard className="h-full p-4 sm:p-5">
                    <Badge variant="accent">Timeline</Badge>
                    <h3 className="mt-3 font-display text-xl font-bold">NSS Journey Timeline</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      From the unit's founding to today — every milestone preserved.
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Walk the journey <ArrowRight className="h-4 w-4" />
                    </span>
                  </ClayCard>
                </Link>
              </Reveal>
              <Reveal delay={0.1}>
                <Link to="/team">
                  <ClayCard className="h-full p-4 sm:p-5">
                    <Badge variant="accent">People</Badge>
                    <h3 className="mt-3 font-display text-xl font-bold">Team &amp; Volunteers</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Meet the officers and volunteers behind every campaign.
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Meet the team <ArrowRight className="h-4 w-4" />
                    </span>
                  </ClayCard>
                </Link>
              </Reveal>
            </div>
          </section>
        )}

        {/* ── 7. Gallery & Videos Preview ─────────────────────────────────── */}
        {(albums?.length > 0 || videos?.length > 0) && (
          <section className="flex flex-col gap-8">
            {albums?.length > 0 && (
              <div className="flex min-w-0 flex-col gap-4">
                <SectionHeading
                  eyebrow="Media"
                  title="Gallery & Video Clips"
                  description="Explore our visual record of service."
                />
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-display text-lg font-bold leading-tight text-foreground">Recent Photo Albums</h3>
                  <ClayButton to="/gallery" variant="soft">
                    All Albums <ArrowRight className="h-4 w-4" />
                  </ClayButton>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {albums.map((a, i) => (
                    <Reveal key={a.slug} delay={i * 0.06}>
                      <AlbumCard album={a} />
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            {videos?.length > 0 && (
              <div className="flex min-w-0 flex-col gap-4">
                {!albums?.length && (
                  <SectionHeading
                    eyebrow="Media"
                    title="Featured Video Clips"
                    description="Explore our visual record of service."
                  />
                )}
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-display text-lg font-bold leading-tight text-foreground">Featured Clips</h3>
                  <ClayButton to="/videos" variant="soft">
                    All Videos <ArrowRight className="h-4 w-4" />
                  </ClayButton>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {videos.map((v, i) => (
                    <Reveal key={v.slug} delay={i * 0.08}>
                      <MediaThumb video={v} />
                    </Reveal>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* ── 8. Reports Preview ──────────────────────────────────────────── */}
        {reports?.length > 0 && (
          <section className="flex flex-col gap-4">
            <SectionHeading
              eyebrow="Documents"
              title="Reports & Records"
              action={
                <ClayButton to="/reports" variant="soft">
                  All reports <ArrowRight className="h-4 w-4" />
                </ClayButton>
              }
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {reports.map((r, i) => (
                <Reveal key={r.slug} delay={i * 0.06}>
                  <ClayCard className="h-full p-4 sm:p-5">
                    <Badge variant="outline">{r.type}</Badge>
                    <h3 className="mt-3 font-display font-bold">{r.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{r.description}</p>
                    <p className="mt-3 text-xs text-muted-foreground">{formatDate(r.date)}</p>
                  </ClayCard>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ── 9. Volunteer Stories ─────────────────────────────────────────── */}
        {stories?.length > 0 && (
          <section className="flex flex-col gap-4">
            <SectionHeading
              eyebrow="In Their Words"
              title="Volunteer Stories"
              action={
                <ClayButton to="/stories" variant="soft">
                  All stories <ArrowRight className="h-4 w-4" />
                </ClayButton>
              }
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {stories.map((st, i) => (
                <Reveal key={st.slug} delay={i * 0.08}>
                  <StoryCard story={st} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ── 10. Three Pillars ────────────────────────────────────────────── */}
        <section className="flex flex-col gap-4">
          <SectionHeading
            eyebrow="What We Do"
            title="Three Pillars of Service"
            description="Every act of volunteering falls under one of three principles that define who we are."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[
              {
                ml:    "സമൂഹം",
                en:    "Community",
                desc:  "Helping those around us — palliative care, blood donation, anti-drug campaigns, and reaching the unreached.",
                color: "text-primary",
              },
              {
                ml:    "പ്രകൃതി",
                en:    "Environment",
                desc:  "Nurturing the earth through tree plantations, plastic-free drives, Haritha Bhavanam, and river campaigns.",
                color: "text-accent",
              },
              {
                ml:    "ശാക്തീകരണം",
                en:    "Empowerment",
                desc:  "Building tomorrow's leaders through campus life, awareness drives, and 120 hours of purposeful service.",
                color: "text-primary",
              },
            ].map((pillar, i) => (
              <Reveal key={pillar.en} delay={i * 0.1}>
                <div className="clay flex h-full min-w-0 flex-col gap-3 p-5 sm:p-6">
                  <p
                    className={`font-display text-2xl font-bold ${pillar.color}`}
                    style={{ fontFamily: "'Noto Sans Malayalam', sans-serif" }}
                  >
                    {pillar.ml}
                  </p>
                  <h3 className="font-sans text-base font-bold text-foreground">{pillar.en}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── 11. Reach Out CTA ────────────────────────────────────────────── */}
        <section className="flex flex-col gap-4">
          <div
            className="flex min-w-0 flex-col items-center gap-4 overflow-hidden rounded-lg p-6 text-center sm:p-8 lg:p-10"
            style={{ background: "#042413", color: "#ffffff" }}
          >
            <p
              className="font-display text-2xl font-bold italic"
              style={{ fontFamily: "'Noto Sans Malayalam', sans-serif" }}
            >
              ജീവിക്കുന്ന ഒരിടം
            </p>
            <h2 className="font-display text-2xl font-extrabold leading-tight text-balance sm:text-3xl">
              Be Part of the Living Canvas
            </h2>
            <p className="max-w-md text-sm leading-relaxed opacity-90">
              Want to join, collaborate, or learn more about our unit's work?
              Every student can be a thread in this tapestry.
            </p>
            <ClayButton to="/contact" variant="soft">
              Reach the NSS Unit · khmhsvalakulam@gmail.com <ArrowRight className="h-4 w-4" />
            </ClayButton>
          </div>
        </section>

      </Container>
    </PageShell>
  );
}
