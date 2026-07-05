// NSS Digital Legacy — content model types

export type ProjectStatus = "completed" | "ongoing" | "planned";
export type BatchStatus = "current" | "previous" | "archive";

export interface Batch {
  slug: string;
  title: string;
  academicYear: string;
  status: BatchStatus;
  description?: string;
}



export interface ImpactMetric {
  label: string;
  value: string;
  icon?: string;
}

export interface ImageAsset {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
}

export interface SiteSettings {
  schoolName: string;
  unitName: string;
  motto: string;
  location: string;
  academicYear: string;
  schoolLogo?: string;
  nssLogo?: string;
  principal?: string;
  programmeOfficer: string;
  volunteerSecretary: string;
  volunteerStrength?: number;
  email: string;
  phone?: string;
  footerDescription?: string;
}

export interface HomePage {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
  homeFeatures?: {
    title: string;
    subtitle?: string;
    description?: string;
    accentColor?: string;
  }[];
  reachOutCtaTitle?: string;
  reachOutCtaSubtitle?: string;
  reachOutCtaDescription?: string;
}

export interface AboutPage {
  mission: string;
  vision: string;
  objectives: string[];
  history: string;
  achievements: string[];
}

export interface Project {
  slug: string;
  title: string;
  date: string;
  year: number;
  batchSlug: string;
  category: string;
  location: string;
  status: ProjectStatus;
  summary: string;
  description: any; // rich text now
  problemAddressed: string;
  whatNssDid: string;
  coverImage: string;
  images: ImageAsset[];
  impactMetrics: ImpactMetric[];
  relatedCampSlug?: string;
  reportSlugs: string[];
  highlightSlugs: string[];
  organizers: string[];
  featured: boolean;
  campRelated: boolean;
}

export interface CampDay {
  dayNumber: number;
  date: string;
  title: string;
  description: any; // rich text now
  activities: string[];
  guests?: string[];
  images?: ImageAsset[];
}

export interface Camp {
  slug: string;
  title: string;
  year: number;
  batchSlug: string;
  location: string;
  theme: string;
  startDate: string;
  endDate: string;
  summary: string;
  description: any; // rich text now
  programmeOfficer: string;
  campLeaders: string[];
  volunteerCount: number;
  coverImage: string;
  dayWiseActivities: CampDay[];
  projectSlugs: string[];
  impactMetrics: ImpactMetric[];
  reportSlugs: string[];
  highlightSlugs: string[];
  featured: boolean;
}

export interface GalleryAlbum {
  slug: string;
  title: string;
  date: string;
  year: number;
  batchSlug?: string;
  type: string;
  description: string;
  coverImage: string;
  images: ImageAsset[];
}

export interface VideoClip {
  slug: string;
  title: string;
  type: string;
  year: number;
  batchSlug?: string;
  relatedProjectSlug?: string;
  relatedCampSlug?: string;
  url: string;
  thumbnail: string;
  duration: string;
  description: string;
  featured: boolean;
}

export interface Report {
  slug: string;
  title: string;
  type: string;
  date: string;
  year: number;
  batchSlug?: string;
  relatedProjectSlug?: string;
  relatedCampSlug?: string;
  file: string;
  description: string;
  isPublic: boolean;
}

export interface Highlight {
  slug: string;
  title: string;
  type: string;
  date: string;
  year: number;
  batchSlug?: string;
  relatedProjectSlug?: string;
  relatedCampSlug?: string;
  description: string;
  image: string;
  featured: boolean;
  priority: number;
}

export interface TimelineItem {
  slug: string;
  title: string;
  date: string;
  year: number;
  type: string;
  description: string;
  image?: string;
  batchSlug?: string;
  importance: "high" | "medium" | "low";
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  batchSlug?: string;
  photo: string;
  bio: string;
  order: number;
}

export interface VolunteerStory {
  slug: string;
  name: string;
  batchSlug: string;
  photo: string;
  quote: string;
  title: string;
  story: any; // rich text now
  relatedProjectSlug?: string;
  relatedCampSlug?: string;
  featured: boolean;
}

export interface Notice {
  slug: string;
  title: string;
  date: string;
  type: string;
  description: any; // rich text now
  attachment?: string;
  important: boolean;
}

export interface Donation {
  enabled: boolean;
  upiId?: string;
  qrImageUrl?: string;
  bankAccount?: {
    name?: string;
    account?: string;
    ifsc?: string;
    bank?: string;
    branch?: string;
  };
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  twitter?: string;
}
