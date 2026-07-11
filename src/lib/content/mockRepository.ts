import type { ContentRepository } from "./repository";
import {
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
  SocialLinks,
} from "@/types";

export class MockRepository implements ContentRepository {
  async getSiteSettings(): Promise<SiteSettings> {
    return { ...siteSettings };
  }

  async getHomePage(): Promise<HomePage> {
    return {} as HomePage;
  }

  async getAboutPage(): Promise<AboutPage> {
    return {} as AboutPage;
  }

  async getProjects(): Promise<Project[]> {
    return [...projects].sort((a, b) => b.date.localeCompare(a.date));
  }

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    return projects.find((p) => p.slug === slug);
  }

  async getFeaturedProjects(limit = 6): Promise<Project[]> {
    const list = await this.getProjects();
    return list.filter((p) => p.featured && p.showOnHome !== false).slice(0, limit);
  }

  async getCamps(): Promise<Camp[]> {
    return [...camps].sort((a, b) => b.year - a.year);
  }

  async getCampBySlug(slug: string): Promise<Camp | undefined> {
    return camps.find((c) => c.slug === slug);
  }

  async getFeaturedCamp(): Promise<Camp | undefined> {
    return camps.find((c) => c.featured) ?? camps[0];
  }

  async getAlbums(): Promise<GalleryAlbum[]> {
    return [...galleryAlbums].sort((a, b) => b.date.localeCompare(a.date));
  }

  async getAlbumBySlug(slug: string): Promise<GalleryAlbum | undefined> {
    return galleryAlbums.find((a) => a.slug === slug);
  }

  async getReports(): Promise<Report[]> {
    return [...reports].sort((a, b) => b.date.localeCompare(a.date));
  }

  async getReportsBySlugs(slugs: string[]): Promise<Report[]> {
    return reports.filter((r) => slugs.includes(r.slug));
  }

  async getHighlights(): Promise<Highlight[]> {
    return [...highlights].sort((a, b) => a.priority - b.priority);
  }

  async getHighlightBySlug(slug: string): Promise<Highlight | undefined> {
    return highlights.find((h) => h.slug === slug);
  }

  async getHighlightsBySlugs(slugs: string[]): Promise<Highlight[]> {
    return highlights.filter((h) => slugs.includes(h.slug));
  }

  async getFeaturedHighlight(): Promise<Highlight | undefined> {
    return highlights.find((h) => h.featured) ?? (await this.getHighlights())[0];
  }

  async getTimeline(newestFirst = false): Promise<TimelineItem[]> {
    return [...timelineItems].sort((a, b) =>
      newestFirst ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)
    );
  }

  async getTeam(): Promise<TeamMember[]> {
    return [...teamMembers].sort((a, b) => a.order - b.order);
  }

  async getCurrentBatchTeam(): Promise<TeamMember[]> {
    return this.getTeam();
  }

  async getStories(): Promise<VolunteerStory[]> {
    return [...volunteerStories];
  }

  async getFeaturedStories(limit = 3): Promise<VolunteerStory[]> {
    const list = await this.getStories();
    return list.filter((s) => s.featured).slice(0, limit);
  }

  async getNotices(): Promise<Notice[]> {
    return [...notices].sort((a, b) => b.date.localeCompare(a.date));
  }

  async getSocialLinks(): Promise<SocialLinks> {
    return {
      facebook: "https://facebook.com/nssvalakkulam",
      instagram: "https://instagram.com/nssvalakkulam",
      youtube: "https://youtube.com/@nssvalakkulam",
      twitter: "https://twitter.com/nssvalakkulam",
    };
  }

  // Batch methods
  async getBatches(): Promise<Batch[]> {
    return [
      {
        slug: "batch-2025-26",
        title: "Batch 2025-26",
        academicYear: "2025-26",
        status: "current",
        description: "The active batch serving the community.",
        leader1Name: "Ismail Ansari KF",
        leader1Role: "Volunteer Secretary",
        leader1Photo: "",
        leader2Name: "(Name Coming Soon)",
        leader2Role: "Volunteer Secretary",
        leader2Photo: "",
      }
    ];
  }

  async getCurrentBatch(): Promise<Batch | undefined> {
    const list = await this.getBatches();
    return list.find((b) => b.status === "current");
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

