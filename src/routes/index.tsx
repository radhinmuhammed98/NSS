import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { PageShell, Container } from "@/components/layout";
import { SectionHeading, ClayButton, ClayCard, Badge, ImpactStat, Reveal } from "@/components/clay";
import { MediaThumb, AlbumCard, CampCard, ProjectCard, StoryCard } from "@/components/media";

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
import type { SiteSettings, Batch, Highlight, Project, Camp, GalleryAlbum, VideoClip, Report, VolunteerStory } from "@/types";

export const Route = createFileRoute("/")({
  loader: async () => {
    const s = await getSiteSettings();
    const batch = await getCurrentBatch();
    const batches = await getBatches();
    const highlight = await getFeaturedHighlight();
    const projects = await getFeaturedProjects(3);
    const camp = await getFeaturedCamp();
    const allAlbums = await getAlbums();
    const albums = allAlbums.slice(0, 3);
    const videos = await getFeaturedVideos(2);
    const allReports = await getReports();
    const reports = allReports.slice(0, 3);
    const stories = await getFeaturedStories(2);
    return { s, batch, batches, highlight, projects, camp, albums, videos, reports, stories };
  },
  component: Home,
});

function Home() {
  const { s, batch, batches, highlight, projects, camp, albums, videos, reports, stories } = Route.useLoaderData() as {
    s: SiteSettings;
    batch: Batch;
    batches: Batch[];
    highlight: Highlight;
    projects: Project[];
    camp: Camp;
    albums: GalleryAlbum[];
    videos: VideoClip[];
    reports: Report[];
    stories: VolunteerStory[];
  };

  return (
    <PageShell>
      <Container className="flex flex-col gap-y-16 py-16">
        
        {/* 1. Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Text Column */}
          <div className="flex flex-col">
            <div data-anim>
              <Badge variant="accent">
                <Sparkles className="mr-1 h-3.5 w-3.5" /> KHMHSS Valakkulam · Unit 11223 · {s.academicYear}
              </Badge>
            </div>
            <h1
              data-anim
              className="mt-4 text-3xl font-extrabold leading-none tracking-tight break-words text-balance sm:text-5xl lg:text-6xl"
            >
              A Living{" "}
              <span className="text-primary">Canvas</span>{" "}of{" "}
              <span className="text-accent">Service</span>
            </h1>
            <p data-anim className="mt-3 max-w-md text-lg text-muted-foreground leading-relaxed">
              Young hands. Willing hearts. The volunteers of KHMHSS Valakkulam step out
              of their classrooms to heal, build, and serve their community — one act at a time.
            </p>
            {/* Bilingual motto */}
            <div data-anim className="mt-4 border-l-4 border-accent pl-4">
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
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <ClayButton to="/camps" variant="primary" className="w-full sm:w-auto justify-center">
                Seven Days of Magic <ArrowRight className="h-4 w-4" />
              </ClayButton>
              <ClayButton to="/projects" variant="soft" className="w-full sm:w-auto justify-center">
                Our Initiatives
              </ClayButton>
            </div>
          </div>

          {/* Media Column */}
          <div className="flex flex-col gap-4">
            <div className="clay overflow-hidden p-0 rounded-2xl">
              <img
                src={batch.coverImage}
                alt={`${batch.title} batch`}
                width={1280}
                height={960}
                fetchPriority="high"
                decoding="async"
                className="aspect-video sm:aspect-[4/3] w-full object-cover rounded-xl"
              />
            </div>
            {/* Placed below the image in normal document flow instead of absolute positioning */}
            <div
              className="px-4 py-2 rounded-2xl w-full sm:w-auto min-w-fit mt-2 flex flex-col items-start"
              style={{ background: "#042413", color: "#ffffff", boxShadow: "8px 8px 22px rgba(160, 64, 33, 0.14), -6px -6px 16px rgba(255, 255, 255, 0.75)" }}
            >
              <p className="font-display text-xl font-bold">{batch.volunteerCount}+</p>
              <p className="text-xs font-medium text-white/90">Active volunteers</p>
            </div>
          </div>
        </section>

        {/* 2. Active Batch + Impact (Statistics Cards) */}
        {batch && batch.impactMetrics && batch.impactMetrics.length > 0 && (
          <section className="flex flex-col gap-4">
            <Reveal>
              <ClayCard tilt={false} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <Badge>Current Batch</Badge>
                  <h2 className="mt-2 font-display text-2xl font-extrabold">
                    {batch.yearRange} · {batch.title}
                  </h2>
                  {((batch.programmeOfficer && batch.programmeOfficer.trim()) || (batch.volunteerSecretary && batch.volunteerSecretary.trim())) && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {batch.programmeOfficer && `Programme Officer: ${batch.programmeOfficer}`}
                      {batch.programmeOfficer && batch.volunteerSecretary && " · "}
                      {batch.volunteerSecretary && `Secretary: ${batch.volunteerSecretary}`}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full lg:w-auto">
                  {batch.impactMetrics.map((m) => (
                    <div key={m.label} className="h-full flex items-center justify-center">
                      <ImpactStat label={m.label} value={m.value} />
                    </div>
                  ))}
                </div>
              </ClayCard>
            </Reveal>
          </section>
        )}

        {/* 3. Featured Highlight */}
        {highlight && (
          <section className="flex flex-col gap-4">
            <Reveal>
              <div className="clay overflow-hidden p-0 flex flex-col lg:flex-row">
                {highlight.image && (
                  <img
                    src={highlight.image}
                    alt={highlight.title}
                    loading="lazy"
                    decoding="async"
                    className="aspect-video w-full object-cover lg:w-1/2 lg:h-auto rounded-xl"
                  />
                )}
                <div className="flex flex-col justify-center p-8 lg:w-1/2">
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

        {/* 4. Latest Projects */}
        {projects && projects.length > 0 && (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* 5. Camp Spotlight */}
        {camp && (
          <section className="flex flex-col gap-4">
            <SectionHeading eyebrow="Camp Spotlight" title="Special Camp" />
            <Reveal>
              <CampCard camp={camp} />
            </Reveal>
          </section>
        )}

        {/* 6. Batch Legacy Preview */}
        {batches && batches.length > 1 && (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Reveal>
                <Link to="/journey">
                  <ClayCard className="h-full">
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
                  <ClayCard className="h-full">
                    <Badge variant="accent">People</Badge>
                    <h3 className="mt-3 font-display text-xl font-bold">Team & Volunteers</h3>
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

        {/* 7. Gallery & Videos Preview */}
        {((albums && albums.length > 0) || (videos && videos.length > 0)) && (
          <section className="flex flex-col gap-10">
            {albums && albums.length > 0 && (
              <div className="flex flex-col gap-4">
                <SectionHeading
                  eyebrow="Media"
                  title="Gallery & Video Clips"
                  description="Explore our visual record of service."
                />
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-bold text-foreground">Recent Photo Albums</h3>
                  <ClayButton to="/gallery" variant="soft">
                    All Albums <ArrowRight className="h-4 w-4" />
                  </ClayButton>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {albums.map((a, i) => (
                    <Reveal key={a.slug} delay={i * 0.06}>
                      <AlbumCard album={a} />
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            {videos && videos.length > 0 && (
              <div className="flex flex-col gap-4">
                {(!albums || albums.length === 0) && (
                  <SectionHeading
                    eyebrow="Media"
                    title="Featured Video Clips"
                    description="Explore our visual record of service."
                  />
                )}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-bold text-foreground">Featured Clips</h3>
                  <ClayButton to="/videos" variant="soft">
                    All Videos <ArrowRight className="h-4 w-4" />
                  </ClayButton>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

        {/* 8. Reports Preview */}
        {reports && reports.length > 0 && (
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {reports.map((r, i) => (
                <Reveal key={r.slug} delay={i * 0.06}>
                  <ClayCard className="h-full">
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

        {/* 9. Volunteer Stories */}
        {stories && stories.length > 0 && (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {stories.map((st, i) => (
                <Reveal key={st.slug} delay={i * 0.08}>
                  <StoryCard story={st} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* 10. Three Pillars */}
        <section className="flex flex-col gap-4">
          <SectionHeading
            eyebrow="What We Do"
            title="Three Pillars of Service"
            description="Every act of volunteering falls under one of three principles that define who we are."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                ml: "സമൂഹം",
                en: "Community",
                desc: "Helping those around us — palliative care, blood donation, anti-drug campaigns, and reaching the unreached.",
                color: "text-primary",
              },
              {
                ml: "പ്രകൃതി",
                en: "Environment",
                desc: "Nurturing the earth through tree plantations, plastic-free drives, Haritha Bhavanam, and river campaigns.",
                color: "text-accent",
              },
              {
                ml: "ശാക്തീകരണം",
                en: "Empowerment",
                desc: "Building tomorrow's leaders through campus life, awareness drives, and 120 hours of purposeful service.",
                color: "text-primary",
              },
            ].map((pillar, i) => (
              <Reveal key={pillar.en} delay={i * 0.1}>
                <div className="clay h-full flex flex-col gap-3 p-6">
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

        {/* 11. Reach Out */}
        <section className="flex flex-col gap-4">
          <div className="overflow-hidden flex flex-col items-center gap-4 p-10 text-center rounded-2xl" style={{ background: "#042413", color: "#ffffff" }}>
            <p
              className="font-display text-2xl font-bold italic"
              style={{ fontFamily: "'Noto Sans Malayalam', sans-serif" }}
            >
              ജീവിക്കുന്ന ഒരിടം
            </p>
            <h2 className="font-display text-3xl font-extrabold text-balance">
              Be Part of the Living Canvas
            </h2>
            <p className="max-w-md text-sm opacity-90">
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
