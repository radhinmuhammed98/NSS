import { useCallback, useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import type { VideoClip } from "@/types";

/**
 * MediaThumb — video thumbnail with modal HTML5 player on click (Vanilla CSS implementation)
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
      <div className="nss-card nss-p-0">
        <div style={{ position: "relative", aspectRatio: "16/9", width: "100%", backgroundColor: "var(--clay-deep)" }}>
          <button
            type="button"
            onClick={() => setOpen(true)}
            style={{ position: "relative", height: "100%", width: "100%", display: "block" }}
            aria-label={`Play video: ${video.title}`}
            aria-haspopup="dialog"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              loading="lazy"
              decoding="async"
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
            <span
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(27, 28, 25, 0.20)",
                transition: "background-color 0.15s ease"
              }}
            >
              <span className="nss-badge-accent nss-flex nss-items-center nss-justify-center" style={{ height: "3.5rem", width: "3.5rem", borderRadius: "50%" }}>
                <Play style={{ height: "1.5rem", width: "1.5rem", transform: "translateX(2px)", fill: "currentColor" }} aria-hidden />
              </span>
            </span>
            <span
              style={{
                position: "absolute",
                bottom: "0.5rem",
                right: "0.5rem",
                borderRadius: "var(--radius-md)",
                backgroundColor: "rgba(27, 28, 25, 0.70)",
                padding: "2px 8px",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--background)"
              }}
            >
              {video.duration}
            </span>
          </button>
        </div>
        <div className="nss-p-4 nss-sm-p-6">
          <p className="nss-font-semibold nss-leading-tight nss-break-words">{video.title}</p>
          <p className="nss-mt-2 nss-text-sm nss-leading-relaxed nss-text-muted">{video.description}</p>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Video player: ${video.title}`}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem"
          }}
        >
          {/* Backdrop */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(27, 28, 25, 0.8)",
              backdropFilter: "blur(4px)"
            }}
            onClick={close}
            aria-hidden="true"
          />

          {/* Player panel */}
          <div className="nss-card nss-p-0" style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "48rem" }}>
            {/* Close button */}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={close}
              aria-label="Close video player"
              style={{
                position: "absolute",
                right: "0.75rem",
                top: "0.75rem",
                zIndex: 20,
                display: "flex",
                height: "2rem",
                width: "2rem",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                backgroundColor: "rgba(27, 28, 25, 0.7)",
                color: "var(--background)"
              }}
            >
              <X style={{ height: "1rem", width: "1rem" }} aria-hidden />
            </button>

            {/* Native video element */}
            <video
              ref={videoRef}
              src={video.url}
              controls
              autoPlay
              playsInline
              preload="metadata"
              style={{ aspectRatio: "16/9", width: "100%", backgroundColor: "#000000" }}
              aria-label={video.title}
            />

            {/* Caption bar */}
            <div className="nss-p-4 nss-sm-p-6">
              <p className="nss-font-display nss-font-bold">{video.title}</p>
              {video.description && (
                <p className="nss-mt-2 nss-text-sm nss-leading-relaxed nss-text-muted">{video.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
