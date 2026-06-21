import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { Reveal, EmptyState } from "@/components/clay";
import { MediaThumb } from "@/components/media";

import { getVideos } from "@/lib/data";
import type { VideoClip } from "@/types";

export const Route = createFileRoute("/videos")({
  loader: async () => {
    const list = await getVideos();
    return { list };
  },
  component: Videos,
});

function Videos() {
  const { list: videos } = Route.useLoaderData() as { list: VideoClip[] };
  return (
    <PageShell>
      <PageHeader
        eyebrow="Videos"
        title="Video Clips Archive"
        description="Short clips — click to play. Organized by project, camp, and batch."
      />
      <Container className="py-8">
        {videos.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v, i) => (
              <Reveal key={v.slug} delay={i * 0.06}>
                <MediaThumb video={v} />
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState message="No videos added yet." />
        )}
      </Container>
    </PageShell>
  );
}
