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

// Genuine NSS KHMHSS Valakkulam photographs
import img29 from "@/assets/IMG-20260625-WA0029.jpg?w=800&format=webp&quality=72&imagetools";
import img04 from "@/assets/IMG-20260626-WA0004.jpg?w=800&format=webp&quality=72&imagetools";
import img05 from "@/assets/IMG-20260626-WA0005.jpg?w=800&format=webp&quality=72&imagetools";
import img06 from "@/assets/IMG-20260626-WA0006.jpg?w=800&format=webp&quality=72&imagetools";
import img07 from "@/assets/IMG-20260626-WA0007.jpg?w=800&format=webp&quality=72&imagetools";
import img08 from "@/assets/IMG-20260626-WA0008.jpg?w=800&format=webp&quality=72&imagetools";
import img09 from "@/assets/IMG-20260626-WA0009.jpg?w=800&format=webp&quality=72&imagetools";
import img10 from "@/assets/IMG-20260626-WA0010.jpg?w=800&format=webp&quality=72&imagetools";
import img11 from "@/assets/IMG-20260626-WA0011.jpg?w=800&format=webp&quality=72&imagetools";
import img12 from "@/assets/IMG-20260626-WA0012.jpg?w=800&format=webp&quality=72&imagetools";
import img13 from "@/assets/IMG-20260626-WA0013.jpg?w=800&format=webp&quality=72&imagetools";
import img14 from "@/assets/IMG-20260626-WA0014.jpg?w=800&format=webp&quality=72&imagetools";
import img15 from "@/assets/IMG-20260626-WA0015.jpg?w=800&format=webp&quality=72&imagetools";
import img16 from "@/assets/IMG-20260626-WA0016.jpg?w=800&format=webp&quality=72&imagetools";
import img17 from "@/assets/IMG-20260626-WA0017.jpg?w=800&format=webp&quality=72&imagetools";
import img18 from "@/assets/IMG-20260626-WA0018.jpg?w=800&format=webp&quality=72&imagetools";
import img19 from "@/assets/IMG-20260626-WA0019.jpg?w=800&format=webp&quality=72&imagetools";
import img20 from "@/assets/IMG-20260626-WA0020.jpg?w=800&format=webp&quality=72&imagetools";

// Genuine NSS KHMHSS Valakkulam videos
import vid31 from "@/assets/VID-20260625-WA0031.mp4";
import vid21 from "@/assets/VID-20260626-WA0021.mp4";
import vid22 from "@/assets/VID-20260626-WA0022.mp4";
import vid23 from "@/assets/VID-20260626-WA0023.mp4";
import vid24 from "@/assets/VID-20260626-WA0024.mp4";
import vid25 from "@/assets/VID-20260626-WA0025.mp4";

export const realImages = [
  img29, img04, img05, img06, img07, img08, img09, img10,
  img11, img12, img13, img14, img15, img16, img17, img18,
  img19, img20
];

export const realVideos = [
  vid31, vid21, vid22, vid23, vid24, vid25
];

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
    description: "The active batch carrying forward regular activities and social outreach initiatives.",
    theme: "Service and Growth",
    coverImage: heroNss,
    programmeOfficer: "",
    volunteerSecretary: "",
    leaders: [],
    volunteerCount: 0,
    impactMetrics: [],
    featured: true,
  },
];

export const projects: Project[] = [
  {
    slug: "blood-donation-camp",
    title: "Blood Donation Camp",
    date: "2025-11-20",
    year: 2025,
    batchSlug: "batch-2025-26",
    category: "Blood Donation",
    location: "School Campus",
    status: "completed",
    summary:
      "A voluntary blood donation drive organized by the NSS unit in coordination with the local hospital.",
    description:
      "Volunteers supported hospital staff, arranged the registration desks, donor beds, and awareness banners to encourage participation from eligible volunteers and teachers.",
    problemAddressed:
      "Assisting nearby hospital blood banks in meeting the ongoing demand for emergency cases.",
    whatNssDid:
      "Arranged logistics, welcomed donors, and set up registration counters to ensure a smooth flow of volunteers.",
    coverImage: img04,
    images: [
      { id: "b1", src: img04, alt: "Volunteers at registration" },
      { id: "b2", src: img09, alt: "Donor setup" },
    ],
    impactMetrics: [],
    reportSlugs: [],
    highlightSlugs: [],
    organizers: [],
    featured: true,
    campRelated: false,
  },
  {
    slug: "childrens-day-celebration",
    title: "Children's Day Celebration",
    date: "2025-11-14",
    year: 2025,
    batchSlug: "batch-2025-26",
    category: "Education",
    location: "AUP School, Valakkulam",
    status: "completed",
    summary:
      "Interactive games, storytelling, and celebration with primary school children.",
    description:
      "Volunteers visited local primary school kids, hosting interactive activities, teaching simple songs, and sharing treats to build school-community relationships.",
    problemAddressed:
      "Engaging with local primary school children to foster positive community interaction.",
    whatNssDid:
      "Organized and hosted child-friendly games, interactive sessions, and distributed sweets.",
    coverImage: img10,
    images: [
      { id: "c1", src: img10, alt: "Volunteers with kids" },
      { id: "c2", src: img11, alt: "Activity session" },
      { id: "c3", src: img12, alt: "Group photo with students" },
    ],
    impactMetrics: [],
    reportSlugs: [],
    highlightSlugs: [],
    organizers: [],
    featured: true,
    campRelated: false,
  },
  {
    slug: "inter-district-monitoring",
    title: "Inter-District Monitoring Visit",
    date: "2026-02-12",
    year: 2026,
    batchSlug: "batch-2025-26",
    category: "Other",
    location: "NSS Room, KHMHSS",
    status: "completed",
    summary:
      "An official monitoring visit evaluating the unit's activity logs, special camp registers, and accounts.",
    description:
      "The unit presented its records, service books, and program logs for official evaluation by the district coordinator, who reviewed regular activities and special camp accomplishments.",
    problemAddressed:
      "Statutory annual monitoring and audit compliance of the unit's activities.",
    whatNssDid:
      "Compiled record registers, logbooks, and financial statements for coordinator audit.",
    coverImage: img13,
    images: [
      { id: "m1", src: img13, alt: "Record book review" },
      { id: "m2", src: img14, alt: "Monitoring evaluation" },
    ],
    impactMetrics: [],
    reportSlugs: [],
    highlightSlugs: [],
    organizers: [],
    featured: false,
    campRelated: false,
  },
];

