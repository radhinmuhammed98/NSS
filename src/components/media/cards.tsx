import { Link } from "@tanstack/react-router";
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import { ClayCard } from "@/components/clay/ClayCard";
import { Badge } from "@/components/clay/Badge";
import { formatDate } from "@/lib/data";
import type { Camp, GalleryAlbum, Highlight, Project, VolunteerStory } from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to="/projects/$projectSlug"
      params={{ projectSlug: project.slug }}
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <ClayCard className="nss-flex nss-flex-col nss-p-0" style={{ height: "100%" }}>
        <div style={{ position: "relative", overflow: "hidden", borderRadius: "var(--radius-xl) var(--radius-xl) 0 0" }}>
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="nss-img-zoom"
              style={{ aspectRatio: "16/9", width: "100%", objectFit: "cover", display: "block", borderRadius: 0 }}
            />
          ) : (
            <div style={{ aspectRatio: "16/9", background: "var(--clay-deep)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>No image</span>
            </div>
          )}
          {project.featured && (
            <span style={{ position: "absolute", left: "0.75rem", top: "0.75rem" }}>
              <Badge variant="accent">★ Featured</Badge>
            </span>
          )}
        </div>
        <div className="nss-flex nss-flex-1 nss-flex-col nss-p-4 nss-sm-p-6">
          <div className="nss-mb-2">
            <Badge>{project.category}</Badge>
          </div>
          <h3 className="nss-font-display nss-text-lg nss-font-bold nss-leading-tight nss-break-words">{project.title}</h3>
          <p className="nss-mt-2 nss-flex-1 nss-text-sm nss-leading-relaxed nss-text-muted">{project.summary}</p>
          <div className="nss-mt-4 nss-flex nss-flex-wrap nss-items-center nss-gap-x-4 nss-gap-y-1 nss-text-xs nss-text-muted" style={{ minWidth: 0 }}>
            <span className="nss-flex nss-items-center nss-gap-1" style={{ flexShrink: 0 }}>
              <Calendar style={{ height: "0.875rem", width: "0.875rem", flexShrink: 0 }} aria-hidden />
              <span style={{ whiteSpace: "nowrap" }}>{formatDate(project.date)}</span>
            </span>
            {project.location && (
              <span className="nss-flex nss-items-center nss-gap-1" style={{ minWidth: 0 }}>
                <MapPin style={{ height: "0.875rem", width: "0.875rem", flexShrink: 0 }} aria-hidden />
                <span className="nss-truncate">{project.location}</span>
              </span>
            )}
          </div>
        </div>
      </ClayCard>
    </Link>
  );
}

export function CampCard({ camp }: { camp: Camp }) {
  return (
    <Link
      to="/camps/$campSlug"
      params={{ campSlug: camp.slug }}
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <ClayCard className="nss-flex nss-flex-col nss-p-0" style={{ height: "100%" }}>
        <div style={{ position: "relative", overflow: "hidden", borderRadius: "var(--radius-xl) var(--radius-xl) 0 0" }}>
          {camp.coverImage ? (
            <img
              src={camp.coverImage}
              alt={camp.title}
              loading="lazy"
              decoding="async"
              className="nss-img-zoom"
              style={{ aspectRatio: "16/9", width: "100%", objectFit: "cover", display: "block", borderRadius: 0 }}
            />
          ) : (
            <div style={{ aspectRatio: "16/9", background: "var(--clay-deep)" }} />
          )}
          {camp.featured && (
            <span style={{ position: "absolute", left: "0.75rem", top: "0.75rem" }}>
              <Badge variant="accent">★ Featured</Badge>
            </span>
          )}
        </div>
        <div className="nss-flex nss-flex-1 nss-flex-col nss-p-4 nss-sm-p-6">
          <Badge variant="outline" className="w-fit">{camp.theme}</Badge>
          <h3 className="nss-mt-2 nss-font-display nss-text-lg nss-font-bold nss-leading-tight nss-break-words">{camp.title}</h3>
          <p className="nss-mt-2 nss-flex-1 nss-text-sm nss-leading-relaxed nss-text-muted">{camp.summary}</p>
          <div className="nss-mt-4 nss-flex nss-flex-wrap nss-items-center nss-gap-x-4 nss-gap-y-1 nss-text-xs nss-text-muted" style={{ minWidth: 0 }}>
            <span className="nss-flex nss-items-center nss-gap-1" style={{ minWidth: 0 }}>
              <MapPin style={{ height: "0.875rem", width: "0.875rem", flexShrink: 0 }} aria-hidden />
              <span className="nss-truncate">{camp.location}</span>
            </span>
            <span className="nss-flex nss-items-center nss-gap-1" style={{ flexShrink: 0 }}>
              <Users style={{ height: "0.875rem", width: "0.875rem", flexShrink: 0 }} aria-hidden />
              <span style={{ whiteSpace: "nowrap" }}>{camp.volunteerCount} volunteers</span>
            </span>
          </div>
        </div>
      </ClayCard>
    </Link>
  );
}

