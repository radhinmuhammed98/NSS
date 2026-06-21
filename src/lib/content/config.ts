export const CONTENT_SOURCE = import.meta.env.VITE_CONTENT_SOURCE || "mock";
export const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID;
export const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || "production";
export const SANITY_API_VERSION = import.meta.env.VITE_SANITY_API_VERSION || "2026-01-01";

const isDev = import.meta.env.DEV;

export function getContentSource(): "mock" | "sanity" {
  if (CONTENT_SOURCE === "sanity") {
    if (!SANITY_PROJECT_ID) {
      if (isDev) {
        console.warn(
          "Sanity project ID (VITE_SANITY_PROJECT_ID) is missing. Falling back to mock data in development.",
        );
        return "mock";
      } else {
        throw new Error(
          "Sanity project ID (VITE_SANITY_PROJECT_ID) is required in production when VITE_CONTENT_SOURCE=sanity.",
        );
      }
    }
    return "sanity";
  }
  return "mock";
}
