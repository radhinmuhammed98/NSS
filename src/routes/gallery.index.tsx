import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { Reveal, EmptyState, FilterBar, type FilterGroup } from "@/components/clay";
import { AlbumCard } from "@/components/media";

import {
  getAlbums,
  getAlbumTypes,
  getBatches,
  getYearsFromAlbums,
} from "@/lib/data";
import type { GalleryAlbum, Batch } from "@/types";

export const Route = createFileRoute("/gallery/")({
  loader: async () => {
    const [albums, batches, albumTypes, years] = await Promise.all([
      getAlbums(),
      getBatches(),
      getAlbumTypes(),
      getYearsFromAlbums(),
    ]);
    return { albums, batches, albumTypes, years };
  },
  component: Gallery,
});

function Gallery() {
  const { albums, batches, albumTypes, years } = Route.useLoaderData() as {
    albums: GalleryAlbum[];
    batches: Batch[];
    albumTypes: string[];
    years: number[];
  };

  const [active, setActive] = useState<Record<string, string>>({});

  const handleFilter = (key: string, value: string) => {
    setActive((prev) =>
      value === "all" ? { ...prev, [key]: "all" } : { ...prev, [key]: value }
    );
  };

  const clearAll = () => setActive({});

  const hasActive = Object.values(active).some((v) => v && v !== "all");

  const filtered = useMemo(() => {
    return albums.filter((a) => {
      const batchOk = !active.batch || active.batch === "all" || a.batchSlug === active.batch;
      const yearOk = !active.year || active.year === "all" || String(a.year) === active.year;
      const typeOk = !active.type || active.type === "all" || a.type === active.type;
      return batchOk && yearOk && typeOk;
    });
  }, [albums, active]);

  const groups: FilterGroup[] = [
    {
      key: "batch",
      label: "Batch",
      options: [
        { value: "all", label: "All" },
        ...batches.map((b) => ({ value: b.slug, label: b.yearRange })),
      ],
    },
    {
      key: "year",
      label: "Year",
      options: [
        { value: "all", label: "All" },
        ...years.map((y) => ({ value: String(y), label: String(y) })),
      ],
    },
    {
      key: "type",
      label: "Album Type",
      options: [
        { value: "all", label: "All" },
        ...albumTypes.map((t) => ({ value: t, label: t })),
      ],
    },
  ];

  return (
    <PageShell>
      <PageHeader
        eyebrow="Gallery"
        title="Photo Albums"
        description="Memories preserved album by album."
      />
      <Container className="py-8">
        <div className="flex items-center justify-between gap-4 mb-2">
          {hasActive && (
            <button
              type="button"
              onClick={clearAll}
              className="ml-auto text-xs font-semibold text-primary underline underline-offset-2 hover:no-underline"
              aria-label="Clear all gallery filters"
            >
              Clear all
            </button>
          )}
        </div>
        <FilterBar groups={groups} active={active} onChange={handleFilter} />

        {filtered.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.06}>
                <AlbumCard album={a} />
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState message="No albums match the selected filters." />
        )}
      </Container>
    </PageShell>
  );
}
