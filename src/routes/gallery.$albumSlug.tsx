import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/layout";
import { Badge, Reveal } from "@/components/clay";

import { formatDate, getAlbumBySlug } from "@/lib/data";
import type { ImageAsset } from "@/types";

export const Route = createFileRoute("/gallery/$albumSlug")({
  loader: ({ params }) => {
    const album = getAlbumBySlug(params.albumSlug);
    if (!album) throw notFound();
    return { album };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.album;
    return {
      meta: [
        { title: `${a?.title ?? "Album"} | NSS Digital Legacy` },
        { name: "description", content: a?.description ?? "" },
        { property: "og:title", content: a?.title ?? "" },
        { property: "og:description", content: a?.description ?? "" },
        { property: "og:image", content: a?.coverImage ?? "" },
      ],
      links: [{ rel: "canonical", href: `/gallery/${a?.slug}` }],
    };
  },
  notFoundComponent: () => (
    <PageShell>
      <Container className="py-20 text-center">
        <h1 className="font-display text-3xl font-extrabold">Album not found</h1>
        <Link to="/gallery" className="mt-4 inline-block text-primary">← Back to gallery</Link>
      </Container>
    </PageShell>
  ),
  component: AlbumPage,
});

function AlbumPage() {
  const { album } = Route.useLoaderData();
  return (
    <PageShell>
      <Container className="py-10">
        <Badge variant="accent">{album.type}</Badge>
        <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">{album.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{album.description} · {formatDate(album.date)}</p>
        <div className="mt-8 columns-2 gap-4 sm:columns-3">
          {album.images.map((im: ImageAsset, i: number) => (
            <Reveal key={im.id} delay={i * 0.04} className="mb-4 break-inside-avoid">
              <figure className="clay overflow-hidden p-0">
                <img src={im.src} alt={im.alt} loading="lazy" decoding="async" className="w-full object-cover" />
                {im.caption && <figcaption className="px-3 py-2 text-xs text-muted-foreground">{im.caption}</figcaption>}
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </PageShell>
  );
}
