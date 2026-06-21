import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { PageShell, Container } from "@/components/layout";
import { SectionHeading, ClayButton, ClayCard, Badge, Reveal, ImpactStat } from "@/components/clay";
import { MediaThumb, AlbumCard, CampCard, ProjectCard, StoryCard } from "@/components/media";
import { Sparkles as SparkleField } from "@/components/Sparkles";


import {
  formatDate,
  getAlbums,
  getCurrentBatch,
  getFeaturedCamp,
  getFeaturedHighlight,
  getFeaturedProjects,
  getFeaturedStories,
  getFeaturedVideos,
  getReports,
  getSiteSettings,
} from "@/lib/data";
import { heroNss } from "@/data";
import { useGsapIntro, useGsapParallax } from "@/hooks/use-gsap";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const s = getSiteSettings();
  const batch = getCurrentBatch();
  const highlight = getFeaturedHighlight();
  const projects = getFeaturedProjects(3);
  const camp = getFeaturedCamp();
  const albums = getAlbums().slice(0, 3);
  const videos = getFeaturedVideos(2);
  const reports = getReports().slice(0, 3);
  const stories = getFeaturedStories(2);
  const heroScope = useGsapIntro<HTMLDivElement>();
  const heroImg = useGsapParallax<HTMLDivElement>(40);

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <SparkleField count={16} />
        <Container className="relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2">
          <div ref={heroScope} className="contents">
          <div>
            <div data-anim>
              <Badge variant="accent">
                <Sparkles className="mr-1 h-3.5 w-3.5" /> {s.unitName} · {s.academicYear}
              </Badge>
            </div>
            <h1
              data-anim
              className="mt-4 text-4xl font-extrabold leading-[1.05] text-balance sm:text-5xl lg:text-6xl"
            >
              NSS <span className="text-primary">Digital</span>{" "}
              <span className="text-accent">Legacy</span>
            </h1>
            <p data-anim className="mt-4 max-w-md text-lg text-muted-foreground">
              A living archive of service, leadership, camps, projects, and memories.
              Every batch serves and leaves, but their journey stays forever.
            </p>
            <p data-anim className="mt-4 font-display text-base font-semibold text-accent">
              “{s.motto}”
            </p>
            <div data-anim className="mt-7 flex flex-wrap gap-3">
              <ClayButton to="/batches" variant="primary">
                Explore Batches <ArrowRight className="h-4 w-4" />
              </ClayButton>
              <ClayButton to="/projects" variant="soft">
                Browse Projects
              </ClayButton>
            </div>
          </div>

          <div data-anim className="relative">
            <div ref={heroImg}>
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="clay overflow-hidden p-0"
              >
                <img
                  src={batch.coverImage}
                  alt={`${batch.title} batch`}
                  width={1280}
                  height={960}
                  fetchPriority="high"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
              </motion.div>
            </div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="clay-accent absolute -bottom-5 -left-3 px-5 py-3 sm:-left-6"
            >
              <p className="font-display text-2xl font-extrabold">{batch.volunteerCount}+</p>
              <p className="text-xs font-medium">Active volunteers</p>
            </motion.div>
          </div>
          </div>
        </Container>

      </section>


      {/* Active batch + impact */}
      <section className="py-8">
        <Container>
          <Reveal>
            <ClayCard tilt={false} className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <Badge>Current Batch</Badge>
                <h2 className="mt-2 font-display text-2xl font-extrabold">
                  {batch.yearRange} · {batch.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Programme Officer: {batch.programmeOfficer} · Secretary: {batch.volunteerSecretary}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-1/2">
                {batch.impactMetrics.map((m) => (
                  <ImpactStat key={m.label} label={m.label} value={m.value} />
                ))}
              </div>
            </ClayCard>
          </Reveal>
        </Container>
      </section>

      {/* Featured highlight */}
      <section className="py-8">
        <Container>
          <Reveal>
            <div className="clay overflow-hidden p-0 lg:grid lg:grid-cols-2">
              <img
                src={highlight.image}
                alt={highlight.title}
                loading="lazy"
                decoding="async"
                className="aspect-video w-full object-cover lg:aspect-auto lg:h-full"
              />
              <div className="flex flex-col justify-center p-8">
                <Badge variant="accent">★ Featured Highlight</Badge>
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
        </Container>
      </section>

      {/* Latest projects */}
      <section className="py-8">
        <Container>
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Camp spotlight */}
      <section className="py-8">
        <Container>
          <SectionHeading eyebrow="Camp Spotlight" title="Special Camp" />
          <Reveal>
            <CampCard camp={camp} />
          </Reveal>
        </Container>
      </section>

      {/* Batch legacy preview */}
      <section className="py-8">
        <Container>
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
          <div className="grid gap-6 sm:grid-cols-2">
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
        </Container>
      </section>

      {/* Gallery + videos preview */}
      <section className="py-8">
        <Container>
          <SectionHeading
            eyebrow="Media"
            title="Gallery & Clips"
            action={
              <ClayButton to="/gallery" variant="soft">
                Open gallery <ArrowRight className="h-4 w-4" />
              </ClayButton>
            }
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="grid grid-cols-3 gap-3">
              {albums.map((a, i) => (
                <Reveal key={a.slug} delay={i * 0.06}>
                  <AlbumCard album={a} />
                </Reveal>
              ))}
            </div>
            <div className="grid gap-4">
              {videos.map((v, i) => (
                <Reveal key={v.slug} delay={i * 0.08}>
                  <MediaThumb video={v} />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Reports preview */}
      <section className="py-8">
        <Container>
          <SectionHeading
            eyebrow="Documents"
            title="Reports & Records"
            action={
              <ClayButton to="/reports" variant="soft">
                All reports <ArrowRight className="h-4 w-4" />
              </ClayButton>
            }
          />
          <div className="grid gap-4 sm:grid-cols-3">
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
        </Container>
      </section>

      {/* Stories */}
      <section className="py-8">
        <Container>
          <SectionHeading
            eyebrow="In Their Words"
            title="Volunteer Stories"
            action={
              <ClayButton to="/stories" variant="soft">
                All stories <ArrowRight className="h-4 w-4" />
              </ClayButton>
            }
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {stories.map((st, i) => (
              <Reveal key={st.slug} delay={i * 0.08}>
                <StoryCard story={st} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Reach out */}
      <section className="py-12">
        <Container>
          <Reveal>
            <div className="clay-accent relative overflow-hidden flex flex-col items-center gap-4 p-10 text-center">
              <SparkleField count={12} colors={["#ffffff", "#fde68a", "var(--color-primary)"]} />
              <h2 className="font-display text-3xl font-extrabold text-balance">
                Be part of the legacy
              </h2>
              <p className="max-w-md text-sm opacity-90">
                Want to join, collaborate, or learn more about our unit's work? We'd love to hear from you.
              </p>
              <ClayButton to="/contact" variant="soft">
                Reach the NSS unit <ArrowRight className="h-4 w-4" />
              </ClayButton>
            </div>
          </Reveal>
        </Container>
      </section>
    </PageShell>
  );
}
