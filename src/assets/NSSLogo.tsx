/**
 * NSSLogo — official National Service Scheme logo wrapper.
 *
 * The SVG artwork is loaded as an <img> via Vite's static asset URL.
 * This preserves the original file as the single source of truth and
 * requires no SVG-to-React transformation plugin.
 *
 * Props
 * -----
 * width       — CSS width value (default: "auto")
 * height      — CSS height value (default: "2.5rem" / 40px)
 * className   — extra class names on the <img>
 * decorative  — if true, aria-hidden="true" and no alt text (use for purely decorative instances)
 * title       — accessible label override (default: "National Service Scheme")
 * loading     — native img loading attribute ("lazy" | "eager")
 */

import nssLogoUrl from "./National_Service_Scheme_logo.svg";

interface NSSLogoProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  /** When true the image is hidden from assistive technology */
  decorative?: boolean;
  /** Override the accessible name. Ignored when decorative=true */
  title?: string;
  loading?: "lazy" | "eager";
}

export function NSSLogo({
  width = "auto",
  height = 40,
  className,
  decorative = false,
  title = "National Service Scheme",
  loading = "eager",
}: NSSLogoProps) {
  return (
    <img
      src={nssLogoUrl}
      alt={decorative ? "" : title}
      aria-hidden={decorative ? "true" : undefined}
      width={typeof width === "number" ? width : undefined}
      height={typeof height === "number" ? height : undefined}
      style={{
        width: typeof width === "string" ? width : undefined,
        height: typeof height === "string" ? height : undefined,
        objectFit: "contain",
        display: "block",
        flexShrink: 0,
      }}
      className={className}
      loading={loading}
      decoding="async"
    />
  );
}
