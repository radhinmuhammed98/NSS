import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Calendar, Users } from "lucide-react";
import { ClayCard } from "@/components/clay/ClayCard";
import { Badge } from "@/components/clay/Badge";

import { formatDate, getBatchTitle } from "@/lib/data";
import type {
  Batch,
  Camp,
  GalleryAlbum,
  Highlight,
  Project,
  VolunteerStory,
} from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to="/projects/$projectSlug" params={{ projectSlug: project.slug }} style={{ display: "block", height: "100%" }}>
      <ClayCard className="nss-flex nss-flex-col nss-p-0" style={{ minHeight: "340px" }}>
        <div style={{ position: "relative", overflow: "hidden", borderTopLeftRadius: "var(--radius-lg)", borderTopRightRadius: "var(--radius-lg)" }}>
          <img
            src={project.coverImage}
            alt={project.title}
            loading="lazy"
            decoding="async"
            style={{ aspectRatio: "16/9", width: "100%", objectFit: "cover" }}
          />
          {project.featured && (
            <span style={{ position: "absolute", left: "0.75rem", top: "0.75rem" }}>
              <Badge variant="accent">★ Featured</Badge>
            </span>
          )}
        </div>
        <div className="nss-flex nss-flex-1 nss-flex-col nss-p-4 nss-sm-p-6">
          <div className="nss-mb-2 nss-flex nss-flex-wrap nss-gap-2">
            <Badge>{project.category}</Badge>
            <Badge variant="outline">{getBatchTitle(project.batchSlug)}</Badge>
          </div>
          <h3 className="nss-font-display nss-text-lg nss-font-bold nss-leading-tight nss-break-words">{project.title}</h3>
          <p className="nss-mt-2 nss-flex-1 nss-text-sm nss-leading-relaxed nss-text-muted">
            {project.summary}
          </p>
          <div className="nss-mt-4 nss-flex nss-flex-wrap nss-items-center nss-gap-4 nss-text-xs nss-text-muted">
            <span className="nss-flex nss-items-center nss-gap-1">
              <Calendar style={{ height: "0.875rem", width: "0.875rem" }} aria-hidden /> {formatDate(project.date)}
            </span>
            <span className="nss-flex nss-items-center nss-gap-1">
              <MapPin style={{ height: "0.875rem", width: "0.875rem" }} aria-hidden /> {project.location}
            </span>
          </div>
        </div>
      </ClayCard>
    </Link>
  );
}

export function BatchCard({ batch }: { batch: Batch }) {
  return (
    <Link to="/batches/$batchSlug" params={{ batchSlug: batch.slug }} style={{ display: "block", height: "100%" }}>
      <ClayCard className="nss-flex nss-flex-col nss-p-0" style={{ minHeight: "340px" }}>
        <img
          src={batch.coverImage}
          alt={batch.title}
          loading="lazy"
          decoding="async"
          style={{ aspectRatio: "16/9", width: "100%", borderTopLeftRadius: "var(--radius-lg)", borderTopRightRadius: "var(--radius-lg)", objectFit: "cover" }}
        />
        <div className="nss-flex nss-flex-1 nss-flex-col nss-p-4 nss-sm-p-6">
          <div className="nss-mb-2 nss-flex nss-flex-wrap nss-items-center nss-gap-2">
            <Badge variant="accent">{batch.yearRange}</Badge>
            {batch.featured && <Badge>Active</Badge>}
          </div>
          <h3 className="nss-font-display nss-text-xl nss-font-bold nss-leading-tight nss-break-words">{batch.title}</h3>
          <p className="nss-mt-2 nss-flex-1 nss-text-sm nss-leading-relaxed nss-text-muted">
            {batch.description}
          </p>
          <div className="nss-mt-4 nss-grid nss-grid-cols-3 nss-gap-2 nss-text-center">
            {batch.impactMetrics.slice(0, 3).map((m) => (
              <div key={m.label} className="nss-impact-stat" style={{ padding: "0.5rem" }}>
                <p className="nss-font-display nss-text-base nss-font-extrabold nss-text-primary">
                  {m.value}
                </p>
                <p className="nss-text-xs nss-text-muted" style={{ fontSize: "10px" }}>{m.label}</p>
              </div>
            ))}
          </div>
          <span className="nss-mt-4 nss-flex nss-items-center nss-gap-1 nss-text-sm nss-font-semibold nss-text-primary">
            View legacy <ArrowRight style={{ height: "1rem", width: "1rem" }} aria-hidden />
          </span>
        </div>
      </ClayCard>
    </Link>
  );
}

