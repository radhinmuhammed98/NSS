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

export interface ContentRepository {
  getSiteSettings(): Promise<SiteSettings>;
  getBatches(): Promise<Batch[]>;
  getBatchBySlug(slug: string): Promise<Batch | undefined>;
  getProjects(): Promise<Project[]>;
  getProjectBySlug(slug: string): Promise<Project | undefined>;
  getProjectsByBatch(batchSlug: string): Promise<Project[]>;
  getFeaturedProjects(limit?: number): Promise<Project[]>;
  getCamps(): Promise<Camp[]>;
  getCampBySlug(slug: string): Promise<Camp | undefined>;
  getCampsByBatch(batchSlug: string): Promise<Camp[]>;
  getFeaturedCamp(): Promise<Camp>;
  getAlbums(): Promise<GalleryAlbum[]>;
  getAlbumBySlug(slug: string): Promise<GalleryAlbum | undefined>;
  getAlbumsByBatch(batchSlug: string): Promise<GalleryAlbum[]>;
  getVideos(): Promise<VideoClip[]>;
  getVideosByBatch(batchSlug: string): Promise<VideoClip[]>;
  getFeaturedVideos(limit?: number): Promise<VideoClip[]>;
  getReports(): Promise<Report[]>;
  getReportsByBatch(batchSlug: string): Promise<Report[]>;
  getReportsBySlugs(slugs: string[]): Promise<Report[]>;
  getHighlights(): Promise<Highlight[]>;
  getHighlightBySlug(slug: string): Promise<Highlight | undefined>;
  getHighlightsBySlugs(slugs: string[]): Promise<Highlight[]>;
  getHighlightsByBatch(batchSlug: string): Promise<Highlight[]>;
  getFeaturedHighlight(): Promise<Highlight>;
  getTimeline(newestFirst?: boolean): Promise<TimelineItem[]>;
  getTeam(): Promise<TeamMember[]>;
  getTeamByBatch(batchSlug: string): Promise<TeamMember[]>;
  getStories(): Promise<VolunteerStory[]>;
  getStoriesByBatch(batchSlug: string): Promise<VolunteerStory[]>;
  getFeaturedStories(limit?: number): Promise<VolunteerStory[]>;
  getNotices(): Promise<Notice[]>;
  
  // Filter-support helpers
  getAlbumTypes(): Promise<string[]>;
  getReportTypes(): Promise<string[]>;
  getHighlightTypes(): Promise<string[]>;
  getYearsFromAlbums(): Promise<number[]>;
  getYearsFromReports(): Promise<number[]>;
  getYearsFromHighlights(): Promise<number[]>;
}
