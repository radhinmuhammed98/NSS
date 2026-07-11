import { useCallback, useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { VideoClip } from "@/types";

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

  return (
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
      }}
    >
      <button
        type="button"
        aria-label="Close video player"
        onClick={close}
        className="nss-modal-backdrop"
        style={{ cursor: "zoom-out" }}
      />
      <figure
        className="nss-modal-panel"
        style={{
          position: "relative",
          zIndex: 121,
          display: "flex",
          maxHeight: "88vh",
          width: "min(100%, 68rem)",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
        }}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={close}
          aria-label="Close video player"
          style={{
            position: "absolute",
            right: "0.75rem",
            top: "0.75rem",
            zIndex: 122,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "2.5rem",
            width: "2.5rem",
            borderRadius: "50%",
            background: "rgba(0, 0, 0, 0.72)",
            color: "#fff",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <X style={{ height: "1.2rem", width: "1.2rem" }} aria-hidden />
        </button>
        <div style={{ width: "100%", background: "#000", borderRadius: "var(--radius-xl)", overflow: "hidden", boxShadow: "var(--shadow-xl)" }}>
          {video.url.includes("youtube.com") || video.url.includes("youtu.be") ? (
            <iframe
              width="100%"
              height="100%"
              style={{ aspectRatio: "16/9", border: "none" }}
              src={video.url.replace("watch?v=", "embed/").replace("youtu.be/", "www.youtube.com/embed/")}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video.title}
            />
          ) : (
            <video
              src={video.url}
              poster={video.thumbnail}
              controls
              autoPlay
              style={{
                display: "block",
                width: "100%",
                maxHeight: "82vh",
                objectFit: "contain",
              }}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        {video.title && (
          <figcaption
            className="nss-text-sm nss-font-bold"
            style={{
              maxWidth: "52rem",
              color: "#fff",
              textAlign: "center",
              textShadow: "0 2px 8px rgba(0,0,0,0.75)",
            }}
          >
            {video.title}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
