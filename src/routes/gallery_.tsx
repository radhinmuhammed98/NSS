import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Calendar, FileText, Images, Search, Users } from "lucide-react";
import { PageShell, PageHeader, Container } from "@/components/layout";
import { Reveal, EmptyState, Badge } from "@/components/clay";
import { usePageMeta } from "@/hooks/usePageMeta";
import { getAlbums, formatDate } from "@/lib/data";
import type { GalleryAlbum } from "@/types";

const CATEGORIES = [
  { value: "Group Photos",          label: "Group Photos",          icon: "👥" },
  { value: "Camp Memories",         label: "Camp Memories",         icon: "🏕️" },
  { value: "Reels & Videos",        label: "Reels & Videos",        icon: "🎬" },
  { value: "Posters & Artwork",     label: "Posters & Artwork",     icon: "🎨" },
  { value: "Awards & Certificates", label: "Awards & Certificates", icon: "🏆" },
  { value: "Newspaper Coverage",    label: "Newspaper Coverage",    icon: "📰" },
  { value: "Campus & NSS Life",     label: "Campus & NSS Life",     icon: "🌿" },
  { value: "Awareness Programs",    label: "Awareness Programs",    icon: "📢" },
  { value: "Blood Donation",        label: "Blood Donation",        icon: "🩸" },
  { value: "Children's Day",       label: "Children's Day",       icon: "🎈" },
  { value: "Field Visits",          label: "Field Visits",          icon: "🚌" },
  { value: "Other",                 label: "Other",                 icon: "📁" }
];

export const Route = createFileRoute("/gallery_")({
  loader: async () => {
    const all = await getAlbums();
    return { albums: all.filter((a) => a.slug) };
  },
  component: GalleryArchive,
});

function GalleryArchive() {
  const { albums } = Route.useLoaderData() as { albums: GalleryAlbum[] };
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("All");
  const [batchFilter, setBatchFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(9);

  usePageMeta({
    title: "NSS Media Archive",
    description: "Browse photo albums, camp memories, posters, certificates, and video reels from NSS Unit 466.",
  });

  // Extract years and batches for filters
  const years = useMemo(() => {
    return [...new Set(albums.map((a) => a.year).filter(Boolean))].sort((a, b) => b - a);
  }, [albums]);

  const batches = useMemo(() => {
    return [...new Set(albums.map((a) => a.batchName).filter(Boolean))].sort();
  }, [albums]);

  // Count albums in each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    albums.forEach((a) => {
      const cat = a.category || a.type || "Other";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [albums]);

  // Filtered albums
  const filtered = useMemo(() => {
    return albums.filter((a) => {
      const cat = a.category || a.type || "Other";
      const matchesCategory = activeCategory === "All" || cat === activeCategory;
      const matchesSearch = search.trim() === "" || a.title.toLowerCase().includes(search.toLowerCase());
      const matchesYear = yearFilter === "All" || String(a.year) === yearFilter;
      const matchesBatch = batchFilter === "All" || a.batchName === batchFilter;
      return matchesCategory && matchesSearch && matchesYear && matchesBatch;
    });
  }, [albums, activeCategory, search, yearFilter, batchFilter]);

  const visibleAlbums = useMemo(() => {
    return filtered.slice(0, visibleCount);
  }, [filtered, visibleCount]);

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(9);
  };

  const handleResetFilters = () => {
    setActiveCategory("All");
    setSearch("");
    setYearFilter("All");
    setBatchFilter("All");
    setVisibleCount(9);
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Media Archive"
        title="NSS Gallery"
        description="A long-term digital record of service, campaigns, and memories."
      />
      <Container className="nss-py-8">

        {/* ── 1. Category Overview (Only shown when no specific category is selected) ── */}
        {activeCategory === "All" && (
          <section className="nss-mb-10">
            <h2 className="nss-font-display nss-text-xl nss-font-bold nss-mb-4">Browse by Category</h2>
            <div className="nss-grid nss-grid-cols-2 nss-gap-3 nss-sm-grid-cols-3 nss-lg-grid-cols-4">
              {CATEGORIES.map((cat) => {
                const count = categoryCounts[cat.value] || 0;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => handleCategorySelect(cat.value)}
                    className="nss-card nss-p-4 nss-flex nss-flex-col nss-items-center nss-justify-center nss-text-center nss-card-tilt"
                    style={{
                      backgroundColor: "var(--surface-elevated)",
                      border: "1px solid var(--border)",
                      minHeight: "7rem",
                    }}
                  >
                    <span style={{ fontSize: "2rem", marginBottom: "0.5rem" }} aria-hidden>
                      {cat.icon}
                    </span>
                    <span className="nss-font-semibold nss-text-sm nss-leading-tight" style={{ color: "var(--foreground)" }}>
                      {cat.label}
                    </span>
                    <span className="nss-text-xs nss-text-muted nss-mt-1">
                      {count} album{count !== 1 ? "s" : ""}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* ── 2. Active Category Title & Back Navigation ── */}
        {activeCategory !== "All" && (
          <div className="nss-flex nss-flex-col nss-items-start nss-gap-2 nss-mb-6">
            <button
              type="button"
              onClick={() => handleCategorySelect("All")}
              className="nss-button nss-button-soft"
              style={{ padding: "0.5rem 1rem", minHeight: "auto", display: "inline-flex", gap: "0.375rem" }}
            >
              <ArrowLeft size={16} /> All Categories
            </button>
            <div className="nss-flex nss-items-center nss-gap-2 nss-mt-2">
              <span style={{ fontSize: "2rem" }} aria-hidden>
                {CATEGORIES.find((c) => c.value === activeCategory)?.icon || "📁"}
              </span>
              <h2 className="nss-font-display nss-text-2xl nss-font-extrabold m-0">
                {activeCategory}
              </h2>
              <Badge variant="outline">{filtered.length} albums</Badge>
            </div>
          </div>
        )}

        {/* ── 3. Filters & Search Box ── */}
        <div
          className="nss-card nss-p-4 nss-mb-6"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            backgroundColor: "var(--surface)",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
            
            {/* Search Input */}
            <div style={{ position: "relative", flex: "1 1 200px" }}>
              <span style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)" }}>
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search albums by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.625rem 0.75rem 0.625rem 2.25rem",
                  borderRadius: "var(--radius-full)",
                  border: "1px solid var(--border)",
                  background: "var(--background)",
                  color: "var(--foreground)",
                  fontSize: "0.875rem",
                }}
              />
            </div>

            {/* Year Dropdown */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span className="nss-text-xs nss-font-semibold nss-text-muted">Year:</span>
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                style={{
                  padding: "0.5rem 1.5rem 0.5rem 0.75rem",
                  borderRadius: "var(--radius-full)",
                  border: "1px solid var(--border)",
                  background: "var(--background)",
                  color: "var(--foreground)",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                }}
              >
                <option value="All">All Years</option>
                {years.map((y) => (
                  <option key={y} value={String(y)}>{y}</option>
                ))}
              </select>
            </div>

            {/* Batch Dropdown */}
            {batches.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span className="nss-text-xs nss-font-semibold nss-text-muted">Batch:</span>
                <select
                  value={batchFilter}
                  onChange={(e) => setBatchFilter(e.target.value)}
                  style={{
                    padding: "0.5rem 1.5rem 0.5rem 0.75rem",
                    borderRadius: "var(--radius-full)",
                    border: "1px solid var(--border)",
                    background: "var(--background)",
                    color: "var(--foreground)",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                  }}
                >
                  <option value="All">All Batches</option>
                  {batches.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Reset Button (If active filters exist) */}
            {(search || yearFilter !== "All" || batchFilter !== "All" || activeCategory !== "All") && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="nss-text-xs nss-font-semibold text-primary"
                style={{ textDecoration: "underline", marginLeft: "auto" }}
              >
                Clear all filters
              </button>
            )}

          </div>
        </div>

        {/* ── 4. Albums Listing ── */}
        <h2 className="nss-font-display nss-text-xl nss-font-bold nss-mb-4">
          {activeCategory === "All" ? "All Archive Albums" : "Albums"} ({filtered.length})
        </h2>

        {visibleAlbums.length > 0 ? (
          <>
            <div className="nss-grid nss-gap-5 nss-sm-grid-cols-2 nss-lg-grid-cols-3">
              {visibleAlbums.map((album, i) => (
                <Reveal key={album.slug} delay={i * 0.04}>
                  <ArchiveAlbumCard album={album} />
                </Reveal>
              ))}
            </div>

            {/* Pagination / Load More */}
            {filtered.length > visibleCount && (
              <div className="nss-flex nss-justify-center nss-mt-8">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 9)}
                  className="nss-button nss-button-primary"
                >
                  Load More Albums
                </button>
              </div>
            )}
          </>
        ) : (
          <EmptyState message="No albums found matching your search and filter criteria." />
        )}

      </Container>
    </PageShell>
  );
}

