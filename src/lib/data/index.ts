import { contentRepository, getBatchTitleSync } from "@/lib/content";
import { projectCategories } from "@/data";
import type {
  SiteSettings,
  Batch,
  Project,
  Camp,
  GalleryAlbum,
  VideoClip,
  Report,
  Highlight,
  TimelineItem,
  TeamMember,
  VolunteerStory,
  Notice,
} from "@/types";

export { projectCategories };

export const getSiteSettings = (): Promise<SiteSettings | null> =>
  contentRepository.getSiteSettings();

export const getCurrentBatch = async (): Promise<Batch | null> => {
  const list = await contentRepository.getBatches();
  return list.find((b) => b.featured) ?? list[0] ?? null;
};

export const getBatches = (): Promise<Batch[]> => contentRepository.getBatches();

export const getBatchBySlug = (slug: string): Promise<Batch | null> =>
  contentRepository.getBatchBySlug(slug);

export const getBatchTitle = (slug?: string): string => getBatchTitleSync(slug);

export const getProjects = (): Promise<Project[]> => contentRepository.getProjects();

export const getProjectBySlug = (slug: string): Promise<Project | null> =>
  contentRepository.getProjectBySlug(slug);

export const getProjectsByBatch = (batchSlug: string): Promise<Project[]> =>
  contentRepository.getProjectsByBatch(batchSlug);

export const getFeaturedProjects = (limit?: number): Promise<Project[]> =>
  contentRepository.getFeaturedProjects(limit);

export const getCamps = (): Promise<Camp[]> => contentRepository.getCamps();

export const getCampBySlug = (slug: string): Promise<Camp | null> =>
  contentRepository.getCampBySlug(slug);

export const getCampsByBatch = (batchSlug: string): Promise<Camp[]> =>
  contentRepository.getCampsByBatch(batchSlug);

export const getFeaturedCamp = (): Promise<Camp | null> => contentRepository.getFeaturedCamp();

export const getAlbums = (): Promise<GalleryAlbum[]> => contentRepository.getAlbums();

export const getAlbumBySlug = (slug: string): Promise<GalleryAlbum | null> =>
  contentRepository.getAlbumBySlug(slug);

export const getAlbumsByBatch = (batchSlug: string): Promise<GalleryAlbum[]> =>
  contentRepository.getAlbumsByBatch(batchSlug);

export const getVideos = (): Promise<VideoClip[]> => contentRepository.getVideos();

export const getVideosByBatch = (batchSlug: string): Promise<VideoClip[]> =>
  contentRepository.getVideosByBatch(batchSlug);

export const getFeaturedVideos = (limit?: number): Promise<VideoClip[]> =>
  contentRepository.getFeaturedVideos(limit);

export const getReports = (): Promise<Report[]> => contentRepository.getReports();

export const getReportsByBatch = (batchSlug: string): Promise<Report[]> =>
  contentRepository.getReportsByBatch(batchSlug);

export const getReportsBySlugs = (slugs: string[]): Promise<Report[]> =>
  contentRepository.getReportsBySlugs(slugs);

export const getHighlights = (): Promise<Highlight[]> => contentRepository.getHighlights();

export const getHighlightBySlug = (slug: string): Promise<Highlight | null> =>
  contentRepository.getHighlightBySlug(slug);

export const getHighlightsBySlugs = (slugs: string[]): Promise<Highlight[]> =>
  contentRepository.getHighlightsBySlugs(slugs);

export const getHighlightsByBatch = (batchSlug: string): Promise<Highlight[]> =>
  contentRepository.getHighlightsByBatch(batchSlug);

export const getFeaturedHighlight = (): Promise<Highlight | null> =>
  contentRepository.getFeaturedHighlight();

export const getTimeline = (newestFirst?: boolean): Promise<TimelineItem[]> =>
  contentRepository.getTimeline(newestFirst);

export const getTeam = (): Promise<TeamMember[]> => contentRepository.getTeam();

export const getTeamByBatch = (batchSlug: string): Promise<TeamMember[]> =>
  contentRepository.getTeamByBatch(batchSlug);

export const getStories = (): Promise<VolunteerStory[]> => contentRepository.getStories();

export const getStoriesByBatch = (batchSlug: string): Promise<VolunteerStory[]> =>
  contentRepository.getStoriesByBatch(batchSlug);

export const getFeaturedStories = (limit?: number): Promise<VolunteerStory[]> =>
  contentRepository.getFeaturedStories(limit);

export const getNotices = (): Promise<Notice[]> => contentRepository.getNotices();

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const getAlbumTypes = (): Promise<string[]> => contentRepository.getAlbumTypes();

export const getReportTypes = (): Promise<string[]> => contentRepository.getReportTypes();

export const getHighlightTypes = (): Promise<string[]> => contentRepository.getHighlightTypes();

export const getYearsFromAlbums = (): Promise<number[]> => contentRepository.getYearsFromAlbums();

export const getYearsFromReports = (): Promise<number[]> => contentRepository.getYearsFromReports();

export const getYearsFromHighlights = (): Promise<number[]> =>
  contentRepository.getYearsFromHighlights();
