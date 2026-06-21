import type { ContentRepository } from "./repository";
import {
  batches,
  camps,
  galleryAlbums,
  highlights,
  notices,
  projects,
  reports,
  siteSettings,
  teamMembers,
  timelineItems,
  videoClips,
  volunteerStories,
} from "@/data";
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

export class MockRepository implements ContentRepository {
  async getSiteSettings(): Promise<SiteSettings | null> {
    return { ...siteSettings };
  }

  async getBatches(): Promise<Batch[]> {
    return [...batches].sort((a, b) => b.year - a.year);
  }

  async getBatchBySlug(slug: string): Promise<Batch | null> {
    return batches.find((b) => b.slug === slug) ?? null;
  }

  async getProjects(): Promise<Project[]> {
    return [...projects].sort((a, b) => b.date.localeCompare(a.date));
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    return projects.find((p) => p.slug === slug) ?? null;
  }

  async getProjectsByBatch(batchSlug: string): Promise<Project[]> {
    const list = await this.getProjects();
    return list.filter((p) => p.batchSlug === batchSlug);
  }

  async getFeaturedProjects(limit = 6): Promise<Project[]> {
    const list = await this.getProjects();
    return list.filter((p) => p.featured).slice(0, limit);
  }

  async getCamps(): Promise<Camp[]> {
    return [...camps].sort((a, b) => b.year - a.year);
  }

  async getCampBySlug(slug: string): Promise<Camp | null> {
    return camps.find((c) => c.slug === slug) ?? null;
  }

  async getCampsByBatch(batchSlug: string): Promise<Camp[]> {
    const list = await this.getCamps();
    return list.filter((c) => c.batchSlug === batchSlug);
  }

  async getFeaturedCamp(): Promise<Camp | null> {
    return camps.find((c) => c.featured) ?? camps[0] ?? null;
  }

  async getAlbums(): Promise<GalleryAlbum[]> {
    return [...galleryAlbums].sort((a, b) => b.date.localeCompare(a.date));
  }

  async getAlbumBySlug(slug: string): Promise<GalleryAlbum | null> {
    return galleryAlbums.find((a) => a.slug === slug) ?? null;
  }

  async getAlbumsByBatch(batchSlug: string): Promise<GalleryAlbum[]> {
    const list = await this.getAlbums();
    return list.filter((a) => a.batchSlug === batchSlug);
  }

  async getVideos(): Promise<VideoClip[]> {
    return [...videoClips].sort((a, b) => b.year - a.year);
  }

  async getVideosByBatch(batchSlug: string): Promise<VideoClip[]> {
    const list = await this.getVideos();
    return list.filter((v) => v.batchSlug === batchSlug);
  }

  async getFeaturedVideos(limit = 6): Promise<VideoClip[]> {
    const list = await this.getVideos();
    return list.filter((v) => v.featured).slice(0, limit);
  }

  async getReports(): Promise<Report[]> {
    return [...reports].sort((a, b) => b.date.localeCompare(a.date));
  }

  async getReportsByBatch(batchSlug: string): Promise<Report[]> {
    const list = await this.getReports();
    return list.filter((r) => r.batchSlug === batchSlug);
  }

  async getReportsBySlugs(slugs: string[]): Promise<Report[]> {
    return reports.filter((r) => slugs.includes(r.slug));
  }

  async getHighlights(): Promise<Highlight[]> {
    return [...highlights].sort((a, b) => a.priority - b.priority);
  }

  async getHighlightBySlug(slug: string): Promise<Highlight | null> {
    return highlights.find((h) => h.slug === slug) ?? null;
  }

  async getHighlightsBySlugs(slugs: string[]): Promise<Highlight[]> {
    return highlights.filter((h) => slugs.includes(h.slug));
  }

  async getHighlightsByBatch(batchSlug: string): Promise<Highlight[]> {
    const list = await this.getHighlights();
    return list.filter((h) => h.batchSlug === batchSlug);
  }

  async getFeaturedHighlight(): Promise<Highlight | null> {
    const list = await this.getHighlights();
    return highlights.find((h) => h.featured) ?? list[0] ?? null;
  }

  async getTimeline(newestFirst = false): Promise<TimelineItem[]> {
    return [...timelineItems].sort((a, b) =>
      newestFirst ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date),
    );
  }

  async getTeam(): Promise<TeamMember[]> {
    return [...teamMembers].sort((a, b) => a.order - b.order);
  }

  async getTeamByBatch(batchSlug: string): Promise<TeamMember[]> {
    const list = await this.getTeam();
    return list.filter((m) => m.batchSlug === batchSlug);
  }

  async getStories(): Promise<VolunteerStory[]> {
    return [...volunteerStories];
  }

  async getStoriesByBatch(batchSlug: string): Promise<VolunteerStory[]> {
    return volunteerStories.filter((s) => s.batchSlug === batchSlug);
  }

  async getFeaturedStories(limit = 3): Promise<VolunteerStory[]> {
    const list = await this.getStories();
    return list.filter((s) => s.featured).slice(0, limit);
  }

  async getNotices(): Promise<Notice[]> {
    return [...notices].sort((a, b) => b.date.localeCompare(a.date));
  }

  // Helper filters
  async getAlbumTypes(): Promise<string[]> {
    return [...new Set(galleryAlbums.map((a) => a.type))].sort();
  }

  async getReportTypes(): Promise<string[]> {
    return [...new Set(reports.map((r) => r.type))].sort();
  }

  async getHighlightTypes(): Promise<string[]> {
    return [...new Set(highlights.map((h) => h.type))].sort();
  }

  async getYearsFromAlbums(): Promise<number[]> {
    return [...new Set(galleryAlbums.map((a) => a.year))].sort((a, b) => b - a);
  }

  async getYearsFromReports(): Promise<number[]> {
    return [...new Set(reports.map((r) => r.year))].sort((a, b) => b - a);
  }

  async getYearsFromHighlights(): Promise<number[]> {
    return [...new Set(highlights.map((h) => h.year))].sort((a, b) => b - a);
  }
}
