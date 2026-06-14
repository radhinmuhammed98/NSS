import { useState } from "react";
import { Play } from "lucide-react";
import type { VideoClip } from "@/types";

/**
 * MediaThumb — video thumbnail with inline play-on-click.
 *
 * Play button uses clay-accent (primary crimson) — a main CTA action.
 */
export function MediaThumb({ video }: { video: VideoClip }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="clay overflow-hidden p-0">
      <div className="relative aspect-video w-full bg-clay-deep">
        {playing ? (
          <video
            className="h-full w-full object-cover"
            src={video.url}
            controls
            autoPlay
            playsInline
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group relative h-full w-full focus-visible:outline-offset-4"
            aria-label={`Play ${video.title}`}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-foreground/20 transition-colors group-hover:bg-foreground/30">
              {/* Play icon in crimson clay pill — justified CTA use */}
              <span className="clay-accent flex h-14 w-14 items-center justify-center rounded-full transition-transform group-hover:scale-110">
                <Play className="h-6 w-6 translate-x-0.5 fill-current" aria-hidden />
              </span>
            </span>
            <span className="absolute bottom-2 right-2 rounded-md bg-foreground/70 px-2 py-0.5 text-xs font-semibold text-background">
              {video.duration}
            </span>
          </button>
        )}
      </div>
      <div className="p-4">
        <p className="font-sans font-semibold">{video.title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{video.description}</p>
      </div>
    </div>
  );
}