export function CampCard({ camp }: { camp: Camp }) {
  return (
    <Link to="/camps/$campSlug" params={{ campSlug: camp.slug }} style={{ display: "block", height: "100%" }}>
      <ClayCard className="nss-flex nss-flex-col nss-p-0" style={{ minHeight: "340px" }}>
        <div style={{ position: "relative", overflow: "hidden", borderTopLeftRadius: "var(--radius-lg)", borderTopRightRadius: "var(--radius-lg)" }}>
          <img
            src={camp.coverImage}
            alt={camp.title}
            loading="lazy"
            decoding="async"
            style={{ aspectRatio: "16/9", width: "100%", objectFit: "cover" }}
          />
          {camp.featured && (
            <span style={{ position: "absolute", left: "0.75rem", top: "0.75rem" }}>
              <Badge variant="accent">★ Featured</Badge>
            </span>
          )}
        </div>
        <div className="nss-flex nss-flex-1 nss-flex-col nss-p-4 nss-sm-p-6">
          <Badge variant="outline" className="w-fit">{camp.theme}</Badge>
          <h3 className="nss-mt-2 nss-font-display nss-text-lg nss-font-bold nss-leading-tight nss-break-words">{camp.title}</h3>
          <p className="nss-mt-2 nss-flex-1 nss-text-sm nss-leading-relaxed nss-text-muted">
            {camp.summary}
          </p>
          <div className="nss-mt-4 nss-flex nss-flex-wrap nss-items-center nss-gap-4 nss-text-xs nss-text-muted">
            <span className="nss-flex nss-items-center nss-gap-1">
              <MapPin style={{ height: "0.875rem", width: "0.875rem" }} aria-hidden /> {camp.location}
            </span>
            <span className="nss-flex nss-items-center nss-gap-1">
              <Users style={{ height: "0.875rem", width: "0.875rem" }} aria-hidden /> {camp.volunteerCount} volunteers
            </span>
          </div>
        </div>
      </ClayCard>
    </Link>
  );
}

export function HighlightCard({ highlight }: { highlight: Highlight }) {
  return (
    <ClayCard className="nss-flex nss-flex-col nss-p-0" style={{ minHeight: "340px" }}>
      <img
        src={highlight.image}
        alt={highlight.title}
        loading="lazy"
        decoding="async"
        style={{ aspectRatio: "16/10", width: "100%", borderTopLeftRadius: "var(--radius-lg)", borderTopRightRadius: "var(--radius-lg)", objectFit: "cover" }}
      />
      <div className="nss-flex nss-flex-1 nss-flex-col nss-p-4 nss-sm-p-6">
        <Badge variant="accent" className="w-fit">{highlight.type}</Badge>
        <h3 className="nss-mt-2 nss-font-display nss-text-lg nss-font-bold nss-leading-tight nss-break-words">{highlight.title}</h3>
        <p className="nss-mt-2 nss-flex-1 nss-text-sm nss-leading-relaxed nss-text-muted">
          {highlight.description}
        </p>
        <p className="nss-mt-3 nss-text-xs nss-text-muted">
          {getBatchTitle(highlight.batchSlug)}
        </p>
      </div>
    </ClayCard>
  );
}

export function AlbumCard({ album }: { album: GalleryAlbum }) {
  return (
    <Link to="/gallery/$albumSlug" params={{ albumSlug: album.slug }} style={{ display: "block", height: "100%" }}>
      <ClayCard className="nss-flex nss-flex-col nss-p-0" style={{ minHeight: "340px" }}>
        <img
          src={album.coverImage}
          alt={album.title}
          loading="lazy"
          decoding="async"
          style={{ aspectRatio: "4/3", width: "100%", borderTopLeftRadius: "var(--radius-lg)", borderTopRightRadius: "var(--radius-lg)", objectFit: "cover" }}
        />
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
    <ClayCard className="nss-flex nss-flex-col" style={{ minHeight: "240px" }}>
      <p className="nss-font-display nss-text-lg nss-font-semibold nss-leading-snug nss-text-balance">
        &ldquo;{story.quote}&rdquo;
      </p>
      <p className="nss-mt-4 nss-flex-1 nss-text-sm nss-text-muted">{story.story}</p>
      <div className="nss-mt-5 nss-flex nss-items-center nss-gap-3">
        <img
          src={story.photo}
          alt={story.name}
          loading="lazy"
          decoding="async"
          style={{ height: "2.75rem", width: "2.75rem", borderRadius: "50%", objectFit: "cover" }}
        />
        <div style={{ minWidth: 0 }}>
          <p className="nss-text-sm nss-font-semibold">{story.name}</p>
          <p className="nss-text-xs nss-text-muted">
            {getBatchTitle(story.batchSlug)}
          </p>
        </div>
      </div>
    </ClayCard>
  );
}
