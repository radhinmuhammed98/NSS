import { getContentSource } from "./config";
import { MockRepository } from "./mockRepository";
import { SanityRepository } from "./sanityRepository";
import type { ContentRepository } from "./repository";
import { siteSettings as mockSettings } from "@/data";
import type { SiteSettings } from "@/types";

// Synchronous batch title lookup cache
const batchTitleCache: Record<string, string> = {};

// Synchronous site settings cache
let siteSettingsCache: SiteSettings = { ...mockSettings };

class CachingRepositoryWrapper implements ContentRepository {
  constructor(private delegate: ContentRepository) {}

  async getSiteSettings() {
    const res = await this.delegate.getSiteSettings();
    siteSettingsCache = res;
    return res;
  }

  async getBatches() {
    const res = await this.delegate.getBatches();
    for (const b of res) {
      batchTitleCache[b.slug] = b.yearRange;
    }
    return res;
  }

  async getBatchBySlug(slug: string) {
    const res = await this.delegate.getBatchBySlug(slug);
    if (res) {
      batchTitleCache[res.slug] = res.yearRange;
    }
    return res;
  }

  async getProjects() { return this.delegate.getProjects(); }
  async getProjectBySlug(slug: string) { return this.delegate.getProjectBySlug(slug); }
  async getProjectsByBatch(batchSlug: string) { return this.delegate.getProjectsByBatch(batchSlug); }
  async getFeaturedProjects(limit?: number) { return this.delegate.getFeaturedProjects(limit); }
  async getCamps() { return this.delegate.getCamps(); }
  async getCampBySlug(slug: string) { return this.delegate.getCampBySlug(slug); }
  async getCampsByBatch(batchSlug: string) { return this.delegate.getCampsByBatch(batchSlug); }
  async getFeaturedCamp() { return this.delegate.getFeaturedCamp(); }
  async getAlbums() { return this.delegate.getAlbums(); }
  async getAlbumBySlug(slug: string) { return this.delegate.getAlbumBySlug(slug); }
  async getAlbumsByBatch(batchSlug: string) { return this.delegate.getAlbumsByBatch(batchSlug); }
  async getVideos() { return this.delegate.getVideos(); }
  async getVideosByBatch(batchSlug: string) { return this.delegate.getVideosByBatch(batchSlug); }
  async getFeaturedVideos(limit?: number) { return this.delegate.getFeaturedVideos(limit); }
  async getReports() { return this.delegate.getReports(); }
  async getReportsByBatch(batchSlug: string) { return this.delegate.getReportsByBatch(batchSlug); }
  async getReportsBySlugs(slugs: string[]) { return this.delegate.getReportsBySlugs(slugs); }
  async getHighlights() { return this.delegate.getHighlights(); }
  async getHighlightBySlug(slug: string) { return this.delegate.getHighlightBySlug(slug); }
  async getHighlightsBySlugs(slugs: string[]) { return this.delegate.getHighlightsBySlugs(slugs); }
  async getHighlightsByBatch(batchSlug: string) { return this.delegate.getHighlightsByBatch(batchSlug); }
  async getFeaturedHighlight() { return this.delegate.getFeaturedHighlight(); }
  async getTimeline(newestFirst?: boolean) { return this.delegate.getTimeline(newestFirst); }
  async getTeam() { return this.delegate.getTeam(); }
  async getTeamByBatch(batchSlug: string) { return this.delegate.getTeamByBatch(batchSlug); }
  async getStories() { return this.delegate.getStories(); }
  async getStoriesByBatch(batchSlug: string) { return this.delegate.getStoriesByBatch(batchSlug); }
  async getFeaturedStories(limit?: number) { return this.delegate.getFeaturedStories(limit); }
  async getNotices() { return this.delegate.getNotices(); }

  async getAlbumTypes() { return this.delegate.getAlbumTypes(); }
  async getReportTypes() { return this.delegate.getReportTypes(); }
  async getHighlightTypes() { return this.delegate.getHighlightTypes(); }
  async getYearsFromAlbums() { return this.delegate.getYearsFromAlbums(); }
  async getYearsFromReports() { return this.delegate.getYearsFromReports(); }
  async getYearsFromHighlights() { return this.delegate.getYearsFromHighlights(); }
}

const source = getContentSource();
const delegateRepo = source === "sanity" ? new SanityRepository() : new MockRepository();

export const contentRepository = new CachingRepositoryWrapper(delegateRepo);

export function getBatchTitleSync(slug?: string): string {
  if (!slug) return "";
  return batchTitleCache[slug] || slug;
}
export function getBatchTitle(slug?: string): string {
  return getBatchTitleSync(slug);
}

export function getSiteSettingsSync(): SiteSettings {
  return siteSettingsCache;
}
