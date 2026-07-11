import type {
  Batch,
  SiteSettings,
  HomePage,
  AboutPage,
  Project,
  Camp,
  GalleryAlbum,
  Report,
  Highlight,
  TimelineItem,
  TeamMember,
  VolunteerStory,
  Notice,
  Donation,
  SocialLinks,
} from "@/types";

export interface ContentRepository {
  getSiteSettings(): Promise<SiteSettings>;
  getHomePage(): Promise<HomePage>;
  getAboutPage(): Promise<AboutPage>;
  getProjects(): Promise<Project[]>;
  getProjectBySlug(slug: string): Promise<Project | undefined>;
  getFeaturedProjects(limit?: number): Promise<Project[]>;
  getCamps(): Promise<Camp[]>;
  getCampBySlug(slug: string): Promise<Camp | undefined>;
  getFeaturedCamp(): Promise<Camp | undefined>;
  getAlbums(): Promise<GalleryAlbum[]>;
  getAlbumBySlug(slug: string): Promise<GalleryAlbum | undefined>;

  getReports(): Promise<Report[]>;
  getReportsBySlugs(slugs: string[]): Promise<Report[]>;
  getHighlights(): Promise<Highlight[]>;
  getHighlightBySlug(slug: string): Promise<Highlight | undefined>;
  getHighlightsBySlugs(slugs: string[]): Promise<Highlight[]>;
  getFeaturedHighlight(): Promise<Highlight | undefined>;
  getTimeline(newestFirst?: boolean): Promise<TimelineItem[]>;
  getTeam(): Promise<TeamMember[]>;
  getCurrentBatchTeam(): Promise<TeamMember[]>;
  getStories(): Promise<VolunteerStory[]>;
  getFeaturedStories(limit?: number): Promise<VolunteerStory[]>;
  getNotices(): Promise<Notice[]>;
  getDonation(): Promise<Donation>;
  getSocialLinks(): Promise<SocialLinks>;

  // Batch methods
  getBatches(): Promise<Batch[]>;
  getCurrentBatch(): Promise<Batch | undefined>;

  // Filter-support helpers
  getAlbumTypes(): Promise<string[]>;
  getReportTypes(): Promise<string[]>;
  getHighlightTypes(): Promise<string[]>;
  getYearsFromAlbums(): Promise<number[]>;
  getYearsFromReports(): Promise<number[]>;
  getYearsFromHighlights(): Promise<number[]>;
}