export const camps: Camp[] = [
  {
    slug: "seven-day-special-camp",
    title: "Seven-Day Special Camp",
    year: 2026,
    batchSlug: "batch-2025-26",
    location: "Ward Community Centre",
    theme: "Service and Self-Sufficiency",
    startDate: "2026-01-02",
    endDate: "2026-01-08",
    summary:
      "A week-long residential camp for volunteers focusing on community surveys, cleaning, and interactive sessions.",
    description:
      "Volunteers stayed in the community, managed daily cooking, cleanup, field tasks, and conducted social surveys to understand local civic needs.",
    programmeOfficer: "",
    campLeaders: [],
    volunteerCount: 0,
    coverImage: img05,
    dayWiseActivities: [
      {
        dayNumber: 1,
        date: "2026-01-02",
        title: "Camp Inauguration & Orientation",
        description: "Official flag hoisting and registration of resident camp volunteers.",
        activities: ["Flag hoisting", "Orientation session", "Committee formation"],
        images: [{ id: "cd1", src: img05, alt: "Inauguration group" }],
      },
      {
        dayNumber: 2,
        date: "2026-01-03",
        title: "Community Survey & Interaction",
        description: "Volunteers visited local households to compile basic civic needs.",
        activities: ["Household visits", "Survey data collection"],
        images: [{ id: "cd2", src: img06, alt: "Survey visit" }],
      },
      {
        dayNumber: 3,
        date: "2026-01-04",
        title: "Local Cleaning Drive",
        description: "Cleaning and clearing public pathways and school surrounds.",
        activities: ["Pathway cleanup", "Segregation of collected waste"],
        images: [{ id: "cd3", src: img07, alt: "Volunteers cleaning" }],
      },
      {
        dayNumber: 4,
        date: "2026-01-05",
        title: "Hygiene & Health Session",
        description: "Conducted health awareness interaction for residents.",
        activities: ["Health awareness talks"],
      },
      {
        dayNumber: 5,
        date: "2026-01-06",
        title: "Environmental Sapling Plantation",
        description: "Planting native trees in public spaces and campus surrounds.",
        activities: ["Digging and sapling plantation"],
        images: [{ id: "cd5", src: img08, alt: "Sapling planting" }],
      },
      {
        dayNumber: 6,
        date: "2026-01-07",
        title: "Camp Fire & Cultural Session",
        description: "Volunteers hosted simple cultural activities and folk songs by the fire.",
        activities: ["Folk songs", "Team reflections"],
      },
      {
        dayNumber: 7,
        date: "2026-01-08",
        title: "Valedictory & Review",
        description: "Concluding session with feedback collection and cleaning of the camp facility.",
        activities: ["Feedback collection", "Camp facility cleanup"],
      },
    ],
    projectSlugs: [],
    impactMetrics: [],
    reportSlugs: [],
    highlightSlugs: [],
    featured: true,
  },
];

