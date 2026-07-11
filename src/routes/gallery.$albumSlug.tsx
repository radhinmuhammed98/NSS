import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PlayCircle } from "lucide-react";
import { PageShell, Container } from "@/components/layout";
import { Badge, Reveal } from "@/components/clay";
import { ImageLightbox, VideoLightbox } from "@/components/media";
import { usePageMeta } from "@/hooks/usePageMeta";

import { formatDate, getAlbumBySlug } from "@/lib/data";
import type { GalleryAlbum, ImageAsset } from "@/types";

export const Route = createFileRoute("/gallery/$albumSlug")({
  loader: async ({ params }: { params: { albumSlug: string } }) => {
    const album = await getAlbumBySlug(params.albumSlug);
    if (!album) throw notFound();
    return { album };
  },

  notFoundComponent: () => (
    <PageShell>
      <Container className="nss-py-20 nss-text-center">
        <h1 className="nss-font-display nss-text-3xl nss-font-extrabold">Album not found</h1>
        <Link to="/gallery" style={{ display: "inline-block", marginTop: "1rem", color: "var(--primary)" }}>Back to gallery</Link>
      </Container>
    </PageShell>
  ),
  component: AlbumPage,
});

function AlbumPage() {
  const { album } = Route.useLoaderData() as { album: GalleryAlbum };
  const [activeImage, setActiveImage] = useState<ImageAsset | null>(null);
  const [activeVideo, setActiveVideo] = useState<any | null>(null);

  usePageMeta({
    title: album.title,
    description: album.description || `Browse photos from ${album.title} - NSS Unit 466 at KHMHSS Valakkulam.`,
  });

  return (
    <PageShell>
      <Container className="nss-py-10">
        <Badge variant="accent" className="w-fit">{album.type}</Badge>
        <h1 className="nss-mt-2 nss-text-3xl nss-font-extrabold nss-sm-text-4xl" style={{ fontFamily: "var(--font-display)" }}>{album.title}</h1>
        <p className="nss-mt-2 nss-text-sm nss-text-muted">{album.description} - {formatDate(album.date)}</p>
        <div className="nss-mt-8 nss-columns-2 nss-sm-columns-3">
          {album.images.map((image: ImageAsset, index: number) => (
            <Reveal key={image.id} delay={index * 0.04} className="nss-mb-4" style={{ breakInside: "avoid" }}>
              <figure className="nss-card nss-p-0" style={{ overflow: "hidden" }}>
                <button
                  type="button"
                  onClick={() => setActiveImage(image)}
                  aria-label={`Open ${image.alt || image.caption || "album image"}`}
                  style={{ display: "block", width: "100%" }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    width={640}
                    height={480}
                    className="nss-img-zoom"
                    style={{ width: "100%", height: "auto", objectFit: "cover" }}
                  />
                </button>
                {image.caption && <figcaption className="nss-px-3 nss-py-2 nss-text-xs nss-text-muted">{image.caption}</figcaption>}
              </figure>
            </Reveal>
          ))}
        </div>

        {album.videos && album.videos.length > 0 && (
          <div className="nss-mt-12">
            <h2 className="nss-text-2xl nss-font-extrabold nss-mb-6" style={{ fontFamily: "var(--font-display)" }}>Videos</h2>
            <div className="nss-grid nss-gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))" }}>
              {album.videos.map((video, index) => (
                <Reveal key={video.slug} delay={index * 0.04}>
                  <figure className="nss-card nss-p-0 nss-flex nss-flex-col" style={{ overflow: "hidden" }}>
                    <div style={{ position: "relative", aspectRatio: "16/9" }}>
                      {video.thumbnail ? (
                        <img src={video.thumbnail} alt={video.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", background: "var(--clay-deep)" }} />
                      )}
                      <button type="button" onClick={() => setActiveVideo(video)} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.3)" }} className="nss-transition-opacity hover:nss-opacity-100" aria-label={`Play ${video.title}`}>
                         <PlayCircle style={{ height: "3rem", width: "3rem", color: "#fff", opacity: 0.9 }} />
                      </button>
                    </div>
                    <div className="nss-p-4">
                      <h3 className="nss-font-bold nss-text-sm nss-line-clamp-1">{video.title}</h3>
                      {video.duration && <p className="nss-mt-1 nss-text-xs nss-text-muted">{video.duration}</p>}
                    </div>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </Container>
      <ImageLightbox image={activeImage} onClose={() => setActiveImage(null)} />
      <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
    </PageShell>
  );
}
