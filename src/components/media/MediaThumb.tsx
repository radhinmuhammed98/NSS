import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { ExternalLink, Play, X } from "lucide-react";
interface VideoClip {
  slug?: string;
  title: string;
  url: string;
  thumbnail?: string;
  duration?: string;
  description?: any;
}

export function getVideoUrl(video: Pick<VideoClip, "url">): string {
  if (typeof video.url === "string") return video.url.trim();
  if (video.url && typeof video.url === "object") {
    return ((video.url as { asset?: { url?: string } }).asset?.url || "").trim();
  }
  return "";
}

export function hasPlayableVideo(video: Pick<VideoClip, "url">): boolean {
  return getVideoUrl(video).length > 0;
}

function isDirectVideoUrl(url: string): boolean {
  if (!url) return false;
  if (url.startsWith("/") || url.startsWith("blob:") || url.startsWith("data:video/")) return true;

  try {
    const parsed = new URL(url);
    return /\.(mp4|m4v|mov|webm|ogv)(?:$|[?#])/i.test(parsed.pathname);
  } catch {
    return /\.(mp4|m4v|mov|webm|ogv)(?:$|[?#])/i.test(url);
  }
}

function textFromValue(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (!Array.isArray(value)) return "";
  return value
    .map((block) => {
      const children = typeof block === "object" && block ? (block as { children?: unknown }).children : null;
      if (!Array.isArray(children)) return "";
      return children
        .map((child) => typeof child === "object" && child && "text" in child ? String((child as { text?: string }).text ?? "") : "")
        .join("");
    })
    .filter(Boolean)
    .join(" ")
    .trim();
}

export function MediaThumb({ video }: { video: VideoClip }) {
  const [open, setOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const urlString = getVideoUrl(video);
  const directVideo = isDirectVideoUrl(urlString);
  const description = textFromValue(video.description);

  const playCurrentVideo = useCallback(() => {
    const node = videoRef.current;
    if (!node) return;
    const playAttempt = node.play();
    if (playAttempt) playAttempt.catch(() => undefined);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    if (videoRef.current) videoRef.current.pause();
  }, []);

  useEffect(() => {
    if (!open || !directVideo) return;
    const frame = window.requestAnimationFrame(playCurrentVideo);
    return () => window.cancelAnimationFrame(frame);
  }, [open, directVideo, playCurrentVideo, urlString]);

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  if (!hasPlayableVideo(video)) return null;

  return (
    <>
      <div className="nss-card nss-p-0">
        <button
          type="button"
          onClick={() => {
            flushSync(() => {
              setVideoError(false);
              setOpen(true);
            });
            if (directVideo) playCurrentVideo();
          }}
          style={{
            position: "relative",
            aspectRatio: "16/9",
            width: "100%",
            overflow: "hidden",
            borderRadius: "var(--radius-xl) var(--radius-xl) 0 0",
            background: "var(--clay-deep)",
            display: "block",
          }}
          aria-label={`Play video: ${video.title}`}
          aria-haspopup="dialog"
        >
          {video.thumbnail ? (
            <img
              src={video.thumbnail}
              alt=""
              loading="lazy"
              decoding="async"
              className="nss-img-zoom"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : (
            <span className="nss-flex nss-items-center nss-justify-center nss-text-sm nss-text-muted" style={{ height: "100%" }}>
              {video.title}
            </span>
          )}
          <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span
              className="nss-play-btn"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "3.75rem",
                height: "3.75rem",
                borderRadius: "50%",
                background: "hsl(15 65% 38% / 0.92)",
                boxShadow: "0 6px 24px hsl(15 65% 38% / 0.4)",
              }}
            >
              <Play style={{ height: "1.25rem", width: "1.25rem", transform: "translateX(2px)", fill: "#fff", color: "#fff" }} aria-hidden />
            </span>
          </span>
          {video.duration && (
            <span
              aria-hidden
              style={{
                position: "absolute",
                bottom: "0.625rem",
                right: "0.625rem",
                borderRadius: "var(--radius-md)",
                background: "hsl(140 10% 6% / 0.72)",
                padding: "2px 8px",
                fontSize: "11px",
                fontWeight: 700,
                color: "#fff",
              }}
            >
              {video.duration}
            </span>
          )}
        </button>
        <div className="nss-p-4">
          <p className="nss-font-semibold nss-leading-tight nss-break-words">{video.title}</p>
          {description && <p className="nss-mt-1 nss-text-sm nss-leading-relaxed nss-text-muted">{description}</p>}
        </div>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Video: ${video.title}`}
          style={{ position: "fixed", inset: 0, zIndex: 110, display: "grid", placeItems: "center", padding: "clamp(1rem, 3vw, 2rem)" }}
        >
          <button type="button" className="nss-modal-backdrop" onClick={close} aria-label="Close video player" style={{ cursor: "pointer" }} />
          <div className="nss-card nss-p-0 nss-modal-panel" style={{ position: "relative", zIndex: 111, width: "min(100%, 58rem)", overflow: "hidden" }}>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={close}
              aria-label="Close video player"
              style={{ position: "absolute", right: "0.75rem", top: "0.75rem", zIndex: 112, display: "flex", alignItems: "center", justifyContent: "center", height: "2.5rem", width: "2.5rem", borderRadius: "50%", background: "hsl(140 10% 6% / 0.72)", color: "#fff" }}
            >
              <X style={{ height: "1.1rem", width: "1.1rem" }} aria-hidden />
            </button>
            {directVideo && !videoError ? (
              <video
                ref={videoRef}
                src={urlString}
                poster={video.thumbnail || undefined}
                controls
                playsInline
                autoPlay
                muted
                preload="metadata"
                onError={() => setVideoError(true)}
                onLoadedMetadata={playCurrentVideo}
                onCanPlay={() => {
                  setVideoError(false);
                  playCurrentVideo();
                }}
                style={{ aspectRatio: "16/9", width: "100%", maxHeight: "76vh", display: "block", background: "#000", objectFit: "contain" }}
                aria-label={video.title}
              />
            ) : (
              <div className="nss-flex nss-flex-col nss-items-center nss-justify-center nss-gap-4 nss-p-8" style={{ minHeight: "18rem", background: "var(--surface-elevated)", textAlign: "center" }}>
                <p className="nss-font-display nss-text-xl nss-font-bold">Open this video</p>
                <a className="nss-button nss-button-primary" href={urlString} target="_blank" rel="noreferrer">
                  Open video <ExternalLink style={{ height: "1rem", width: "1rem" }} />
                </a>
              </div>
            )}
            <div className="nss-p-4">
              <p className="nss-font-display nss-font-bold">{video.title}</p>
              {description && <p className="nss-mt-1 nss-text-sm nss-leading-relaxed nss-text-muted">{description}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
