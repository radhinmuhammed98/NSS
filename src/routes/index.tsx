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
  Section,
  ActivityCard,
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
      <Container className="nss-flex nss-flex-col nss-gap-8 nss-py-8">

        {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
        <Section className="nss-grid nss-grid-cols-1 nss-items-center nss-gap-6 nss-card nss-p-4 nss-sm-p-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>

          {/* Text column */}
          <div className="nss-flex nss-flex-col" style={{ minWidth: 0 }}>
            <div>
              <Badge variant="accent">
                <Sparkles style={{ marginRight: "4px", height: "0.875rem", width: "0.875rem" }} />
                KHMHSS Valakkulam · Unit 466 · {s.academicYear}
              </Badge>
            </div>

            <h1 className="nss-mt-4 nss-text-4xl nss-font-extrabold nss-leading-tight nss-break-words nss-text-balance nss-sm-text-5xl" style={{ fontFamily: "var(--font-display)" }}>
              KHMHSS Valakkulam
            </h1>
            <p className="nss-mt-2 nss-text-lg nss-font-bold nss-leading-tight nss-text-primary nss-sm-text-xl">
              National Service Scheme · Unit 466
            </p>

            <p 
              className="nss-mt-4 nss-text-xl nss-font-bold nss-leading-snug nss-text-accent"
              style={{ fontFamily: "'Noto Sans Malayalam', sans-serif" }}
            >
              "നമുക്കല്ല, സമൂഹത്തിനായി."
            </p>

            {/* Bilingual motto */}
            <div className="nss-mt-4" style={{ borderLeft: "4px solid var(--accent)", paddingLeft: "1rem" }}>
              <p className="nss-font-display nss-text-base nss-font-semibold nss-italic">
                &ldquo;Not Me, But You&rdquo;
              </p>
              <p
                className="nss-mt-1 nss-text-sm nss-text-muted"
                style={{ fontFamily: "'Noto Sans Malayalam', sans-serif" }}
              >
                മനസ്സ് നന്നാവട്ടെ
              </p>
            </div>

            {/* CTA buttons */}
            <div className="nss-mt-6 nss-flex nss-flex-col nss-gap-3 nss-sm-flex-row">
              <ClayButton to="/camps" variant="primary" className="nss-justify-center">
                Special Camp <ArrowRight style={{ height: "1rem", width: "1rem" }} />
              </ClayButton>
              <ClayButton to="/projects" variant="soft" className="nss-justify-center">
                Our Initiatives
              </ClayButton>
            </div>
          </div>

          {/* Media column */}
          <div className="nss-grid nss-gap-3" style={{ minWidth: 0 }}>
            <div className="nss-card nss-p-0" style={{ overflow: "hidden" }}>
              <img
                src="/gate.png"
                alt="KHMHSS Valakkulam School Gate"
                width={1280}
                height={960}
                fetchPriority="high"
                decoding="async"
                style={{ aspectRatio: "4/3", width: "100%", objectFit: "cover" }}
              />
            </div>
            {/* Volunteer count badge */}
            <div className="nss-flex nss-items-center nss-gap-4 nss-card nss-p-4 nss-bg-primary nss-text-white" style={{ border: "1px solid var(--primary-container)" }}>
              <p className="nss-flex nss-items-center nss-justify-center nss-font-display nss-text-2xl nss-font-bold nss-leading-none" style={{ height: "3rem", width: "3rem", borderRadius: "var(--radius-lg)", backgroundColor: "rgba(255,255,255,0.1)" }}>50</p>
              <p className="nss-text-sm nss-font-semibold nss-uppercase nss-leading-tight" style={{ color: "rgba(255, 255, 255, 0.85)" }}>NSS Volunteers</p>
            </div>
          </div>
        </Section>

        {/* ── 2. Active Batch + Impact Metrics ────────────────────────────── */}
        {batch?.impactMetrics?.length > 0 && (
          <Section>
            <Reveal>
              <ClayCard tilt={false} className="nss-grid nss-gap-5 nss-p-4 nss-sm-p-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
                <div>
                  <Badge>Current Batch</Badge>
                  <h2 className="nss-mt-2 nss-font-display nss-text-2xl nss-font-extrabold nss-leading-tight nss-break-words">
                    {batch.yearRange} · {batch.title}
                  </h2>
                  {(batch.programmeOfficer?.trim() || batch.volunteerSecretary?.trim()) && (
                    <p className="nss-mt-1 nss-text-sm nss-text-muted">
                      {batch.programmeOfficer && `Programme Officer: ${batch.programmeOfficer}`}
                      {batch.programmeOfficer && batch.volunteerSecretary && " · "}
                      {batch.volunteerSecretary && `Secretary: ${batch.volunteerSecretary}`}
                    </p>
                  )}
                </div>
                <div className="nss-grid nss-grid-cols-2 nss-gap-3 nss-sm-grid-cols-4">
                  {batch.impactMetrics.map((m) => (
                    <div key={m.label} style={{ minWidth: 0 }}>
                      <ImpactStat label={m.label} value={m.value} />
                    </div>
                  ))}
                </div>
              </ClayCard>
            </Reveal>
          </Section>
        )}

        {/* ── 3. Featured Highlight ────────────────────────────────────────── */}
        {highlight && (
          <Section>
            <Reveal>
              <div className="nss-card nss-p-0 nss-grid nss-gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
                {highlight.image && (
                  <img
                    src={highlight.image}
                    alt={highlight.title}
                    loading="lazy"
                    decoding="async"
                    style={{ aspectRatio: "16/9", width: "100%", height: "100%", objectFit: "cover" }}
                  />
                )}
                <div className="nss-flex nss-flex-col nss-justify-center nss-p-5 nss-sm-p-6">
                  <Badge variant="accent" style={{ alignSelf: "flex-start" }}>★ Featured Highlight</Badge>
                  <h2 className="nss-mt-3 nss-font-display nss-text-2xl nss-font-extrabold nss-text-balance nss-sm-text-3xl">
                    {highlight.title}
                  </h2>
                  <p className="nss-mt-3 nss-text-muted">{highlight.description}</p>
                  <div className="nss-mt-6">
                    <ClayButton to="/highlights" variant="soft">
                      See all highlights <ArrowRight style={{ height: "1rem", width: "1rem" }} />
                    </ClayButton>
                  </div>
                </div>
              </div>
            </Reveal>
          </Section>
        )}

        {/* ── 4. Latest Projects ──────────────────────────────────────────── */}
        {projects?.length > 0 && (
          <Section>
            <SectionHeading
              eyebrow="Recent Work"
              title="Latest Projects"
              description="A glimpse of the campaigns making a difference this year."
              action={
                <ClayButton to="/projects" variant="soft">
                  All projects <ArrowRight style={{ height: "1rem", width: "1rem" }} />
                </ClayButton>
              }
            />
            <div className="nss-grid nss-grid-cols-1 nss-gap-5 nss-sm-grid-cols-2 nss-lg-grid-cols-3">
              {projects.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </Section>
        )}

        {/* ── 5. Camp Spotlight ────────────────────────────────────────────── */}
        {camp && (
          <Section>
            <SectionHeading eyebrow="Camp Spotlight" title="Special Camp" />
            <Reveal>
              <CampCard camp={camp} />
            </Reveal>
          </Section>
        )}

        {/* ── 6. Batch Legacy Preview ──────────────────────────────────────── */}
        {batches?.length > 1 && (
          <Section>
            <SectionHeading
              eyebrow="The Journey"
              title="Batch-wise Legacy"
              description="Every batch leaves a chapter behind. Explore them all."
              action={
                <ClayButton to="/batches" variant="soft">
                  All batches <ArrowRight style={{ height: "1rem", width: "1rem" }} />
                </ClayButton>
              }
            />
            <div className="nss-grid nss-grid-cols-1 nss-gap-5 nss-sm-grid-cols-2">
              <Reveal>
                <Link to="/journey" style={{ display: "block", height: "100%" }}>
                  <ClayCard className="nss-flex nss-flex-col nss-p-4 nss-sm-p-5" style={{ height: "100%" }}>
                    <Badge variant="accent" className="w-fit">Timeline</Badge>
                    <h3 className="nss-mt-3 nss-font-display nss-text-xl nss-font-bold">NSS Journey Timeline</h3>
                    <p className="nss-mt-2 nss-text-sm nss-text-muted">
                      From the unit's founding to today — every milestone preserved.
                    </p>
                    <span className="nss-mt-4 nss-flex nss-items-center nss-gap-1 nss-text-sm nss-font-semibold nss-text-primary">
                      Walk the journey <ArrowRight style={{ height: "1rem", width: "1rem" }} />
                    </span>
                  </ClayCard>
                </Link>
              </Reveal>
              <Reveal delay={0.1}>
                <Link to="/team" style={{ display: "block", height: "100%" }}>
                  <ClayCard className="nss-flex nss-flex-col nss-p-4 nss-sm-p-5" style={{ height: "100%" }}>
                    <Badge variant="accent" className="w-fit">People</Badge>
                    <h3 className="nss-mt-3 nss-font-display nss-text-xl nss-font-bold">Team &amp; Volunteers</h3>
                    <p className="nss-mt-2 nss-text-sm nss-text-muted">
                      Meet the officers and volunteers behind every campaign.
                    </p>
                    <span className="nss-mt-4 nss-flex nss-items-center nss-gap-1 nss-text-sm nss-font-semibold nss-text-primary">
                      Meet the team <ArrowRight style={{ height: "1rem", width: "1rem" }} />
                    </span>
                  </ClayCard>
                </Link>
              </Reveal>
            </div>
          </Section>
        )}

        {/* ── 7. Gallery & Videos Preview ─────────────────────────────────── */}
        {(albums?.length > 0 || videos?.length > 0) && (
          <Section gap="large">
            {albums?.length > 0 && (
              <div className="nss-flex nss-flex-col nss-gap-4" style={{ minWidth: 0 }}>
                <SectionHeading
                  eyebrow="Media"
                  title="Gallery & Video Clips"
                  description="Explore our visual record of service."
                />
                <div className="nss-mb-4 nss-flex nss-flex-col nss-gap-3 nss-sm-flex-row nss-sm-items-center nss-sm-justify-between">
                  <h3 className="nss-font-display nss-text-lg nss-font-bold nss-leading-tight">Recent Photo Albums</h3>
                  <ClayButton to="/gallery" variant="soft">
                    All Albums <ArrowRight style={{ height: "1rem", width: "1rem" }} />
                  </ClayButton>
                </div>
                <div className="nss-grid nss-grid-cols-1 nss-gap-5 nss-sm-grid-cols-2 nss-lg-grid-cols-3">
                  {albums.map((a, i) => (
                    <Reveal key={a.slug} delay={i * 0.06}>
                      <AlbumCard album={a} />
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            {videos?.length > 0 && (
              <div className="nss-flex nss-flex-col nss-gap-4" style={{ minWidth: 0 }}>
                {!albums?.length && (
                  <SectionHeading
                    eyebrow="Media"
                    title="Featured Video Clips"
                    description="Explore our visual record of service."
                  />
                )}
                <div className="nss-mb-4 nss-flex nss-flex-col nss-gap-3 nss-sm-flex-row nss-sm-items-center nss-sm-justify-between">
                  <h3 className="nss-font-display nss-text-lg nss-font-bold nss-leading-tight">Featured Clips</h3>
                  <ClayButton to="/videos" variant="soft">
                    All Videos <ArrowRight style={{ height: "1rem", width: "1rem" }} />
                  </ClayButton>
                </div>
                <div className="nss-grid nss-grid-cols-1 nss-gap-5 nss-sm-grid-cols-2">
                  {videos.map((v, i) => (
                    <Reveal key={v.slug} delay={i * 0.08}>
                      <MediaThumb video={v} />
                    </Reveal>
                  ))}
                </div>
              </div>
            )}
          </Section>
        )}

        {/* ── 8. Reports Preview ──────────────────────────────────────────── */}
        {reports?.length > 0 && (
          <Section>
            <SectionHeading
              eyebrow="Documents"
              title="Reports & Records"
              action={
                <ClayButton to="/reports" variant="soft">
                  All reports <ArrowRight style={{ height: "1rem", width: "1rem" }} />
                </ClayButton>
              }
            />
            <div className="nss-grid nss-grid-cols-1 nss-gap-5 nss-sm-grid-cols-3">
              {reports.map((r, i) => (
                <Reveal key={r.slug} delay={i * 0.06}>
                  <ClayCard className="nss-flex nss-flex-col nss-p-4 nss-sm-p-5" style={{ height: "100%" }}>
                    <Badge variant="outline" className="w-fit">{r.type}</Badge>
                    <h3 className="nss-mt-3 nss-font-display nss-font-bold">{r.title}</h3>
                    <p className="nss-mt-2 nss-text-sm nss-text-muted">{r.description}</p>
                    <p className="nss-mt-3 nss-text-xs nss-text-muted">{formatDate(r.date)}</p>
                  </ClayCard>
                </Reveal>
              ))}
            </div>
          </Section>
        )}

        {/* ── 9. Volunteer Stories ─────────────────────────────────────────── */}
        {stories?.length > 0 && (
          <Section>
            <SectionHeading
              eyebrow="In Their Words"
              title="Volunteer Stories"
              action={
                <ClayButton to="/stories" variant="soft">
                  All stories <ArrowRight style={{ height: "1rem", width: "1rem" }} />
                </ClayButton>
              }
            />
            <div className="nss-grid nss-grid-cols-1 nss-gap-5 nss-sm-grid-cols-2">
              {stories.map((st, i) => (
                <Reveal key={st.slug} delay={i * 0.08}>
                  <StoryCard story={st} />
                </Reveal>
              ))}
            </div>
          </Section>
        )}

        {/* ── 10. Three Pillars ────────────────────────────────────────────── */}
        <Section>
          <SectionHeading
            eyebrow="What We Do"
            title="Three Pillars of Service"
            description="Every act of volunteering falls under one of three principles that define who we are."
          />
          <div className="nss-grid nss-grid-cols-1 nss-gap-5 nss-sm-grid-cols-3">
            {([
              {
                subtitle: "സമൂഹം",
                title:    "Community",
                description: "Helping those around us — palliative care, blood donation, anti-drug campaigns, and reaching the unreached.",
                accentColor: "#1b3a27",
              },
              {
                subtitle: "പ്രകൃതി",
                title:    "Environment",
                description: "Nurturing the earth through tree plantations, plastic-free drives, Haritha Bhavanam, and river campaigns.",
                accentColor: "#a04021",
              },
              {
                subtitle: "ശാക്തീകരണം",
                title:    "Empowerment",
                description: "Building tomorrow's leaders through campus life, awareness drives, and 120 hours of purposeful service.",
                accentColor: "#1b3a27",
              },
            ] as const).map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.1}>
                <ActivityCard
                  title={pillar.title}
                  subtitle={pillar.subtitle}
                  description={pillar.description}
                  accentColor={pillar.accentColor}
                />
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ── 11. Reach Out CTA ────────────────────────────────────────────── */}
        <Section>
          <div
            className="nss-flex nss-flex-col nss-items-center nss-gap-4 nss-p-6 nss-text-center nss-sm-p-8"
            style={{ borderRadius: "var(--radius-lg)", background: "#042413", color: "#ffffff" }}
          >
            <p
              className="nss-font-display nss-text-2xl nss-font-bold nss-italic"
              style={{ fontFamily: "'Noto Sans Malayalam', sans-serif" }}
            >
              ജീവിക്കുന്ന ഒരിടം
            </p>
            <h2 className="nss-font-display nss-text-2xl nss-font-extrabold nss-leading-tight nss-text-balance nss-sm-text-3xl">
              Be Part of the Living Canvas
            </h2>
            <p className="nss-text-sm nss-leading-relaxed" style={{ maxWidth: "28rem", opacity: 0.9 }}>
              Want to join, collaborate, or learn more about our unit's work?
              Every student can be a thread in this tapestry.
            </p>
            <ClayButton to="/contact" variant="soft">
              Reach the NSS Unit · khmhsvalakulam@gmail.com <ArrowRight style={{ height: "1rem", width: "1rem" }} />
            </ClayButton>
          </div>
        </Section>

      </Container>
    </PageShell>
  );
}
