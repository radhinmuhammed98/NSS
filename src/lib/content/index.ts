import { getContentSource } from "./config";
import { MockRepository } from "./mockRepository";
import { SanityRepository } from "./sanityRepository";
import type { ContentRepository } from "./repository";
import { siteSettings as mockSettings } from "@/data";
import type {
  Batch,
  SiteSettings,
  SocialLinks,
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

// Synchronous site settings cache
let siteSettingsCache: SiteSettings = { ...mockSettings };

class CachingRepositoryWrapper implements ContentRepository {
  private fallback = new MockRepository();

  constructor(private delegate: ContentRepository) {}

  private async safeCall<T>(method: keyof ContentRepository, defaultValue: T, ...args: any[]): Promise<T> {
    try {
      const fn = this.delegate[method] as (...a: any[]) => Promise<T>;
      return await fn.apply(this.delegate, args);
    } catch (error) {
      console.error(`Sanity ContentRepository.${method} failed, falling back to mock data:`, error);
      try {
        const fn = this.fallback[method] as (...a: any[]) => Promise<T>;
        return await fn.apply(this.fallback, args);
      } catch (fallbackError) {
        console.error(`Mock fallback for ${method} also failed:`, fallbackError);
        return defaultValue;
      }
    }
  }

  async getSiteSettings() {
    const res = await this.safeCall<SiteSettings>("getSiteSettings", mockSettings);
    siteSettingsCache = res;
    return res;
  }

  async getHomePage() { return this.safeCall("getHomePage", {} as any); }
  async getAboutPage() { return this.safeCall("getAboutPage", {} as any); }

  async getProjects() { return this.safeCall<Project[]>("getProjects", []); }
  async getProjectBySlug(slug: string) { return this.safeCall<Project | undefined>("getProjectBySlug", undefined, slug); }
  async getFeaturedProjects(limit?: number) { return this.safeCall<Project[]>("getFeaturedProjects", [], limit); }
  async getCamps() { return this.safeCall<Camp[]>("getCamps", []); }
  async getCampBySlug(slug: string) { return this.safeCall<Camp | undefined>("getCampBySlug", undefined, slug); }
  async getFeaturedCamp() {
    try {
      return await this.delegate.getFeaturedCamp();
    } catch (e) {
      console.error("Sanity getFeaturedCamp failed, falling back to mock:", e);
      return this.fallback.getFeaturedCamp();
    }
  }
  async getAlbums() { return this.safeCall<GalleryAlbum[]>("getAlbums", []); }
  async getAlbumBySlug(slug: string) { return this.safeCall<GalleryAlbum | undefined>("getAlbumBySlug", undefined, slug); }
  async getVideos() { return this.safeCall<VideoClip[]>("getVideos", []); }
  async getFeaturedVideos(limit?: number) { return this.safeCall<VideoClip[]>("getFeaturedVideos", [], limit); }
  async getReports() { return this.safeCall<Report[]>("getReports", []); }
  async getReportsBySlugs(slugs: string[]) { return this.safeCall<Report[]>("getReportsBySlugs", [], slugs); }
  async getHighlights() { return this.safeCall<Highlight[]>("getHighlights", []); }
  async getHighlightBySlug(slug: string) { return this.safeCall<Highlight | undefined>("getHighlightBySlug", undefined, slug); }
  async getHighlightsBySlugs(slugs: string[]) { return this.safeCall<Highlight[]>("getHighlightsBySlugs", [], slugs); }
  async getFeaturedHighlight() {
    try {
      return await this.delegate.getFeaturedHighlight();
    } catch (e) {
      console.error("Sanity getFeaturedHighlight failed, falling back to mock:", e);
      return this.fallback.getFeaturedHighlight();
    }
  }
  async getTimeline(newestFirst?: boolean) { return this.safeCall<TimelineItem[]>("getTimeline", [], newestFirst); }
  async getTeam() { return this.safeCall<TeamMember[]>("getTeam", []); }
  async getCurrentBatchTeam() { return this.safeCall<TeamMember[]>("getCurrentBatchTeam", []); }
  async getStories() { return this.safeCall<VolunteerStory[]>("getStories", []); }
  async getFeaturedStories(limit?: number) { return this.safeCall<VolunteerStory[]>("getFeaturedStories", [], limit); }
  async getNotices() { return this.safeCall<Notice[]>("getNotices", []); }
  async getDonation() { return this.safeCall("getDonation", { enabled: false } as any); }
  async getSocialLinks() { return this.safeCall<SocialLinks>("getSocialLinks", {} as SocialLinks); }

  async getAlbumTypes() { return this.safeCall<string[]>("getAlbumTypes", []); }
  async getReportTypes() { return this.safeCall<string[]>("getReportTypes", []); }
  async getHighlightTypes() { return this.safeCall<string[]>("getHighlightTypes", []); }
  async getYearsFromAlbums() { return this.safeCall<number[]>("getYearsFromAlbums", []); }
  async getYearsFromReports() { return this.safeCall<number[]>("getYearsFromReports", []); }
  async getYearsFromHighlights() { return this.safeCall<number[]>("getYearsFromHighlights", []); }

  // Batch methods
  async getBatches() { return this.safeCall<Batch[]>("getBatches", []); }
  async getCurrentBatch() { return this.safeCall<Batch | undefined>("getCurrentBatch", undefined); }
}

const source = getContentSource();
const delegateRepo = source === "sanity" ? new SanityRepository() : new MockRepository();

export const contentRepository: ContentRepository = new CachingRepositoryWrapper(delegateRepo);

export function getSiteSettingsSync(): SiteSettings {
  return siteSettingsCache;
}

export function getSocialLinksSync(): SocialLinks {
  return {};
}
