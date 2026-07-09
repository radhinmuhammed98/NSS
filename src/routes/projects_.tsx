import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Calendar, CheckCircle2, Layers, MapPin, Star } from "lucide-react";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { Badge, ClayCard, EmptyState, FilterBar, Reveal, type FilterGroup } from "@/components/clay";
import { ProjectCard } from "@/components/media";
import { usePageMeta } from "@/hooks/usePageMeta";

import { formatDate, getProjects, projectCategories } from "@/lib/data";
import type { Project } from "@/types";

export const Route = createFileRoute("/projects_")({
  loader: async () => {
    const allProjects = await getProjects();
    return { allProjects: allProjects.filter((p) => p.slug) };
  },
  component: Projects,
});

function Projects() {
  const { allProjects: all } = Route.useLoaderData() as {
    allProjects: Project[];
  };

  usePageMeta({
    title: "Projects",
    description: "Discover community service projects by NSS Unit 466 at KHMHSS Valakkulam.",
  });

  const [active, setActive] = useState<Record<string, string>>({});

  const featuredProject = useMemo(
    () => all.find((p) => p.featured) ?? all[0],
    [all]
  );

  const stats = useMemo(() => {
    const years = new Set(all.map((p) => p.year).filter(Boolean));
    return [
      { label: "Projects", value: String(all.length), icon: Layers },
      { label: "Featured", value: String(all.filter((p) => p.featured).length), icon: Star },
      { label: "Camp Linked", value: String(all.filter((p) => p.campRelated).length), icon: CheckCircle2 },
      { label: "Years", value: String(years.size || 1), icon: Calendar },
    ];
  }, [all]);

  const usedCategories = useMemo(
    () => projectCategories.filter((c) => all.some((p) => p.category === c)),
    [all]
  );

  const groups: FilterGroup[] = [
    {
      key: "category",
      label: "Category",
      options: [{ value: "all", label: "All" }, ...usedCategories.map((c) => ({ value: c, label: c }))],
    },
    {
      key: "featured",
      label: "Show",
      options: [
        { value: "all", label: "All" },
        { value: "featured", label: "Featured" },
        { value: "camp", label: "Camp-related" },
      ],
    },
  ];

  const filtered = all.filter((p) => {
    if (active.category && active.category !== "all" && p.category !== active.category) return false;
    if (active.featured === "featured" && !p.featured) return false;
    if (active.featured === "camp" && !p.campRelated) return false;
    return true;
  });

  return (
    <PageShell>
      <PageHeader
        eyebrow="Projects"
        title="Service Projects"
        description="A clean archive of NSS Unit 466 campaigns, drives, school outreach, and camp-linked service work."
      />
      <Container className="nss-py-8">
        {featuredProject && (
          <Reveal>
            <ClayCard tilt={false} className="nss-p-0" style={{ overflow: "hidden", borderRadius: "var(--radius-xl)" }}>
              <div className="nss-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))" }}>
                <Link
                  to="/projects/$projectSlug"
                  params={{ projectSlug: featuredProject.slug }}
                  style={{ minHeight: "18rem", position: "relative", overflow: "hidden" }}
                  aria-label={`Open ${featuredProject.title}`}
                >
                  {featuredProject.coverImage ? (
                    <img
                      src={featuredProject.coverImage}
                      alt={featuredProject.title}
                      fetchPriority="high"
                      decoding="async"
                      style={{ height: "100%", minHeight: "18rem", width: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <div style={{ height: "100%", minHeight: "18rem", background: "var(--clay-deep)" }} />
                  )}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, transparent 38%, rgba(0,0,0,0.55))",
                    }}
                  />
                </Link>
                <div className="nss-flex nss-flex-col nss-justify-between nss-gap-8 nss-p-5 nss-sm-p-8">
                  <div>
                    <div className="nss-flex nss-flex-wrap nss-gap-2">
                      <Badge variant="accent">Featured</Badge>
                      <Badge variant="outline">{featuredProject.category}</Badge>
                    </div>
                    <h2 className="nss-mt-4 nss-font-display nss-text-3xl nss-font-extrabold nss-text-balance nss-text-gradient">
                      {featuredProject.title}
                    </h2>
                    <p className="nss-mt-3 nss-text-sm nss-leading-relaxed nss-text-muted">{featuredProject.summary}</p>
                    <div className="nss-mt-5 nss-flex nss-flex-wrap nss-gap-4 nss-text-sm nss-text-muted">
                      <span className="nss-flex nss-items-center nss-gap-1">
                        <Calendar style={{ height: "1rem", width: "1rem" }} aria-hidden />
                        {formatDate(featuredProject.date)}
                      </span>
                      {featuredProject.location && (
                        <span className="nss-flex nss-items-center nss-gap-1">
                          <MapPin style={{ height: "1rem", width: "1rem" }} aria-hidden />
                          {featuredProject.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <Link
                    to="/projects/$projectSlug"
                    params={{ projectSlug: featuredProject.slug }}
                    className="nss-button nss-button-primary"
                    style={{ width: "fit-content" }}
                  >
                    View project <ArrowRight style={{ height: "1rem", width: "1rem" }} />
                  </Link>
                </div>
              </div>
            </ClayCard>
          </Reveal>
        )}

        <div className="nss-mt-6 nss-grid nss-grid-cols-2 nss-gap-3 nss-sm-grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <ClayCard key={stat.label} tilt={false} className="nss-p-4">
                <Icon style={{ height: "1rem", width: "1rem", color: "var(--secondary)" }} aria-hidden />
                <p className="nss-mt-3 nss-font-display nss-text-2xl nss-font-extrabold nss-leading-none nss-text-gradient">
                  {stat.value}
                </p>
                <p className="nss-mt-1 nss-text-xs nss-font-semibold nss-uppercase nss-text-muted">{stat.label}</p>
              </ClayCard>
            );
          })}
        </div>

        <div className="nss-mt-10 nss-mb-4">
          <h2 className="nss-font-display nss-text-2xl nss-font-extrabold">Browse the archive</h2>
          <p className="nss-text-sm nss-text-muted">
            {filtered.length} of {all.length} projects shown
          </p>
        </div>
        <FilterBar groups={groups} active={active} onChange={(k, v) => setActive((s) => ({ ...s, [k]: v }))} />
        {filtered.length ? (
          <div className="nss-grid nss-gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))" }}>
            {filtered.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState message="No projects match these filters." />
        )}
      </Container>
    </PageShell>
  );
}
