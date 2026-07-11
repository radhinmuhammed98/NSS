import type { ContentRepository } from "./repository";
import { getSanityClient } from "./sanityClient";
import * as queries from "./queries";
import * as mappers from "./mappers";
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

export class SanityRepository implements ContentRepository {
  private async client() {
    return getSanityClient();
  }

  async getSiteSettings(): Promise<SiteSettings> {
    const raw = await (await this.client()).fetch(queries.SETTINGS_QUERY);
    if (!raw) throw new Error("No Site Settings document found in Sanity.");
    return mappers.mapSiteSettings(raw);
  }

  async getHomePage(): Promise<HomePage> {
    const raw = await (await this.client()).fetch(queries.HOME_QUERY);
    return mappers.mapHomePage(raw || {});
  }

  async getAboutPage(): Promise<AboutPage> {
    const raw = await (await this.client()).fetch(queries.ABOUT_QUERY);
    return mappers.mapAboutPage(raw || {});
  }

  async getProjects(): Promise<Project[]> {
    const raw = await (await this.client()).fetch(queries.PROJECTS_QUERY);
    return (raw || []).map(mappers.mapProject);
  }

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    const raw = await (await this.client()).fetch(queries.PROJECT_BY_SLUG_QUERY, { slug });
    return raw ? mappers.mapProject(raw) : undefined;
  }

  async getFeaturedProjects(limit = 6): Promise<Project[]> {
    const list = await this.getProjects();
    return list.filter((p) => p.featured).slice(0, limit);
  }

  async getCamps(): Promise<Camp[]> {
    const raw = await (await this.client()).fetch(queries.CAMPS_QUERY);
    return (raw || []).map(mappers.mapCamp);
  }

  async getCampBySlug(slug: string): Promise<Camp | undefined> {
    const raw = await (await this.client()).fetch(queries.CAMP_BY_SLUG_QUERY, { slug });
    return raw ? mappers.mapCamp(raw) : undefined;
  }

  async getFeaturedCamp(): Promise<Camp | undefined> {
    const list = await this.getCamps();
    const featured = list.find((c) => c.featured) ?? list[0];
    return featured;
  }

  async getAlbums(): Promise<GalleryAlbum[]> {
    const raw = await (await this.client()).fetch(queries.ALBUMS_QUERY);
    return (raw || []).map(mappers.mapGalleryAlbum);
  }

  async getAlbumBySlug(slug: string): Promise<GalleryAlbum | undefined> {
    const raw = await (await this.client()).fetch(queries.ALBUM_BY_SLUG_QUERY, { slug });
    return raw ? mappers.mapGalleryAlbum(raw) : undefined;
  }

  async getReports(): Promise<Report[]> {
    const raw = await (await this.client()).fetch(queries.REPORTS_QUERY);
    return (raw || []).map(mappers.mapReport);
  }

  async getReportsBySlugs(slugs: string[]): Promise<Report[]> {
    const list = await this.getReports();
    return list.filter((r) => slugs.includes(r.slug));
  }

  async getHighlights(): Promise<Highlight[]> {
    const raw = await (await this.client()).fetch(queries.HIGHLIGHTS_QUERY);
    return (raw || []).map(mappers.mapHighlight);
  }

  async getHighlightBySlug(slug: string): Promise<Highlight | undefined> {
    const raw = await (await this.client()).fetch(queries.HIGHLIGHT_BY_SLUG_QUERY, { slug });
    return raw ? mappers.mapHighlight(raw) : undefined;
  }

  async getHighlightsBySlugs(slugs: string[]): Promise<Highlight[]> {
    const list = await this.getHighlights();
    return list.filter((h) => slugs.includes(h.slug));
  }

  async getFeaturedHighlight(): Promise<Highlight | undefined> {
    const list = await this.getHighlights();
    const featured = list.find((h) => h.featured) ?? list[0];
    return featured;
  }

  async getTimeline(newestFirst = false): Promise<TimelineItem[]> {
    const raw = await (await this.client()).fetch(queries.TIMELINE_QUERY);
    const list: TimelineItem[] = (raw || []).map(mappers.mapTimelineItem);
    return list.sort((a, b) =>
      newestFirst ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)
    );
  }

  async getTeam(): Promise<TeamMember[]> {
    const raw = await (await this.client()).fetch(queries.TEAM_QUERY);
    return (raw || []).map(mappers.mapTeamMember);
  }

  async getCurrentBatchTeam(): Promise<TeamMember[]> {
    const raw = await (await this.client()).fetch(queries.CURRENT_BATCH_TEAM_QUERY);
    // If no members are linked to a current batch, fall back to all team members
    if (!raw || raw.length === 0) {
      return this.getTeam();
    }
    return raw.map(mappers.mapTeamMember);
  }

  async getStories(): Promise<VolunteerStory[]> {
    const raw = await (await this.client()).fetch(queries.STORIES_QUERY);
    return (raw || []).map(mappers.mapVolunteerStory);
  }

  async getFeaturedStories(limit = 3): Promise<VolunteerStory[]> {
    const list = await this.getStories();
    return list.filter((s) => s.featured).slice(0, limit);
  }

  async getNotices(): Promise<Notice[]> {
    const raw = await (await this.client()).fetch(queries.NOTICES_QUERY);
    return (raw || []).map(mappers.mapNotice);
  }

  async getDonation(): Promise<Donation> {
    const raw = await (await this.client()).fetch(queries.DONATION_QUERY);
    return mappers.mapDonation(raw);
  }

  async getSocialLinks(): Promise<SocialLinks> {
    const raw = await (await this.client()).fetch(queries.SOCIAL_LINKS_QUERY);
    return mappers.mapSocialLinks(raw);
  }

  // Batch methods
  async getBatches(): Promise<Batch[]> {
    const raw = await (await this.client()).fetch(queries.BATCHES_QUERY);
    return (raw || []).map(mappers.mapBatch);
  }

  async getCurrentBatch(): Promise<Batch | undefined> {
    const raw = await (await this.client()).fetch(queries.CURRENT_BATCH_QUERY);
    return raw ? mappers.mapBatch(raw) : undefined;
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

