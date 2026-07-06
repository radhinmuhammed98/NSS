import { useCallback, useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import type { VideoClip } from "@/types";

function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    let id = "";

    if (host === "youtu.be") {
      id = parsed.pathname.split("/").filter(Boolean)[0] || "";
    } else if (host.endsWith("youtube.com")) {
      if (parsed.pathname === "/watch") id = parsed.searchParams.get("v") || "";
      if (!id) {
        const parts = parsed.pathname.split("/").filter(Boolean);
        if (["embed", "shorts", "live"].includes(parts[0])) id = parts[1] || "";
      }
    }

    return id.length === 11 ? `https://www.youtube.com/embed/${id}` : null;
  } catch {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|shorts\/|live\/|watch\?v=))([^#&?/\s]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  }
}

function getGoogleDriveEmbedUrl(url: string): string | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("drive.google.com")) return null;

    const fileId = parsed.pathname.match(/\/file\/d\/([^/]+)/)?.[1] || parsed.searchParams.get("id");
    return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : null;
  } catch {
    const fileId = url.match(/drive\.google\.com\/file\/d\/([^/]+)/)?.[1] || url.match(/[?&]id=([^&]+)/)?.[1];
    return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : null;
  }
}

function getVideoUrl(video: VideoClip): string {
  if (typeof video.url === "string") return video.url;
  if (video.url && typeof video.url === "object") {
    return (video.url as { asset?: { url?: string } }).asset?.url || "";
  }
  return "";
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

function getEmbeddedPlayerUrl(url: string): string | null {
  return getYouTubeEmbedUrl(url) || getGoogleDriveEmbedUrl(url);
}

export function MediaThumb({ video }: { video: VideoClip }) {
  const [open, setOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const urlString = getVideoUrl(video);
  const embedUrl = getEmbeddedPlayerUrl(urlString);
  const directVideo = isDirectVideoUrl(urlString);

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
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <>
      {/* Thumbnail */}
      <div className="nss-card nss-p-0">
        <div
          style={{
            position: "relative",
            aspectRatio: "16/9",
            width: "100%",
            overflow: "hidden",
            borderRadius: "var(--radius-xl) var(--radius-xl) 0 0",
            background: "var(--clay-deep)",
          }}
        >
          <button
            type="button"
            onClick={() => {
              setVideoError(false);
              setOpen(true);
            }}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
            aria-label={`Play video: ${video.title}`}
            aria-haspopup="dialog"
          >
            {video.thumbnail && (
              <img
                src={video.thumbnail}
                alt=""
                loading="lazy"
                decoding="async"
                className="nss-img-zoom"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            )}
            <span
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                transition: "background 0.22s ease",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "3.75rem",
                  height: "3.75rem",
                  borderRadius: "50%",
                  background: "hsl(15 65% 38% / 0.92)",
                  boxShadow: "0 6px 24px hsl(15 65% 38% / 0.4)",
                  transition: "transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease",
                }}
                className="nss-play-btn"
              >
                <Play
                  style={{ height: "1.25rem", width: "1.25rem", transform: "translateX(2px)", fill: "#fff", color: "#fff" }}
                  aria-hidden
                />
              </span>
            </span>
          </button>
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
                letterSpacing: "0.03em",
                pointerEvents: "none",
              }}
            >
              {video.duration}
            </span>
          )}
        </div>
        <div className="nss-p-4">
          <p className="nss-font-semibold nss-leading-tight nss-break-words">{video.title}</p>
          {video.description && (
            <p className="nss-mt-1 nss-text-sm nss-leading-relaxed nss-text-muted">{video.description}</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Video: ${video.title}`}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            className="nss-modal-backdrop"
            onClick={close}
            aria-hidden
          />
          <div
            className="nss-card nss-p-0 nss-modal-panel"
            style={{ position: "relative", zIndex: 50, width: "100%", maxWidth: "52rem" }}
          >
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
                alignItems: "center",
                justifyContent: "center",
                height: "2.25rem",
                width: "2.25rem",
                borderRadius: "50%",
                background: "hsl(140 10% 6% / 0.72)",
                color: "#fff",
                transition: "background 0.18s ease, transform 0.18s ease",
              }}
            >
              <X style={{ height: "1rem", width: "1rem" }} aria-hidden />
            </button>
            {(() => {
              if (embedUrl) {
                return (
                  <iframe
                    src={`${embedUrl}?autoplay=1`}
                    title={video.title}
                    style={{
                      aspectRatio: "16/9",
                      width: "100%",
                      minHeight: "260px",
                      display: "block",
                      background: "#000",
                      border: "none",
                      borderRadius: "var(--radius-xl) var(--radius-xl) 0 0",
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                );
              }
              if (!directVideo) {
                return (
                  <div
                    style={{
                      aspectRatio: "16/9",
                      width: "100%",
                      minHeight: "260px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "var(--surface-elevated)",
                      borderRadius: "var(--radius-xl) var(--radius-xl) 0 0",
                      padding: "1rem",
                      textAlign: "center",
                    }}
                  >
                    <a className="nss-button nss-button-primary" href={urlString} target="_blank" rel="noreferrer">
                      Open video
                    </a>
                  </div>
                );
              }
              return (
                <div style={{ position: "relative", background: "var(--surface-elevated)", borderRadius: "var(--radius-xl) var(--radius-xl) 0 0" }}>
                  <video
                    ref={videoRef}
                    src={urlString}
                    poster={video.thumbnail || undefined}
                    controls
                    playsInline
                    autoPlay
                    preload="metadata"
                    onError={() => setVideoError(true)}
                    onCanPlay={() => {
                      setVideoError(false);
                      playCurrentVideo();
                    }}
                    style={{
                      aspectRatio: "16/9",
                      width: "100%",
                      minHeight: "260px",
                      display: "block",
                      background: "var(--surface-elevated)",
                      borderRadius: "var(--radius-xl) var(--radius-xl) 0 0",
                      objectFit: "contain",
                    }}
                    aria-label={video.title}
                  />
                  {videoError && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "1rem",
                        background: "hsl(44 30% 97% / 0.92)",
                        textAlign: "center",
                      }}
                    >
                      <a className="nss-button nss-button-primary" href={urlString} target="_blank" rel="noreferrer">
                        Open video
                      </a>
                    </div>
                  )}
                </div>
              );
            })()}
            <div className="nss-p-4">
              <p className="nss-font-display nss-font-bold">{video.title}</p>
              {video.description && (
                <p className="nss-mt-1 nss-text-sm nss-leading-relaxed nss-text-muted">
                  {typeof video.description === "string" 
                    ? video.description 
                    : Array.isArray(video.description) 
                      ? (video.description as any[]).map((b: any) => b.children?.map((c: any) => c.text).join("")).join(" ")
                      : JSON.stringify(video.description)}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}