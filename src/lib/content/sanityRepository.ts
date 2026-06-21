import type { ContentRepository } from "./repository";
import { getSanityClient } from "./sanityClient";
import * as queries from "./queries";
import * as mappers from "./mappers";
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

export class SanityRepository implements ContentRepository {
  private client() {
    return getSanityClient();
  }

  async getSiteSettings(): Promise<SiteSettings | null> {
    const raw = await this.client().fetch(queries.SETTINGS_QUERY);
    if (!raw) return null;
    return mappers.mapSettings(raw);
  }

  async getBatches(): Promise<Batch[]> {
    const raw = await this.client().fetch(queries.BATCHES_QUERY);
    return (raw || []).map(mappers.mapBatch);
  }

  async getBatchBySlug(slug: string): Promise<Batch | null> {
    const raw = await this.client().fetch(queries.BATCH_BY_SLUG_QUERY, { slug });
    return raw ? mappers.mapBatch(raw) : null;
  }

  async getProjects(): Promise<Project[]> {
    const raw = await this.client().fetch(queries.PROJECTS_QUERY);
    return (raw || []).map(mappers.mapProject);
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    const raw = await this.client().fetch(queries.PROJECT_BY_SLUG_QUERY, { slug });
    return raw ? mappers.mapProject(raw) : null;
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
    const raw = await this.client().fetch(queries.CAMPS_QUERY);
    return (raw || []).map(mappers.mapCamp);
  }

  async getCampBySlug(slug: string): Promise<Camp | null> {
    const raw = await this.client().fetch(queries.CAMP_BY_SLUG_QUERY, { slug });
    return raw ? mappers.mapCamp(raw) : null;
  }

  async getCampsByBatch(batchSlug: string): Promise<Camp[]> {
    const list = await this.getCamps();
    return list.filter((c) => c.batchSlug === batchSlug);
  }

  async getFeaturedCamp(): Promise<Camp | null> {
    const list = await this.getCamps();
    const featured = list.find((c) => c.featured) ?? list[0];
    if (!featured) return null;
    return featured;
  }

  async getAlbums(): Promise<GalleryAlbum[]> {
    const raw = await this.client().fetch(queries.ALBUMS_QUERY);
    return (raw || []).map(mappers.mapGalleryAlbum);
  }

  async getAlbumBySlug(slug: string): Promise<GalleryAlbum | null> {
    const raw = await this.client().fetch(queries.ALBUM_BY_SLUG_QUERY, { slug });
    return raw ? mappers.mapGalleryAlbum(raw) : null;
  }

  async getAlbumsByBatch(batchSlug: string): Promise<GalleryAlbum[]> {
    const list = await this.getAlbums();
    return list.filter((a) => a.batchSlug === batchSlug);
  }

  async getVideos(): Promise<VideoClip[]> {
    const raw = await this.client().fetch(queries.VIDEOS_QUERY);
    return (raw || []).map(mappers.mapVideoClip);
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
    const raw = await this.client().fetch(queries.REPORTS_QUERY);
    return (raw || []).map(mappers.mapReport);
  }

  async getReportsByBatch(batchSlug: string): Promise<Report[]> {
    const list = await this.getReports();
    return list.filter((r) => r.batchSlug === batchSlug);
  }

  async getReportsBySlugs(slugs: string[]): Promise<Report[]> {
    const list = await this.getReports();
    return list.filter((r) => slugs.includes(r.slug));
  }

  async getHighlights(): Promise<Highlight[]> {
    const raw = await this.client().fetch(queries.HIGHLIGHTS_QUERY);
    return (raw || []).map(mappers.mapHighlight);
  }

  async getHighlightBySlug(slug: string): Promise<Highlight | null> {
    const raw = await this.client().fetch(queries.HIGHLIGHT_BY_SLUG_QUERY, { slug });
    return raw ? mappers.mapHighlight(raw) : null;
  }

  async getHighlightsBySlugs(slugs: string[]): Promise<Highlight[]> {
    const list = await this.getHighlights();
    return list.filter((h) => slugs.includes(h.slug));
  }

  async getHighlightsByBatch(batchSlug: string): Promise<Highlight[]> {
    const list = await this.getHighlights();
    return list.filter((h) => h.batchSlug === batchSlug);
  }

  async getFeaturedHighlight(): Promise<Highlight | null> {
    const list = await this.getHighlights();
    const featured = list.find((h) => h.featured) ?? list[0];
    if (!featured) return null;
    return featured;
  }

  async getTimeline(newestFirst = false): Promise<TimelineItem[]> {
    const raw = await this.client().fetch(queries.TIMELINE_QUERY);
    const list: TimelineItem[] = (raw || []).map(mappers.mapTimelineItem);
    return list.sort((a, b) =>
      newestFirst ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date),
    );
  }

  async getTeam(): Promise<TeamMember[]> {
    const raw = await this.client().fetch(queries.TEAM_QUERY);
    return (raw || []).map(mappers.mapTeamMember);
  }

  async getTeamByBatch(batchSlug: string): Promise<TeamMember[]> {
    const list = await this.getTeam();
    return list.filter((m) => m.batchSlug === batchSlug);
  }

  async getStories(): Promise<VolunteerStory[]> {
    const raw = await this.client().fetch(queries.STORIES_QUERY);
    return (raw || []).map(mappers.mapVolunteerStory);
  }

  async getStoriesByBatch(batchSlug: string): Promise<VolunteerStory[]> {
    const list = await this.getStories();
    return list.filter((s) => s.batchSlug === batchSlug);
  }

  async getFeaturedStories(limit = 3): Promise<VolunteerStory[]> {
    const list = await this.getStories();
    return list.filter((s) => s.featured).slice(0, limit);
  }

  async getNotices(): Promise<Notice[]> {
    const raw = await this.client().fetch(queries.NOTICES_QUERY);
    return (raw || []).map(mappers.mapNotice);
  }

  // Filter helpers
  async getAlbumTypes(): Promise<string[]> {
    const list = await this.getAlbums();
    return [...new Set(list.map((a) => a.type))].sort();
  }

  async getReportTypes(): Promise<string[]> {
    const list = await this.getReports();
    return [...new Set(list.map((r) => r.type))].sort();
  }

  async getHighlightTypes(): Promise<string[]> {
    const list = await this.getHighlights();
    return [...new Set(list.map((h) => h.type))].sort();
  }

  async getYearsFromAlbums(): Promise<number[]> {
    const list = await this.getAlbums();
    return [...new Set(list.map((a) => a.year))].sort((a, b) => b - a);
  }

  async getYearsFromReports(): Promise<number[]> {
    const list = await this.getReports();
    return [...new Set(list.map((r) => r.year))].sort((a, b) => b - a);
  }

  async getYearsFromHighlights(): Promise<number[]> {
    const list = await this.getHighlights();
    return [...new Set(list.map((h) => h.year))].sort((a, b) => b - a);
  }
}
