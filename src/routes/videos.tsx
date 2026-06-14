import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { Reveal, EmptyState } from "@/components/clay";
import { MediaThumb } from "@/components/media";

import { getVideos } from "@/lib/data";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Videos — NSS Digital Legacy" },
      { name: "description", content: "Short video clips from NSS projects, camps, and volunteer memories." },
      { property: "og:title", content: "NSS Video Clips" },
      { property: "og:description", content: "An organized archive of short NSS clips." },
    ],
    links: [{ rel: "canonical", href: "/videos" }],
  }),
  component: Videos,
});

function Videos() {
  const videos = getVideos();
  return (
    <PageShell>
      <PageHeader eyebrow="Videos" title="Video Clips Archive" description="Short clips — click to play. Organized by project, camp, and batch." />
      <Container className="py-8">
        {videos.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v, i) => (
              <Reveal key={v.slug} delay={i * 0.06}><MediaThumb video={v} /></Reveal>
            ))}
          </div>
        ) : (
          <EmptyState message="No videos added yet." />
        )}
      </Container>
    </PageShell>
  );
}
