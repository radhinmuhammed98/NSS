import { useCallback, useEffect, useRef } from "react";
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

  return (
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
          aria-label="Close image viewer"
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
        <img
          src={image.src}
          alt={image.alt || image.caption || "Expanded gallery image"}
          style={{
            display: "block",
            maxHeight: "82vh",
            maxWidth: "100%",
            objectFit: "contain",
            borderRadius: "var(--radius-xl)",
            boxShadow: "var(--shadow-xl)",
            background: "var(--surface-elevated)",
          }}
        />
        {(image.caption || image.credit) && (
          <figcaption
            className="nss-text-sm"
            style={{
              maxWidth: "52rem",
              color: "#fff",
              textAlign: "center",
              textShadow: "0 2px 8px rgba(0,0,0,0.75)",
            }}
          >
            {image.caption || image.credit}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
