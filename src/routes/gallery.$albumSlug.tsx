import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageShell, Container } from "@/components/layout";
import { Badge, Reveal } from "@/components/clay";
import { ImageLightbox, VideoLightbox, MediaThumb } from "@/components/media";
import { usePageMeta } from "@/hooks/usePageMeta";

import { formatDate, getAlbumBySlug } from "@/lib/data";
import type { GalleryAlbum, ImageAsset } from "@/types";

const CATEGORY_ICONS: Record<string, string> = {
  "Group Photos":          "👥",
  "Camp Memories":         "🏕️",
  "Reels & Videos":        "🎬",
  "Posters & Artwork":     "🎨",
  "Awards & Certificates": "🏆",
  "Newspaper Clippings":   "📰",
  "Campus & NSS Life":     "🌿",
  "Other":                 "📁",
};

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
        <Link to="/gallery" style={{ display: "inline-block", marginTop: "1rem", color: "var(--primary)" }}>
          ← Back to gallery
        </Link>
      </Container>
    </PageShell>
  ),
  component: AlbumPage,
});

function AlbumPage() {
  const { album } = Route.useLoaderData() as { album: GalleryAlbum };
  const [activeImage, setActiveImage] = useState<ImageAsset | null>(null);
  const [activeVideo, setActiveVideo] = useState<any | null>(null);

  const category = album.category || album.type || "Other";
  const icon = CATEGORY_ICONS[category] ?? "📁";

  usePageMeta({
    title: album.title,
    description:
      album.description ||
      `Browse photos from ${album.title} — NSS Unit 466, KHMHSS Valakkulam.`,
  });

  return (
    <PageShell>
      <Container className="nss-py-8">

        {/* ── Back link ──────────────────────────────────────────── */}
        <Link
          to="/gallery"
          className="nss-button nss-button-soft"
          style={{ marginBottom: "1.5rem", width: "fit-content" }}
        >
          <ArrowLeft style={{ height: "1rem", width: "1rem" }} />
          Gallery
        </Link>

        {/* ── Album header ───────────────────────────────────────── */}
        <div style={{ marginBottom: "2rem" }}>
          <Badge variant="accent" className="w-fit">
            {icon} {category}
          </Badge>
          <h1
            className="nss-mt-2 nss-font-display nss-text-3xl nss-font-extrabold nss-break-words nss-sm-text-4xl"
          >
            {album.title}
          </h1>
          {(album.description || album.date) && (
            <p className="nss-mt-2 nss-text-sm nss-text-muted" style={{ maxWidth: "56rem" }}>
              {album.description}
              {album.description && album.date && " · "}
              {album.date && formatDate(album.date)}
            </p>
          )}
          {album.images.length > 0 && (
            <p className="nss-mt-1 nss-text-xs nss-text-muted">
              {album.images.length} photo{album.images.length !== 1 ? "s" : ""}
              {album.videos && album.videos.length > 0 && ` · ${album.videos.length} video${album.videos.length !== 1 ? "s" : ""}`}
            </p>
          )}
        </div>

        {/* ── Photo masonry grid ─────────────────────────────────── */}
        {album.images.length > 0 ? (
          <div className="nss-columns-1 nss-sm-columns-2 nss-lg-columns-3">
            {album.images.map((image: ImageAsset, index: number) => (
              <Reveal key={image.id} delay={index * 0.03} className="nss-break-inside-avoid nss-mb-4">
                <figure className="nss-card nss-p-0" style={{ overflow: "hidden" }}>
                  <button
                    type="button"
                    onClick={() => setActiveImage(image)}
                    aria-label={`View: ${image.alt || image.caption || "photo"}`}
                    style={{ display: "block", width: "100%", cursor: "zoom-in" }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading={index < 6 ? "eager" : "lazy"}
                      decoding="async"
                      className="nss-img-zoom"
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                        display: "block",
                        borderRadius: 0,
                      }}
                    />
                  </button>
                  {image.caption && (
                    <figcaption className="nss-px-3 nss-py-2 nss-text-xs nss-text-muted">
                      {image.caption}
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 1rem",
              color: "var(--muted-foreground)",
              border: "1.5px dashed var(--border)",
              borderRadius: "var(--radius-xl)",
            }}
          >
            <p style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📷</p>
            <p className="nss-font-semibold">No photos in this album yet.</p>
          </div>
        )}

        {/* ── Videos section ─────────────────────────────────────── */}
        {album.videos && album.videos.length > 0 && (
          <div style={{ marginTop: "3rem" }}>
            <h2
              className="nss-font-display nss-text-2xl nss-font-extrabold nss-mb-6"
            >
              🎬 Videos
            </h2>
            <div className="nss-grid nss-gap-5 nss-sm-grid-cols-2 nss-lg-grid-cols-3">
              {album.videos.map((video, index) => (
                <Reveal key={video.slug || index} delay={index * 0.05}>
                  <MediaThumb video={video} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </Container>

      {/* ── Lightboxes ─────────────────────────────────────────────── */}
      <ImageLightbox image={activeImage} onClose={() => setActiveImage(null)} />
      <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
    </PageShell>
  );
}
