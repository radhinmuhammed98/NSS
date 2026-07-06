import { contentRepository, getSiteSettingsSync, getSocialLinksSync } from "@/lib/content";
import { projectCategories } from "@/data";
import type {
  Batch,
  SiteSettings,
  HomePage,
  AboutPage,
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
  Donation,
  SocialLinks,
} from "@/types";

export { projectCategories };

export const getHomePage = (): Promise<HomePage> =>
  contentRepository.getHomePage();

export const getAboutPage = (): Promise<AboutPage> =>
  contentRepository.getAboutPage();

export const getSiteSettings = (): Promise<SiteSettings> =>
  contentRepository.getSiteSettings();

export const getProjects = (): Promise<Project[]> =>
  contentRepository.getProjects();

export const getProjectBySlug = (slug: string): Promise<Project | undefined> =>
  contentRepository.getProjectBySlug(slug);

export const getFeaturedProjects = (limit?: number): Promise<Project[]> =>
  contentRepository.getFeaturedProjects(limit);

export const getCamps = (): Promise<Camp[]> =>
  contentRepository.getCamps();

export const getCampBySlug = (slug: string): Promise<Camp | undefined> =>
  contentRepository.getCampBySlug(slug);

export const getFeaturedCamp = (): Promise<Camp> =>
  contentRepository.getFeaturedCamp();

export const getAlbums = (): Promise<GalleryAlbum[]> =>
  contentRepository.getAlbums();

export const getAlbumBySlug = (slug: string): Promise<GalleryAlbum | undefined> =>
  contentRepository.getAlbumBySlug(slug);

export const getVideos = (): Promise<VideoClip[]> =>
  contentRepository.getVideos();

export const getFeaturedVideos = (limit?: number): Promise<VideoClip[]> =>
  contentRepository.getFeaturedVideos(limit);

export const getReports = (): Promise<Report[]> =>
  contentRepository.getReports();

export const getReportsBySlugs = (slugs: string[]): Promise<Report[]> =>
  contentRepository.getReportsBySlugs(slugs);

export const getHighlights = (): Promise<Highlight[]> =>
  contentRepository.getHighlights();

export const getHighlightBySlug = (slug: string): Promise<Highlight | undefined> =>
  contentRepository.getHighlightBySlug(slug);

export const getHighlightsBySlugs = (slugs: string[]): Promise<Highlight[]> =>
  contentRepository.getHighlightsBySlugs(slugs);

export const getFeaturedHighlight = (): Promise<Highlight> =>
  contentRepository.getFeaturedHighlight();

export const getTimeline = (newestFirst?: boolean): Promise<TimelineItem[]> =>
  contentRepository.getTimeline(newestFirst);

export const getTeam = (): Promise<TeamMember[]> =>
  contentRepository.getTeam();

export const getStories = (): Promise<VolunteerStory[]> =>
  contentRepository.getStories();

export const getFeaturedStories = (limit?: number): Promise<VolunteerStory[]> =>
  contentRepository.getFeaturedStories(limit);

export const getNotices = (): Promise<Notice[]> =>
  contentRepository.getNotices();

export const getDonation = (): Promise<Donation> =>
  contentRepository.getDonation();

export const getSocialLinks = (): Promise<SocialLinks> =>
  contentRepository.getSocialLinks();

export { getSocialLinksSync, getSiteSettingsSync };

// Batch helpers
export const getBatches = (): Promise<Batch[]> =>
  contentRepository.getBatches();

export const getCurrentBatch = (): Promise<Batch | undefined> =>
  contentRepository.getCurrentBatch();

export const getCurrentBatchTeam = (): Promise<TeamMember[]> =>
  contentRepository.getCurrentBatchTeam();

export const formatDate = (iso?: string) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export const getAlbumTypes = (): Promise<string[]> =>
  contentRepository.getAlbumTypes ? contentRepository.getAlbumTypes() : Promise.resolve([]);

export const getReportTypes = (): Promise<string[]> =>
  contentRepository.getReportTypes ? contentRepository.getReportTypes() : Promise.resolve([]);

export const getHighlightTypes = (): Promise<string[]> =>
  contentRepository.getHighlightTypes ? contentRepository.getHighlightTypes() : Promise.resolve([]);

export const getYearsFromAlbums = (): Promise<number[]> =>
  contentRepository.getYearsFromAlbums ? contentRepository.getYearsFromAlbums() : Promise.resolve([]);

export const getYearsFromReports = (): Promise<number[]> =>
  contentRepository.getYearsFromReports ? contentRepository.getYearsFromReports() : Promise.resolve([]);

export const getYearsFromHighlights = (): Promise<number[]> =>
  contentRepository.getYearsFromHighlights ? contentRepository.getYearsFromHighlights() : Promise.resolve([]);
