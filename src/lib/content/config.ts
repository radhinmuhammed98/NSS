export const CONTENT_SOURCE = import.meta.env.VITE_CONTENT_SOURCE || "sanity";
export const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || "o5r7P6oq4";
export const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || "production";
export const SANITY_API_VERSION = import.meta.env.VITE_SANITY_API_VERSION || "2026-01-01";

const isDev = import.meta.env.DEV;

export function getContentSource(): "mock" | "sanity" {
  // Fallback to mock data on localhost to avoid CORS request blocking in local preview / Lighthouse
  if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
    return "mock";
  }

  if (CONTENT_SOURCE === "sanity") {
    if (!SANITY_PROJECT_ID || SANITY_PROJECT_ID === "your_project_id_here" || SANITY_PROJECT_ID === "your_project_id") {
      if (isDev) {
        console.warn(
          "Sanity project ID (VITE_SANITY_PROJECT_ID) is missing or placeholder. Falling back to mock data in development."
        );
        return "mock";
      } else {
        throw new Error(
          "Sanity project ID (VITE_SANITY_PROJECT_ID) is required in production when VITE_CONTENT_SOURCE=sanity."
        );
      }
    }
    return "sanity";
  }
  return "mock";
}