// ── Gallery Album Card ──
function ArchiveAlbumCard({ album }: { album: GalleryAlbum }) {
  const count = album.imageCount ?? album.images.length;
  const category = album.category || album.type || "Other";
  const icon = CATEGORIES.find((c) => c.value === category)?.icon || "📁";

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
        {/* Cover Image */}
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

          {/* Counts Badge */}
          <span
            style={{
              position: "absolute",
              bottom: "0.625rem",
              right: "0.625rem",
              background: "rgba(4,36,19,0.78)",
              color: "#fff",
              fontSize: "11px",
              fontWeight: 700,
              padding: "3px 8px",
              borderRadius: "var(--radius-md)",
              backdropFilter: "blur(4px)",
            }}
          >
            {count} photo{count !== 1 ? "s" : ""}
            {album.videos && album.videos.length > 0 && ` · ${album.videos.length} vid`}
          </span>
        </div>

        {/* Info Area */}
        <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div className="nss-flex nss-flex-wrap nss-gap-2">
            <Badge variant="outline" style={{ fontSize: "10px" }}>
              {icon} {category}
            </Badge>
            {album.batchName && (
              <Badge variant="soft" style={{ fontSize: "10px", textTransform: "none" }}>
                {album.batchName}
              </Badge>
            )}
          </div>

          <h3
            className="nss-font-display nss-font-bold nss-leading-tight nss-break-words"
            style={{ fontSize: "1.05rem", marginTop: "0.25rem" }}
          >
            {album.title}
          </h3>

          {album.description && (
            <p className="nss-text-xs nss-text-muted nss-line-clamp-2" style={{ marginTop: "0.25rem" }}>
              {album.description}
            </p>
          )}

          <div style={{ marginTop: "auto", paddingTop: "0.75rem", display: "flex", justifyContent: "between", alignItems: "center", borderTop: "1px solid var(--border)", fontSize: "11px", color: "var(--muted-foreground)" }}>
            <span className="nss-flex nss-items-center nss-gap-1">
              <Calendar size={12} /> {formatDate(album.date)}
            </span>
            {album.relatedActivityTitle && (
              <span className="nss-truncate" style={{ maxWidth: "10rem", marginLeft: "auto", textAlign: "right" }} title={`Related to: ${album.relatedActivityTitle}`}>
                🔗 {album.relatedActivityTitle}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
