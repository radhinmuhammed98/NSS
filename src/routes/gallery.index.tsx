import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { Reveal, EmptyState } from "@/components/clay";
import { AlbumCard } from "@/components/media";

import { getAlbums } from "@/lib/data";

export const Route = createFileRoute("/gallery/")({
  head: () => ({
    meta: [
      { title: "Gallery — NSS Digital Legacy" },
      { name: "description", content: "Album-based photo gallery of NSS projects, camps, and events." },
      { property: "og:title", content: "NSS Gallery" },
      { property: "og:description", content: "Photo albums organized by project, camp, and batch." },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

function Gallery() {
  const albums = getAlbums();
  return (
    <PageShell>
      <PageHeader eyebrow="Gallery" title="Photo Albums" description="Memories preserved album by album." />
      <Container className="py-8">
        {albums.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.06}><AlbumCard album={a} /></Reveal>
            ))}
          </div>
        ) : (
          <EmptyState message="Gallery albums are being prepared." />
        )}
      </Container>
    </PageShell>
  );
}
