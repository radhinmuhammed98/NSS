import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Calendar, Users } from "lucide-react";
import { ClayCard } from "@/components/clay/ClayCard";
import { Badge } from "@/components/clay/Badge";
import { SafeImage } from "./SafeImage";

import { formatDate, getBatchTitle } from "@/lib/data";
import type { Batch, Camp, GalleryAlbum, Highlight, Project, VolunteerStory } from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to="/projects/$projectSlug" params={{ projectSlug: project.slug }}>
      <ClayCard className="flex h-full flex-col p-0">
        <div className="relative">
          <SafeImage
            src={project.coverImage}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full rounded-t-2xl object-cover"
          />
          {project.featured && (
            <span className="absolute left-3 top-3">
              {/* ★ Featured — gold accent is correct for awards/milestones */}
              <Badge variant="accent">★ Featured</Badge>
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex flex-wrap gap-2">
            <Badge>{project.category}</Badge>
            <Badge variant="outline">{getBatchTitle(project.batchSlug)}</Badge>
          </div>
          <h3 className="font-display text-lg font-bold">{project.title}</h3>
          <p className="mt-2 flex-1 text-sm text-muted-foreground">{project.summary}</p>
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" aria-hidden /> {formatDate(project.date)}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" aria-hidden /> {project.location}
            </span>
          </div>
        </div>
      </ClayCard>
    </Link>
  );
}

export function BatchCard({ batch }: { batch: Batch }) {
  return (
    <Link to="/batches/$batchSlug" params={{ batchSlug: batch.slug }}>
      <ClayCard className="flex h-full flex-col p-0">
        <SafeImage
          src={batch.coverImage}
          alt={batch.title}
          loading="lazy"
          decoding="async"
          className="aspect-[16/9] w-full rounded-t-2xl object-cover"
        />
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center gap-2">
            {/* Year range badge — gold accent because it's a legacy milestone */}
            <Badge variant="accent">{batch.yearRange}</Badge>
            {batch.featured && <Badge>Active</Badge>}
          </div>
          <h3 className="font-display text-xl font-bold">{batch.title}</h3>
          <p className="mt-2 flex-1 text-sm text-muted-foreground">{batch.description}</p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {batch.impactMetrics.slice(0, 3).map((m) => (
              <div key={m.label} className="clay-sm px-2 py-2">
                <p className="font-display text-base font-extrabold text-primary">{m.value}</p>
                <p className="text-[10px] text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
            View legacy <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </ClayCard>
    </Link>
  );
}

export function CampCard({ camp }: { camp: Camp }) {
  return (
    <Link to="/camps/$campSlug" params={{ campSlug: camp.slug }}>
      <ClayCard className="flex h-full flex-col p-0">
        <div className="relative">
          <SafeImage
            src={camp.coverImage}
            alt={camp.title}
            loading="lazy"
            decoding="async"
            className="aspect-[16/9] w-full rounded-t-2xl object-cover"
          />
          {camp.featured && (
            <span className="absolute left-3 top-3">
              <Badge variant="accent">★ Featured</Badge>
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <Badge variant="outline">{camp.theme}</Badge>
          <h3 className="mt-2 font-display text-lg font-bold">{camp.title}</h3>
          <p className="mt-2 flex-1 text-sm text-muted-foreground">{camp.summary}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" aria-hidden /> {camp.location}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" aria-hidden /> {camp.volunteerCount} volunteers
            </span>
          </div>
        </div>
      </ClayCard>
    </Link>
  );
}

export function HighlightCard({ highlight }: { highlight: Highlight }) {
  return (
    <ClayCard className="flex h-full flex-col p-0">
      <SafeImage
        src={highlight.image}
        alt={highlight.title}
        loading="lazy"
        decoding="async"
        className="aspect-[16/10] w-full rounded-t-2xl object-cover"
      />
      <div className="flex flex-1 flex-col p-5">
        <Badge variant="accent">{highlight.type}</Badge>
        <h3 className="mt-2 font-display text-lg font-bold">{highlight.title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{highlight.description}</p>
        <p className="mt-3 text-xs text-muted-foreground">{getBatchTitle(highlight.batchSlug)}</p>
      </div>
    </ClayCard>
  );
}

export function AlbumCard({ album }: { album: GalleryAlbum }) {
  return (
    <Link to="/gallery/$albumSlug" params={{ albumSlug: album.slug }}>
      <ClayCard className="flex h-full flex-col p-0">
        <SafeImage
          src={album.coverImage}
          alt={album.title}
          loading="lazy"
          decoding="async"
          className="aspect-square w-full rounded-t-2xl object-cover"
        />
        <div className="p-5">
          <Badge variant="outline">{album.type}</Badge>
          <h3 className="mt-2 font-display text-lg font-bold">{album.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {album.images.length} photos · {formatDate(album.date)}
          </p>
        </div>
      </ClayCard>
    </Link>
  );
}

export function StoryCard({ story }: { story: VolunteerStory }) {
  return (
    <ClayCard className="flex h-full flex-col">
      {/* Quote in Playfair — editorial legacy statement */}
      <p className="font-display text-lg font-semibold leading-snug text-balance">
        &ldquo;{story.quote}&rdquo;
      </p>
      <p className="mt-4 flex-1 text-sm text-muted-foreground">{story.story}</p>
      <div className="mt-5 flex items-center gap-3">
        <SafeImage
          src={story.photo}
          alt={story.name}
          loading="lazy"
          decoding="async"
          className="h-11 w-11 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold">{story.name}</p>
          <p className="text-xs text-muted-foreground">{getBatchTitle(story.batchSlug)}</p>
        </div>
      </div>
    </ClayCard>
  );
}
