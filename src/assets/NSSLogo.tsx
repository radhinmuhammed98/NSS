/**
 * NSSLogo — official National Service Scheme logo wrapper.
 *
 * In production the image URL is served from Sanity (siteSettings.nssLogo).
 * If the CMS has no image yet (e.g. local dev), it falls back to the
 * static public asset at /nss-logo.svg.
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

import { getSiteSettingsSync } from "@/lib/content";

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
  const s = getSiteSettingsSync();
  // Use Sanity-hosted URL when available, else fall back to static public asset
  const src = s.nssLogo || "/nss-logo.svg";

  return (
    <img
      src={src}
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
