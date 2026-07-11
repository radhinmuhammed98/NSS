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
      }}
    >
      <button
        type="button"
        aria-label="Close image viewer"
        onClick={close}
        className="nss-modal-backdrop"
        style={{ cursor: "zoom-out", zIndex: 119 }}
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
          backgroundColor: "hsl(var(--surface-0) / 0.95)",
          backdropFilter: "blur(12px)",
          border: "1px solid hsl(var(--border) / 0.5)",
          borderRadius: "var(--radius-3)",
          overflow: "hidden",
          boxShadow: "0 20px 60px hsl(0 0% 0% / 0.4)",
        }}
      >
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

        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            flex: "1 1 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            overflow: "hidden",
          }}
        >
          <img
            src={image.url}
            alt={image.alt || ""}
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              borderRadius: "calc(var(--radius-2) - 2px)",
            }}
          />
        </div>

        {image.caption && (
          <figcaption
            style={{
              padding: "1rem 1.5rem",
              borderTop: "1px solid hsl(var(--border) / 0.5)",
              backgroundColor: "hsl(var(--surface-1) / 0.5)",
              color: "var(--text-2)",
              fontSize: "0.9375rem",
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
