import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/layout";
import { Badge, Reveal } from "@/components/clay";
import { ImageLightbox } from "@/components/media";
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
      </Container>
      <ImageLightbox image={activeImage} onClose={() => setActiveImage(null)} />
    </PageShell>
  );
}
