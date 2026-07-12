import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Images } from "lucide-react";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { Reveal, EmptyState, Badge } from "@/components/clay";
import { usePageMeta } from "@/hooks/usePageMeta";
import { getAlbums, formatDate } from "@/lib/data";
import type { GalleryAlbum } from "@/types";

// Canonical display order for categories
const CATEGORY_ORDER: string[] = [
  "Group Photos",
  "Camp Memories",
  "Reels & Videos",
  "Posters & Artwork",
  "Awards & Certificates",
  "Newspaper Clippings",
  "Campus & NSS Life",
  "Other",
];

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

export const Route = createFileRoute("/gallery_")({
  loader: async () => {
    const all = await getAlbums();
    return { albums: all.filter((a) => a.slug) };
  },
  component: Gallery,
});

function Gallery() {
  const { albums } = Route.useLoaderData() as { albums: GalleryAlbum[] };
  const [activeCategory, setActiveCategory] = useState<string>("All");

  usePageMeta({
    title: "Gallery",
    description:
      "Browse photo albums from NSS Unit 466 — group photos, camp memories, awards, posters, and more.",
  });

  // Build unique categories that actually have albums, in display order
  const categoriesWithData = useMemo(() => {
    const present = new Set(albums.map((a) => a.category || a.type || "Other"));
    const ordered = CATEGORY_ORDER.filter((c) => present.has(c));
    // Append any unknown categories not in the canonical list
    [...present].forEach((c) => { if (!CATEGORY_ORDER.includes(c)) ordered.push(c); });
    return ordered;
  }, [albums]);

  // Filter to active category (or show all)
  const visible = useMemo(() => {
    if (activeCategory === "All") return albums;
    return albums.filter((a) => (a.category || a.type || "Other") === activeCategory);
  }, [albums, activeCategory]);

  // Group visible albums by category
  const grouped = useMemo(() => {
    const map = new Map<string, GalleryAlbum[]>();
    for (const album of visible) {
      const cat = album.category || album.type || "Other";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(album);
    }
    // Return in display order
    const result: { category: string; albums: GalleryAlbum[] }[] = [];
    const allCats = activeCategory === "All" ? categoriesWithData : [activeCategory];
    for (const cat of allCats) {
      const list = map.get(cat);
      if (list && list.length > 0) result.push({ category: cat, albums: list });
    }
    return result;
  }, [visible, categoriesWithData, activeCategory]);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Gallery"
        title="Photo Albums"
        description="Memories preserved album by album — automatically organised by category."
      />
      <Container className="nss-py-8">

        {/* ── Category tab bar ─────────────────────────────────── */}
        <div
          role="tablist"
          aria-label="Filter by category"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "2rem",
          }}
        >
          {["All", ...categoriesWithData].map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.375rem 0.875rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.8125rem",
                  fontWeight: isActive ? 700 : 600,
                  border: isActive
                    ? "2px solid var(--primary)"
                    : "1.5px solid var(--border)",
                  background: isActive ? "var(--primary)" : "var(--surface-elevated)",
                  color: isActive ? "#fff" : "var(--foreground)",
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {cat !== "All" && (
                  <span aria-hidden style={{ fontSize: "0.9rem" }}>
                    {CATEGORY_ICONS[cat] ?? "📁"}
                  </span>
                )}
                {cat}
              </button>
            );
          })}
        </div>

        {/* ── Category groups ───────────────────────────────────── */}
        {grouped.length === 0 ? (
          <EmptyState message="No albums yet. Check back soon!" />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {grouped.map(({ category, albums: catAlbums }) => (
              <section key={category} aria-labelledby={`cat-${category}`}>
                {/* Category heading — only show when "All" is selected */}
                {activeCategory === "All" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.625rem",
                      marginBottom: "1.25rem",
                      paddingBottom: "0.75rem",
                      borderBottom: "2px solid var(--clay-deep)",
                    }}
                  >
                    <span aria-hidden style={{ fontSize: "1.25rem" }}>
                      {CATEGORY_ICONS[category] ?? "📁"}
                    </span>
                    <h2
                      id={`cat-${category}`}
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "var(--foreground)",
                        margin: 0,
                      }}
                    >
                      {category}
                    </h2>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "var(--muted-foreground)",
                        marginLeft: "auto",
                      }}
                    >
                      {catAlbums.length} album{catAlbums.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}

                <div
                  className="nss-grid nss-gap-5 nss-sm-grid-cols-2 nss-lg-grid-cols-3"
                >
                  {catAlbums.map((album, i) => (
                    <Reveal key={album.slug} delay={i * 0.05}>
                      <GalleryAlbumCard album={album} />
                    </Reveal>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </Container>
    </PageShell>
  );
}

// ── Inline album card ─────────────────────────────────────────────────────────
function GalleryAlbumCard({ album }: { album: GalleryAlbum }) {
  const count = album.imageCount ?? album.images.length;
  const category = album.category || album.type || "Other";

  return (
    <Link
      to="/gallery/$albumSlug"
      params={{ albumSlug: album.slug }}
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
      aria-label={`Open album: ${album.title}`}
    >
      <article
        className="nss-card nss-p-0 nss-card-tilt"
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        {/* Cover */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "var(--radius-xl) var(--radius-xl) 0 0",
            aspectRatio: "4/3",
            background: "var(--clay-deep)",
          }}
        >
          {album.coverImage ? (
            <img
              src={album.coverImage}
              alt={album.title}
              loading="lazy"
              decoding="async"
              className="nss-img-zoom"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                borderRadius: 0,
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                color: "var(--muted-foreground)",
              }}
            >
              <Images style={{ height: "2rem", width: "2rem", opacity: 0.4 }} aria-hidden />
              <span style={{ fontSize: "0.75rem" }}>No cover photo</span>
            </div>
          )}

          {/* Photo count badge */}
          <span
            style={{
              position: "absolute",
              bottom: "0.625rem",
              right: "0.625rem",
              background: "rgba(4,36,19,0.75)",
              color: "#fff",
              fontSize: "11px",
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: "var(--radius-md)",
              backdropFilter: "blur(4px)",
            }}
            aria-label={`${count} photos`}
          >
            {count} {count === 1 ? "photo" : "photos"}
          </span>
        </div>

        {/* Info */}
        <div style={{ padding: "1rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.375rem" }}>
          <Badge variant="outline" className="w-fit" style={{ fontSize: "0.7rem" }}>
            {CATEGORY_ICONS[category] ?? "📁"} {category}
          </Badge>
          <h3
            className="nss-font-display nss-font-bold nss-leading-tight nss-break-words"
            style={{ fontSize: "1rem", marginTop: "0.25rem" }}
          >
            {album.title}
          </h3>
          {album.date && (
            <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "auto", paddingTop: "0.375rem" }}>
              {formatDate(album.date)}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