export function HighlightCard({ highlight }: { highlight: Highlight }) {
  return (
    <ClayCard className="nss-flex nss-flex-col nss-p-0">
      <div style={{ overflow: "hidden", borderRadius: "var(--radius-xl) var(--radius-xl) 0 0" }}>
        {highlight.image ? (
          <img
            src={highlight.image}
            alt={highlight.title}
            loading="lazy"
            decoding="async"
            className="nss-img-zoom"
            style={{ aspectRatio: "16/9", width: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div style={{ aspectRatio: "16/9", background: "var(--clay-deep)" }} />
        )}
      </div>
      <div className="nss-flex nss-flex-1 nss-flex-col nss-p-4 nss-sm-p-6">
        <Badge variant="accent" className="w-fit">{highlight.type}</Badge>
        <h3 className="nss-mt-2 nss-font-display nss-text-lg nss-font-bold nss-leading-tight nss-break-words">{highlight.title}</h3>
        <p className="nss-mt-2 nss-flex-1 nss-text-sm nss-leading-relaxed nss-text-muted">{highlight.description}</p>
        <p className="nss-mt-3 nss-text-xs nss-text-muted">{formatDate(highlight.date)}</p>
      </div>
    </ClayCard>
  );
}

export function AlbumCard({ album }: { album: GalleryAlbum }) {
  return (
    <Link
      to="/gallery/$albumSlug"
      params={{ albumSlug: album.slug }}
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <ClayCard className="nss-flex nss-flex-col nss-p-0" style={{ height: "100%" }}>
        <div style={{ overflow: "hidden", borderRadius: "var(--radius-xl) var(--radius-xl) 0 0" }}>
          {album.coverImage ? (
            <img
              src={album.coverImage}
              alt={album.title}
              loading="lazy"
              decoding="async"
              className="nss-img-zoom"
              style={{ aspectRatio: "4/3", width: "100%", objectFit: "cover", display: "block", borderRadius: 0 }}
            />
          ) : (
            <div style={{ aspectRatio: "4/3", background: "var(--clay-deep)" }} />
          )}
        </div>
        <div className="nss-p-4 nss-sm-p-6">
          <Badge variant="outline">{album.type}</Badge>
          <h3 className="nss-mt-2 nss-font-display nss-text-lg nss-font-bold nss-leading-tight nss-break-words">{album.title}</h3>
          <p className="nss-mt-1 nss-text-sm nss-leading-relaxed nss-text-muted">
            {album.images.length} photos · {formatDate(album.date)}
          </p>
        </div>
      </ClayCard>
    </Link>
  );
}

export function StoryCard({ story }: { story: VolunteerStory }) {
  return (
    <ClayCard className="nss-flex nss-flex-col">
      <p
        className="nss-font-display nss-text-lg nss-font-semibold nss-leading-snug nss-text-balance"
        style={{ color: "var(--primary)" }}
      >
        &ldquo;{story.quote}&rdquo;
      </p>
      <p className="nss-mt-4 nss-flex-1 nss-text-sm nss-text-muted nss-leading-relaxed">{story.story}</p>
      <div className="nss-mt-5 nss-flex nss-items-center nss-gap-3">
        {story.photo && (
          <img
            src={story.photo}
            alt={story.name}
            loading="lazy"
            decoding="async"
            style={{
              height: "2.75rem",
              width: "2.75rem",
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0,
              border: "2px solid var(--border)",
            }}
          />
        )}
        <div style={{ minWidth: 0 }}>
          <p className="nss-text-sm nss-font-semibold nss-truncate">{story.name}</p>
          <p className="nss-text-xs nss-text-muted nss-truncate">{story.title}</p>
        </div>
      </div>
    </ClayCard>
  );
}

export { ArrowRight };
