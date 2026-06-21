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
  getSiteSettings(): Promise<SiteSettings | null>;
  getBatches(): Promise<Batch[]>;
  getBatchBySlug(slug: string): Promise<Batch | null>;
  getProjects(): Promise<Project[]>;
  getProjectBySlug(slug: string): Promise<Project | null>;
  getProjectsByBatch(batchSlug: string): Promise<Project[]>;
  getFeaturedProjects(limit?: number): Promise<Project[]>;
  getCamps(): Promise<Camp[]>;
  getCampBySlug(slug: string): Promise<Camp | null>;
  getCampsByBatch(batchSlug: string): Promise<Camp[]>;
  getFeaturedCamp(): Promise<Camp | null>;
  getAlbums(): Promise<GalleryAlbum[]>;
  getAlbumBySlug(slug: string): Promise<GalleryAlbum | null>;
  getAlbumsByBatch(batchSlug: string): Promise<GalleryAlbum[]>;
  getVideos(): Promise<VideoClip[]>;
  getVideosByBatch(batchSlug: string): Promise<VideoClip[]>;
  getFeaturedVideos(limit?: number): Promise<VideoClip[]>;
  getReports(): Promise<Report[]>;
  getReportsByBatch(batchSlug: string): Promise<Report[]>;
  getReportsBySlugs(slugs: string[]): Promise<Report[]>;
  getHighlights(): Promise<Highlight[]>;
  getHighlightBySlug(slug: string): Promise<Highlight | null>;
  getHighlightsBySlugs(slugs: string[]): Promise<Highlight[]>;
  getHighlightsByBatch(batchSlug: string): Promise<Highlight[]>;
  getFeaturedHighlight(): Promise<Highlight | null>;
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
