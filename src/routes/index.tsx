import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { PageShell, Container } from "@/components/layout";
import { HeroLogoHero } from "@/components/layout/HeroLogoImpl";
import {
  SectionHeading,
  ClayButton,
  ClayCard,
  Badge,
  Reveal,
  Section,
  ActivityCard,
} from "@/components/clay";
import {
  AlbumCard,
  CampCard,
  ProjectCard,
  StoryCard,
} from "@/components/media";
import {
  getAlbums,
  getFeaturedCamp,
  getFeaturedHighlight,
  getFeaturedProjects,
  getFeaturedStories,
  getReports,
  getSiteSettings,
} from "@/lib/data";
import type {
  SiteSettings,
  Highlight,
  Project,
  Camp,
  GalleryAlbum,
  Report,
  VolunteerStory,
} from "@/types";

// ─── Route ────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/")({
  loader: async () => {
    const [s, highlight, projects, camp, allAlbums, allReports, stories] = await Promise.all([
      getSiteSettings(),
      getFeaturedHighlight(),
      getFeaturedProjects(3),
      getFeaturedCamp(),
      getAlbums(),
      getReports(),
      getFeaturedStories(2),
    ]);
    const albums = allAlbums.filter((a) => a.showOnHome === true).slice(0, 6);
    const reports = allReports.slice(0, 3);
    return { s, highlight, projects, camp, albums, reports, stories };
  },
  component: Home,
});

// ─── Page Component ───────────────────────────────────────────────────────────

function Home() {
  const {
    s,
    highlight,
    projects,
    camp,
    albums,
    reports,
    stories,
  } = Route.useLoaderData() as {
    s:         SiteSettings;
    highlight: Highlight | undefined;
    projects:  Project[];
    camp:      Camp | undefined;
    albums:    GalleryAlbum[];
    reports:   Report[];
    stories:   VolunteerStory[];
  };

  return (
    <PageShell>
      <Container className="nss-flex nss-flex-col nss-gap-8 nss-py-8">

        {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
        <Section>
          <div
            className="nss-card nss-p-6 nss-sm-p-10"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 0,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Subtle radial glow behind logo */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: "-20%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "60vw",
                maxWidth: 520,
                height: "60vw",
                maxHeight: 520,
                borderRadius: "50%",
                background: "radial-gradient(circle, hsl(150 60% 50% / 0.07) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* ── Large hero logo — shared element with navbar ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: "2rem" }}
            >
              <HeroLogoHero mobileSize={108} desktopSize={160} />
            </motion.div>

            {/* ── School name ── */}
            <motion.h1
              className="nss-font-display nss-font-extrabold nss-break-words nss-text-gradient"
              style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)", lineHeight: 1.15, marginBottom: "0.5rem" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              KHMHSS Valakkulam
            </motion.h1>

            {/* ── NSS identity line ── */}
            <motion.p
              className="nss-font-sans nss-font-bold nss-text-primary"
              style={{ fontSize: "clamp(0.95rem, 2.5vw, 1.2rem)", letterSpacing: "0.04em", marginBottom: "0.35rem" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              National Service Scheme · Unit 466
            </motion.p>

            {/* ── Malayalam motto ── */}
            <motion.p
              style={{
                fontFamily: "'Noto Sans Malayalam', 'Manjari', sans-serif",
                fontSize: "clamp(1rem, 2.8vw, 1.25rem)",
                fontWeight: 600,
                color: "var(--accent)",
                marginTop: "0.75rem",
                marginBottom: "0.25rem",
                lineHeight: 1.6,
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              "നമുക്കല്ല, സമൂഹത്തിനായി."
            </motion.p>

            {/* ── English motto ── */}
            <motion.div
              style={{
                marginTop: "1rem",
                padding: "0.4rem 1.25rem",
                borderRadius: "var(--radius-full)",
                background: "var(--clay)",
                border: "1px solid var(--border)",
                display: "inline-block",
              }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="nss-font-display nss-text-sm nss-font-semibold nss-italic" style={{ color: "var(--muted-foreground)" }}>
                "Not Me, But You"
              </p>
            </motion.div>

            {/* ── CTA buttons ── */}
            <motion.div
              style={{ marginTop: "2rem", display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            >
              <ClayButton to="/camps" variant="primary" className="nss-justify-center">
                Special Camp <ArrowRight style={{ height: "1rem", width: "1rem" }} />
              </ClayButton>
              <ClayButton to="/projects" variant="soft" className="nss-justify-center">
                Our Initiatives
              </ClayButton>
            </motion.div>

            {/* ── School image strip below ── */}
            <motion.div
              style={{ marginTop: "2.5rem", width: "100%", borderRadius: "var(--radius-xl)", overflow: "hidden" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src="/gate.webp"
                alt="KHMHSS Valakkulam School Gate"
                width={1280}
                height={480}
                fetchPriority="high"
                style={{ width: "100%", height: "clamp(180px, 30vw, 340px)", objectFit: "cover", display: "block" }}
              />
            </motion.div>
          </div>
        </Section>


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

        {/* ── 7. Gallery Preview ─────────────────────────────────── */}
        {(albums?.length > 0) && (
          <Section gap="large">
            {albums?.length > 0 && (
              <div className="nss-flex nss-flex-col nss-gap-4" style={{ minWidth: 0 }}>
                <SectionHeading
                  eyebrow="Media"
                  title="Gallery"
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

      </Container>
    </PageShell>
  );
}


