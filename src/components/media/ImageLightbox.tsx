import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { ImageAsset } from "@/types";

export function ImageLightbox({
  image,
  onClose,
}: {
  image: ImageAsset | null;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!image) return;
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
  }, [close, image]);

  if (!image) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.caption || image.alt || "Image viewer"}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 120,
        display: "grid",
        placeItems: "center",
        padding: "clamp(1rem, 3vw, 2rem)",
        backgroundColor: "rgba(0, 0, 0, 0.82)",
      }}
    >
      {/* Backdrop click to close */}
      <button
        type="button"
        aria-label="Close image viewer"
        onClick={close}
        className="nss-modal-backdrop"
        style={{ cursor: "zoom-out", zIndex: 119, background: "transparent" }}
      />

      <figure
        className="nss-modal-panel"
        style={{
          position: "relative",
          zIndex: 121,
          display: "flex",
          flexDirection: "column",
          maxHeight: "90vh",
          maxWidth: "90vw",
          backgroundColor: "var(--surface-elevated)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          boxShadow: "var(--shadow-xl)",
        }}
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close viewer"
          onClick={close}
          style={{
            position: "absolute",
            top: "0.75rem",
            right: "0.75rem",
            zIndex: 10,
            display: "grid",
            placeItems: "center",
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(255,255,255,0.18)",
            color: "#fff",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <X size={20} />
        </button>

        {/* Image */}
        <div
          style={{
            position: "relative",
            flex: "1 1 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            overflow: "hidden",
          }}
        >
          <img
            src={image.src}
            alt={image.alt || ""}
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              borderRadius: "var(--radius-md)",
            }}
          />
        </div>

        {/* Caption */}
        {image.caption && (
          <figcaption
            style={{
              padding: "0.75rem 1.25rem",
              borderTop: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
              color: "var(--muted-foreground)",
              fontSize: "0.875rem",
              lineHeight: 1.5,
              textAlign: "center",
              flex: "0 0 auto",
            }}
          >
            {image.caption}
          </figcaption>
        )}
      </figure>
    </div>,
    document.body
  );
}
