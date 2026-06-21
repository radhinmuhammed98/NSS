import { useCallback, useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import type { VideoClip } from "@/types";
import { SafeImage } from "./SafeImage";

/**
 * MediaThumb — video thumbnail with modal HTML5 player on click.
 *
 * - Clicking the thumbnail opens a backdrop modal with a native <video> element.
 * - Video uses preload="metadata" so only metadata (duration, poster) is fetched
 *   until the user actually opens the player.
 * - Escape key and backdrop click close the modal.
 * - Full keyboard and screen-reader accessible labels.
 */
export function MediaThumb({ video }: { video: VideoClip }) {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  // Keyboard: Escape closes; trap focus on close button when modal opens
  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    // Prevent body scroll while modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <>
      {/* Thumbnail card */}
      <div className="clay overflow-hidden p-0">
        <div className="relative aspect-video w-full bg-clay-deep">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group relative h-full w-full focus-visible:outline-offset-4"
            aria-label={`Play video: ${video.title}`}
            aria-haspopup="dialog"
          >
            <SafeImage
              src={video.thumbnail}
              alt={video.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-foreground/20 transition-colors group-hover:bg-foreground/30">
              {/* Play icon in crimson clay pill */}
              <span className="clay-accent flex h-14 w-14 items-center justify-center rounded-full transition-transform group-hover:scale-110">
                <Play className="h-6 w-6 translate-x-0.5 fill-current" aria-hidden />
              </span>
            </span>
            <span className="absolute bottom-2 right-2 rounded-md bg-foreground/70 px-2 py-0.5 text-xs font-semibold text-background">
              {video.duration}
            </span>
          </button>
        </div>
        <div className="p-4">
          <p className="font-sans font-semibold">{video.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{video.description}</p>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Video player: ${video.title}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-foreground/80 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* Player panel */}
          <div className="clay relative z-10 w-full max-w-3xl overflow-hidden p-0">
            {/* Close button */}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={close}
              aria-label="Close video player"
              className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/70 text-background transition-colors hover:bg-foreground focus-visible:outline-offset-2"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>

            {/* Native video element */}
            <video
              ref={videoRef}
              src={video.url}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="aspect-video w-full bg-black"
              aria-label={video.title}
            />

            {/* Caption bar */}
            <div className="p-4">
              <p className="font-display font-bold">{video.title}</p>
              {video.description && (
                <p className="mt-1 text-sm text-muted-foreground">{video.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
