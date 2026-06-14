import {
  batches,
  camps,
  galleryAlbums,
  highlights,
  notices,
  projectCategories,
  projects,
  reports,
  siteSettings,
  teamMembers,
  timelineItems,
  videoClips,
  volunteerStories,
} from "@/data";

export { projectCategories };

export const getSiteSettings = () => siteSettings;

export const getCurrentBatch = () =>
  batches.find((b) => b.featured) ?? batches[0];

// Batches
export const getBatches = () => [...batches].sort((a, b) => b.year - a.year);
export const getBatchBySlug = (slug: string) =>
  batches.find((b) => b.slug === slug);
export const getBatchTitle = (slug?: string) =>
  slug ? batches.find((b) => b.slug === slug)?.yearRange ?? slug : "";

// Projects
export const getProjects = () =>
  [...projects].sort((a, b) => b.date.localeCompare(a.date));
export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
export const getProjectsByBatch = (batchSlug: string) =>
  getProjects().filter((p) => p.batchSlug === batchSlug);
export const getFeaturedProjects = (limit = 6) =>
  getProjects().filter((p) => p.featured).slice(0, limit);

// Camps
export const getCamps = () => [...camps].sort((a, b) => b.year - a.year);
export const getCampBySlug = (slug: string) =>
  camps.find((c) => c.slug === slug);
export const getCampsByBatch = (batchSlug: string) =>
  getCamps().filter((c) => c.batchSlug === batchSlug);
export const getFeaturedCamp = () => camps.find((c) => c.featured) ?? camps[0];

// Gallery
export const getAlbums = () =>
  [...galleryAlbums].sort((a, b) => b.date.localeCompare(a.date));
export const getAlbumBySlug = (slug: string) =>
  galleryAlbums.find((a) => a.slug === slug);
export const getAlbumsByBatch = (batchSlug: string) =>
  getAlbums().filter((a) => a.batchSlug === batchSlug);

// Videos
export const getVideos = () => [...videoClips].sort((a, b) => b.year - a.year);
export const getVideosByBatch = (batchSlug: string) =>
  getVideos().filter((v) => v.batchSlug === batchSlug);
export const getFeaturedVideos = (limit = 6) =>
  getVideos().filter((v) => v.featured).slice(0, limit);

// Reports
export const getReports = () =>
  [...reports].sort((a, b) => b.date.localeCompare(a.date));
export const getReportsByBatch = (batchSlug: string) =>
  getReports().filter((r) => r.batchSlug === batchSlug);
export const getReportsBySlugs = (slugs: string[]) =>
  reports.filter((r) => slugs.includes(r.slug));

// Highlights
export const getHighlights = () =>
  [...highlights].sort((a, b) => a.priority - b.priority);
export const getHighlightBySlug = (slug: string) =>
  highlights.find((h) => h.slug === slug);
export const getHighlightsBySlugs = (slugs: string[]) =>
  highlights.filter((h) => slugs.includes(h.slug));
export const getHighlightsByBatch = (batchSlug: string) =>
  getHighlights().filter((h) => h.batchSlug === batchSlug);
export const getFeaturedHighlight = () =>
  highlights.find((h) => h.featured) ?? getHighlights()[0];

// Timeline
export const getTimeline = (newestFirst = false) =>
  [...timelineItems].sort((a, b) =>
    newestFirst ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)
  );

// Team
export const getTeam = () => [...teamMembers].sort((a, b) => a.order - b.order);
export const getTeamByBatch = (batchSlug: string) =>
  getTeam().filter((m) => m.batchSlug === batchSlug);

// Stories
export const getStories = () => [...volunteerStories];
export const getStoriesByBatch = (batchSlug: string) =>
  volunteerStories.filter((s) => s.batchSlug === batchSlug);
export const getFeaturedStories = (limit = 3) =>
  volunteerStories.filter((s) => s.featured).slice(0, limit);

// Notices
export const getNotices = () =>
  [...notices].sort((a, b) => b.date.localeCompare(a.date));

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
