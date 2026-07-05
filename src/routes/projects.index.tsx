import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { Reveal, EmptyState, FilterBar, type FilterGroup } from "@/components/clay";
import { ProjectCard } from "@/components/media";
import { usePageMeta } from "@/hooks/usePageMeta";

import { getProjects, projectCategories } from "@/lib/data";
import type { Project } from "@/types";

export const Route = createFileRoute("/projects/")({
  loader: async () => {
    const allProjects = await getProjects();
    return { allProjects };
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
      <PageHeader eyebrow="Projects" title="All Projects" description="Campaigns and activities across every batch and year." />
      <Container className="nss-py-8">
        <FilterBar groups={groups} active={active} onChange={(k, v) => setActive((s) => ({ ...s, [k]: v }))} />
        {filtered.length ? (
          <div className="nss-grid nss-gap-5 nss-sm-grid-cols-2 nss-lg-grid-cols-3">
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