export const galleryAlbums: GalleryAlbum[] = [
  {
    slug: "blood-donation-camp-album",
    title: "Blood Donation Camp",
    date: "2025-11-20",
    year: 2025,
    batchSlug: "batch-2025-26",
    type: "Project Album",
    description: "Activity photos from the blood donation drive.",
    coverImage: img04,
    images: [
      { id: "ga1", src: img04, alt: "Volunteers at registration table", caption: "Registration counter" },
      { id: "ga2", src: img09, alt: "Donor room setup", caption: "Camp setup" },
    ],
  },
  {
    slug: "childrens-day-album",
    title: "Children's Day Celebration",
    date: "2025-11-14",
    year: 2025,
    batchSlug: "batch-2025-26",
    type: "Project Album",
    description: "Photos from our primary school interactive program.",
    coverImage: img10,
    images: [
      { id: "ga3", src: img10, alt: "Volunteers playing with children", caption: "Interactive games" },
      { id: "ga4", src: img11, alt: "Singing session", caption: "Volunteers teaching songs" },
      { id: "ga5", src: img12, alt: "Group photo with primary students", caption: "Valedictory photo" },
    ],
  },
  {
    slug: "special-camp-album",
    title: "Special Camp",
    date: "2026-01-08",
    year: 2026,
    batchSlug: "batch-2025-26",
    type: "Camp Album",
    description: "Captures from the seven-day residential special camp.",
    coverImage: img05,
    images: [
      { id: "ga6", src: img05, alt: "Inauguration ceremony", caption: "Inauguration gathering" },
      { id: "ga7", src: img06, alt: "Volunteers heading out", caption: "Outreach field work" },
      { id: "ga8", src: img07, alt: "Volunteers cleaning paths", caption: "Physical labor session" },
      { id: "ga9", src: img08, alt: "Sapling planting", caption: "Green campaign planting" },
    ],
  },
  {
    slug: "monitoring-visit-album",
    title: "Monitoring Visit",
    date: "2026-02-12",
    year: 2026,
    batchSlug: "batch-2025-26",
    type: "Project Album",
    description: "Documentation and record evaluation by district coordinator.",
    coverImage: img13,
    images: [
      { id: "ga10", src: img13, alt: "Reviewing camp logs", caption: "Register audit" },
      { id: "ga11", src: img14, alt: "Coordinator evaluation", caption: "District coordinator review" },
    ],
  },
  {
    slug: "unit-life-album",
    title: "Unit Life",
    date: "2026-02-15",
    year: 2026,
    batchSlug: "batch-2025-26",
    type: "Other",
    description: "Regular activities, meetings, and volunteer life.",
    coverImage: img15,
    images: [
      { id: "ga12", src: img15, alt: "Volunteers gathering", caption: "Unit meeting" },
      { id: "ga13", src: img16, alt: "Group discussion", caption: "Committee session" },
      { id: "ga14", src: img17, alt: "Campus regular activity", caption: "Campus cleanup work" },
      { id: "ga15", src: img18, alt: "Volunteers interacting", caption: "Volunteer team life" },
    ],
  },
];

export const videoClips: VideoClip[] = [
  {
    slug: "nss-orientation-video",
    title: "NSS Orientation Program - Activity Video",
    type: "Project Clip",
    year: 2025,
    batchSlug: "batch-2025-26",
    url: vid31,
    thumbnail: img29,
    duration: "1:42",
    description: "Orientation program welcoming the active batch of volunteers.",
    featured: true,
  },
  {
    slug: "special-camp-work-video",
    title: "Special Camp - Activity Video",
    type: "Camp Clip",
    year: 2026,
    batchSlug: "batch-2025-26",
    relatedCampSlug: "seven-day-special-camp",
    url: vid21,
    thumbnail: img04,
    duration: "0:35",
    description: "Volunteer field work and daily camp operations recap.",
    featured: true,
  },
  {
    slug: "community-service-cleaning-video",
    title: "Community Service Cleaning - Activity Video",
    type: "Camp Clip",
    year: 2026,
    batchSlug: "batch-2025-26",
    relatedCampSlug: "seven-day-special-camp",
    url: vid22,
    thumbnail: img05,
    duration: "0:45",
    description: "Volunteers clearing public spaces and paths during special camp.",
    featured: true,
  },
  {
    slug: "camp-fire-cultural-video",
    title: "Camp Fire & Cultural Session - Activity Video",
    type: "Camp Clip",
    year: 2026,
    batchSlug: "batch-2025-26",
    relatedCampSlug: "seven-day-special-camp",
    url: vid23,
    thumbnail: img06,
    duration: "0:52",
    description: "Evening folk songs and team building session by the camp fire.",
    featured: false,
  },
  {
    slug: "farming-gardening-video",
    title: "Farming & Gardening Drive - Activity Video",
    type: "Project Clip",
    year: 2025,
    batchSlug: "batch-2025-26",
    url: vid24,
    thumbnail: img07,
    duration: "0:48",
    description: "Regular campus garden cleaning and soil preparation activities.",
    featured: false,
  },
  {
    slug: "volunteers-reflection-video",
    title: "Volunteers Reflection Session - Memory Video",
    type: "Volunteer Memory",
    year: 2026,
    batchSlug: "batch-2025-26",
    url: vid25,
    thumbnail: img08,
    duration: "0:40",
    description: "Shared feedback and memories of group living and social work.",
    featured: false,
  },
];

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
