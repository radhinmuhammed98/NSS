import type {
  Batch,
  Camp,
  GalleryAlbum,
  Highlight,
  Notice,
  Project,
  Report,
  SiteSettings,
  TeamMember,
  TimelineItem,
  VideoClip,
  VolunteerStory,
} from "@/types";

import img29 from "@/assets/IMG-20260625-WA0029.jpg?w=800&format=webp&quality=72&imagetools";

export const realImages = [img29];
export const realVideos: string[] = [];

export const heroNss = img29;

export const siteSettings: SiteSettings = {
  schoolName: "KHMHSS Valakkulam",
  unitName: "NSS Unit 11223",
  motto: "Not Me, But You",
  location: "Pookkiparamba, Malappuram, Kerala",
  academicYear: "2025–26",
  programmeOfficer: "",
  volunteerSecretary: "",
  email: "khmhsvalakulam@gmail.com",
  phone: "0494 2496753",
  mission:
    "To develop the personality of students through community service and instil a spirit of social responsibility — helping those around us heal, grow, and thrive.",
  vision:
    "A generation of compassionate, responsible citizens shaped by selfless service — young hands that plant trees, hold hands, and light the way for their community.",
  objectives: [
    "Understand the community in which volunteers work",
    "Identify the needs and problems of the community",
    "Develop a sense of social and civic responsibility",
    "Apply knowledge to find practical solutions to problems",
    "Develop competence required for group living and shared responsibility",
    "Gain skills in mobilising community participation",
    "Practise national integration and social harmony",
  ],
  history: "",
  achievements: [],
};

export const batches: Batch[] = [
  {
    slug: "batch-2025-26",
    title: "Batch 2025–26",
    yearRange: "2025–26",
    year: 2025,
    description: "",
    theme: "",
    coverImage: heroNss,
    programmeOfficer: "",
    volunteerSecretary: "",
    leaders: [],
    volunteerCount: 0,
    impactMetrics: [],
    featured: true,
  },
];

export const projects: Project[] = [];
export const camps: Camp[] = [];
export const galleryAlbums: GalleryAlbum[] = [];
export const videoClips: VideoClip[] = [];
export const reports: Report[] = [];
export const highlights: Highlight[] = [];
export const timelineItems: TimelineItem[] = [];
export const teamMembers: TeamMember[] = [];
export const volunteerStories: VolunteerStory[] = [];
export const notices: Notice[] = [];

export const projectCategories = [
  "Environment",
  "Health",
  "Education",
  "Anti-Drug Awareness",
  "Road Safety",
  "Blood Donation",
  "Palliative Care",
  "Community Cleaning",
  "Disaster Relief",
  "Digital Literacy",
  "School Development",
  "Charity",
  "Social Survey",
  "Women Empowerment",
  "Special Camp Activity",
  "Other",
];
