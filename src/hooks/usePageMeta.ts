/**
 * usePageMeta — sets document.title and meta description per route.
 *
 * Usage:
 *   usePageMeta({ title: "About – NSS KHMHSS", description: "..." });
 *
 * The hook fires on mount and cleans up on unmount (restores root title).
 */
import { useEffect } from "react";

const ROOT_TITLE = "NSS KHMHSS Valakkulam \u2013 Not Me, But You";
const ROOT_DESC  =
  "The digital legacy of the NSS unit at KHMHSS Valakkulam \u2014 preserving service, leadership, camps, and memories since 1982.";

export function usePageMeta({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  useEffect(() => {
    // Title
    document.title = `${title} \u2013 NSS KHMHSS Valakkulam`;

    // Meta description
    let meta = document.querySelector<HTMLMetaElement>("meta[name='description']");
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    const prevDesc = meta.content;
    meta.content = description || ROOT_DESC;

    return () => {
      document.title = ROOT_TITLE;
      if (meta) meta.content = prevDesc;
    };
  }, [title, description]);
}
