import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export function VideoLightbox({
  video,
  onClose,
}: {
  video: { title: string; url: string; thumbnail?: string } | null;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!video) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [close, video]);

  if (!video) return null;

  const isYouTube = video.url.includes("youtube.com") || video.url.includes("youtu.be");
  const videoId = isYouTube ? video.url.split(/[v/]/).pop()?.split("?")[0] : null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title || "Video player"}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 120,
        display: "grid",
        placeItems: "center",
        padding: "clamp(1rem, 3vw, 2rem)",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      }}
    >
      <button
        type="button"
        aria-label="Close video player"
        onClick={close}
        className="nss-modal-backdrop"
        style={{
          position: "fixed",
          inset: 0,
          background: "transparent",
          cursor: "zoom-out",
          zIndex: 119,
        }}
      />
      <figure
        className="nss-modal-panel"
        style={{
          position: "relative",
          zIndex: 121,
          display: "flex",
          maxHeight: "88vh",
          maxWidth: "88vw",
          width: "1280px",
          aspectRatio: "16 / 9",
          backgroundColor: "hsl(var(--surface-0))",
          border: "1px solid hsl(var(--border) / 0.5)",
          borderRadius: "var(--radius-3)",
          overflow: "hidden",
          boxShadow: "0 20px 60px hsl(0 0% 0% / 0.4), 0 0 0 1px hsl(var(--border) / 0.5)",
        }}
      >
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close video player"
          onClick={close}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            zIndex: 10,
            display: "grid",
            placeItems: "center",
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "50%",
            backgroundColor: "hsl(var(--surface-2) / 0.8)",
            backdropFilter: "blur(4px)",
            border: "1px solid hsl(var(--border) / 0.6)",
            color: "var(--text-1)",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          className="hover:bg-[hsl(var(--surface-3))] hover:scale-105 active:scale-95"
        >
          <X size={20} />
        </button>

        {isYouTube ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <video
            src={video.url}
            title={video.title}
            controls
            autoPlay
            playsInline
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "black",
              objectFit: "contain",
            }}
          />
        )}
      </figure>
    </div>,
    document.body
  );
}
