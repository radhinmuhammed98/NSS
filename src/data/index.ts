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

import heroNss from "@/assets/hero-nss.jpg?w=1280&format=webp&quality=72&imagetools";
import albumPlastic from "@/assets/album-plastic.jpg?w=800&format=webp&quality=72&imagetools";
import albumCamp from "@/assets/album-camp.jpg?w=800&format=webp&quality=72&imagetools";
import albumTrees from "@/assets/album-trees.jpg?w=800&format=webp&quality=72&imagetools";
import avatar1 from "@/assets/avatar1.jpg?w=256&format=webp&quality=72&imagetools";
import avatar2 from "@/assets/avatar2.jpg?w=256&format=webp&quality=72&imagetools";
import avatar3 from "@/assets/avatar3.jpg?w=256&format=webp&quality=72&imagetools";
import avatar4 from "@/assets/avatar4.jpg?w=256&format=webp&quality=72&imagetools";
import avatar5 from "@/assets/avatar5.jpg?w=256&format=webp&quality=72&imagetools";

export { heroNss };

const img = (seed: string, w = 800, h = 600) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const siteSettings: SiteSettings = {
  schoolName: "Govt. Higher Secondary School",
  unitName: "NSS Unit",
  motto: "Not Me, But You",
  location: "Kerala, India",
  academicYear: "2025–26",
  programmeOfficer: "Mr. A. Kumar",
  volunteerSecretary: "Ms. Anjana R.",
  email: "nss.unit@example.edu",
  phone: undefined,
  mission:
    "To develop the personality of students through community service and instil a spirit of social responsibility.",
  vision:
    "A generation of compassionate, responsible citizens shaped by selfless service to society.",
  objectives: [
    "Understand the community in which volunteers work",
    "Identify the needs and problems of the community",
    "Develop a sense of social and civic responsibility",
    "Apply knowledge to find practical solutions to problems",
    "Develop competence required for group living and shared responsibility",
    "Gain skills in mobilising community participation",
    "Practise national integration and social harmony",
  ],
  history:
    "Established to bring students closer to the community, our NSS unit has grown batch after batch into a living movement of service — from small awareness drives to week-long special camps that transform neighbourhoods.",
  achievements: [
    "Best NSS Unit — District Recognition",
    "1000+ trees planted across campaigns",
    "Annual seven-day special camps since inception",
    "Consistent blood donation and health drives",
  ],
};

export const batches: Batch[] = [
  {
    slug: "batch-2025-26",
    title: "Service Through Action",
    yearRange: "2025–26",
    year: 2025,
    description:
      "The current batch carrying the torch forward with focused campaigns on environment, health, and digital literacy.",
    theme: "Service Through Action",
    coverImage: heroNss,
    programmeOfficer: "Mr. A. Kumar",
    volunteerSecretary: "Ms. Anjana R.",
    leaders: ["Anjana R.", "Vishnu P.", "Fathima S."],
    volunteerCount: 100,
    impactMetrics: [
      { label: "Volunteers", value: "100" },
      { label: "Projects", value: "12" },
      { label: "Special Camps", value: "1" },
      { label: "Highlights", value: "5" },
    ],
    featured: true,
  },
  {
    slug: "batch-2024-25",
    title: "Seeds of Change",
    yearRange: "2024–25",
    year: 2024,
    description:
      "A batch remembered for its green campaigns and a memorable special camp that reached three nearby wards.",
    theme: "Seeds of Change",
    coverImage: img("batch2425", 1200, 700),
    programmeOfficer: "Mrs. L. Menon",
    volunteerSecretary: "Mr. Rahul K.",
    leaders: ["Rahul K.", "Sneha T."],
    volunteerCount: 90,
    impactMetrics: [
      { label: "Volunteers", value: "90" },
      { label: "Projects", value: "9" },
      { label: "Special Camps", value: "1" },
      { label: "Highlights", value: "4" },
    ],
    featured: false,
  },
];

export const projects: Project[] = [
  {
    slug: "plastic-free-campus-2025",
    title: "Plastic-Free Campus Campaign",
    date: "2025-08-12",
    year: 2025,
    batchSlug: "batch-2025-26",
    category: "Environment",
    location: "School Campus",
    status: "completed",
    summary:
      "A drive to make the campus single-use-plastic free through audits, awareness, and alternatives.",
    description:
      "Volunteers conducted a plastic audit, ran classroom awareness sessions, set up cloth-bag and steel-bottle stalls, and installed segregated waste bins across the campus.",
    problemAddressed:
      "Single-use plastic was the largest contributor to campus waste and choked nearby drains.",
    whatNssDid:
      "Audited waste streams, educated 1200 students, distributed reusable alternatives, and set up an ongoing monitoring squad.",
    coverImage: img("plastic", 1200, 700),
    images: [
      { id: "p1a", src: img("plastic1"), alt: "Volunteers segregating waste" },
      { id: "p1b", src: img("plastic2"), alt: "Awareness session in classroom" },
      { id: "p1c", src: img("plastic3"), alt: "Cloth bag distribution stall" },
    ],
    impactMetrics: [
      { label: "Students reached", value: "1200" },
      { label: "Bins installed", value: "24" },
      { label: "Bags distributed", value: "300" },
    ],
    reportSlugs: ["plastic-free-campus-report-2025"],
    highlightSlugs: ["best-project-2025"],
    organizers: ["Anjana R.", "Vishnu P."],
    featured: true,
    campRelated: false,
  },
  {
    slug: "anti-drug-awareness-2025",
    title: "Anti-Drug Awareness Programme",
    date: "2025-06-26",
    year: 2025,
    batchSlug: "batch-2025-26",
    category: "Anti-Drug Awareness",
    location: "School Auditorium & Wards",
    status: "completed",
    summary: "Awareness rally and sessions marking the International Day Against Drug Abuse.",
    description:
      "A rally through the local market, expert talks, street plays, and a pledge-signing campaign reaching students and the wider community.",
    problemAddressed: "Rising exposure of adolescents to substance abuse in the locality.",
    whatNssDid:
      "Organised a 2 km awareness rally, conducted three expert sessions, and collected 800 anti-drug pledges.",
    coverImage: img("antidrug", 1200, 700),
    images: [
      { id: "p2a", src: img("antidrug1"), alt: "Awareness rally" },
      { id: "p2b", src: img("antidrug2"), alt: "Street play performance" },
    ],
    impactMetrics: [
      { label: "Pledges collected", value: "800" },
      { label: "Sessions", value: "3" },
      { label: "Rally distance", value: "2 km" },
    ],
    reportSlugs: [],
    highlightSlugs: [],
    organizers: ["Fathima S."],
    featured: true,
    campRelated: false,
  },
  {
    slug: "community-clean-drive-camp-2026",
    title: "Community Cleaning Drive",
    date: "2026-01-05",
    year: 2026,
    batchSlug: "batch-2025-26",
    category: "Community Cleaning",
    location: "Ward 12",
    status: "completed",
    summary:
      "A cleaning drive carried out during the seven-day special camp, restoring a public pond and surrounds.",
    description:
      "As part of the special camp, volunteers cleared a neglected public pond, desilted channels, and planted native species along the banks.",
    problemAddressed: "A choked public pond had become a mosquito-breeding eyesore for the ward.",
    whatNssDid:
      "Cleared 1.2 tonnes of waste, desilted the pond, and planted 120 saplings with community participation.",
    coverImage: img("cleandrive", 1200, 700),
    images: [
      { id: "p3a", src: img("clean1"), alt: "Pond cleaning" },
      { id: "p3b", src: img("clean2"), alt: "Sapling planting" },
    ],
    impactMetrics: [
      { label: "Waste cleared", value: "1.2 t" },
      { label: "Saplings planted", value: "120" },
      { label: "Volunteers", value: "60" },
    ],
    relatedCampSlug: "special-camp-2026",
    reportSlugs: [],
    highlightSlugs: ["best-camp-moment-2026"],
    organizers: ["Vishnu P.", "Anjana R."],
    featured: false,
    campRelated: true,
  },
];

export const camps: Camp[] = [
  {
    slug: "special-camp-2026",
    title: "Seven-Day Special Camp 2026",
    year: 2026,
    batchSlug: "batch-2025-26",
    location: "Ward 12 Community Centre",
    theme: "Service at the Doorstep",
    startDate: "2026-01-02",
    endDate: "2026-01-08",
    summary:
      "A week-long residential camp bringing volunteers into the heart of the community for sustained service.",
    description:
      "Sixty volunteers lived and served in Ward 12 for seven days — combining cleaning drives, surveys, awareness classes, and a cultural evening that strengthened the bond between school and community.",
    programmeOfficer: "Mr. A. Kumar",
    campLeaders: ["Anjana R.", "Vishnu P."],
    volunteerCount: 60,
    coverImage: img("camp2026", 1200, 700),
    dayWiseActivities: [
      {
        dayNumber: 1,
        date: "2026-01-02",
        title: "Inauguration",
        description:
          "Camp inaugurated by the ward councillor with a flag hoisting and orientation.",
        activities: ["Flag hoisting", "Orientation", "Team formation"],
        guests: ["Ward Councillor"],
        images: [{ id: "d1", src: img("campd1"), alt: "Inauguration ceremony" }],
      },
      {
        dayNumber: 2,
        date: "2026-01-03",
        title: "Cleaning Drive",
        description: "Public pond and surrounding lanes cleaned and desilted.",
        activities: ["Pond cleaning", "Waste segregation"],
        images: [{ id: "d2", src: img("campd2"), alt: "Cleaning drive" }],
      },
      {
        dayNumber: 3,
        date: "2026-01-04",
        title: "Awareness Class",
        description: "Health and hygiene awareness sessions for residents.",
        activities: ["Health talk", "Hygiene demo"],
        guests: ["Dr. Reena (PHC)"],
      },
      {
        dayNumber: 4,
        date: "2026-01-05",
        title: "Survey & Community Visit",
        description: "Door-to-door socio-economic survey across the ward.",
        activities: ["Household survey", "Data compilation"],
      },
      {
        dayNumber: 5,
        date: "2026-01-06",
        title: "Cultural Evening",
        description: "An evening of folk arts performed with the community.",
        activities: ["Folk performances", "Community games"],
      },
      {
        dayNumber: 6,
        date: "2026-01-07",
        title: "Public Service Activity",
        description: "Tree planting and a public health stall set up at the centre.",
        activities: ["Tree planting", "Health stall"],
      },
      {
        dayNumber: 7,
        date: "2026-01-08",
        title: "Valedictory Function",
        description: "Camp concluded with reflections, certificates, and a community feast.",
        activities: ["Reflections", "Certificate distribution"],
        guests: ["Headmaster", "Ward Councillor"],
      },
    ],
    projectSlugs: ["community-clean-drive-camp-2026"],
    impactMetrics: [
      { label: "Volunteers", value: "60" },
      { label: "Households surveyed", value: "350" },
      { label: "Saplings planted", value: "120" },
    ],
    reportSlugs: [],
    highlightSlugs: ["best-camp-moment-2026"],
    featured: true,
  },
];

export const galleryAlbums: GalleryAlbum[] = [
  {
    slug: "plastic-free-album-2025",
    title: "Plastic-Free Campus",
    date: "2025-08-12",
    year: 2025,
    batchSlug: "batch-2025-26",
    type: "Project Album",
    description: "Moments from the plastic-free campus campaign.",
    coverImage: albumPlastic,
    images: [
      { id: "a1", src: img("alb1a"), alt: "Waste audit", caption: "Plastic audit" },
      { id: "a2", src: img("alb1b"), alt: "Bag stall", caption: "Cloth bag stall" },
      { id: "a3", src: img("alb1c"), alt: "Bins", caption: "New segregated bins" },
    ],
  },
  {
    slug: "special-camp-album-2026",
    title: "Special Camp 2026",
    date: "2026-01-08",
    year: 2026,
    batchSlug: "batch-2025-26",
    type: "Camp Album",
    description: "Seven days of service captured.",
    coverImage: albumCamp,
    images: [
      { id: "a4", src: img("alb2a"), alt: "Inauguration" },
      { id: "a5", src: img("alb2b"), alt: "Cleaning drive" },
      { id: "a6", src: img("alb2c"), alt: "Cultural evening" },
    ],
  },
  {
    slug: "batch-2024-25-album",
    title: "Batch 2024–25 Memories",
    date: "2025-03-30",
    year: 2024,
    batchSlug: "batch-2024-25",
    type: "Batch Album",
    description: "Highlights from the Seeds of Change batch.",
    coverImage: albumTrees,
    images: [
      { id: "a7", src: img("alb3a"), alt: "Tree planting" },
      { id: "a8", src: img("alb3b"), alt: "Group photo" },
    ],
  },
];

export const videoClips: VideoClip[] = [
  {
    slug: "plastic-free-clip-2025",
    title: "Plastic-Free Campus Highlights",
    type: "Project Clip",
    year: 2025,
    batchSlug: "batch-2025-26",
    relatedProjectSlug: "plastic-free-campus-2025",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: img("vid1", 800, 450),
    duration: "0:45",
    description: "A short recap of the plastic-free campus drive.",
    featured: true,
  },
  {
    slug: "special-camp-clip-2026",
    title: "Special Camp Day 2",
    type: "Camp Clip",
    year: 2026,
    batchSlug: "batch-2025-26",
    relatedCampSlug: "special-camp-2026",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: img("vid2", 800, 450),
    duration: "1:02",
    description: "Cleaning drive moments from the special camp.",
    featured: true,
  },
  {
    slug: "volunteer-memory-clip-2025",
    title: "Why I Joined NSS",
    type: "Volunteer Memory",
    year: 2025,
    batchSlug: "batch-2025-26",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: img("vid3", 800, 450),
    duration: "0:38",
    description: "A volunteer shares what service means to her.",
    featured: false,
  },
];

export const reports: Report[] = [
  {
    slug: "plastic-free-campus-report-2025",
    title: "Plastic-Free Campus — Project Report",
    type: "Project Report",
    date: "2025-09-01",
    year: 2025,
    batchSlug: "batch-2025-26",
    relatedProjectSlug: "plastic-free-campus-2025",
    file: "#",
    description: "Detailed report of the plastic-free campus campaign.",
    isPublic: true,
  },
  {
    slug: "annual-report-2025",
    title: "NSS Annual Report 2024–25",
    type: "Annual Report",
    date: "2025-04-15",
    year: 2025,
    batchSlug: "batch-2024-25",
    file: "#",
    description: "Yearly summary of all NSS activities and impact.",
    isPublic: true,
  },
  {
    slug: "special-camp-report-2026",
    title: "Special Camp 2026 — Camp Report",
    type: "Camp Report",
    date: "2026-01-20",
    year: 2026,
    batchSlug: "batch-2025-26",
    relatedCampSlug: "special-camp-2026",
    file: "#",
    description: "Comprehensive report of the seven-day special camp.",
    isPublic: true,
  },
];

export const highlights: Highlight[] = [
  {
    slug: "best-project-2025",
    title: "Best Project of the Year",
    type: "Best Project",
    date: "2025-09-10",
    year: 2025,
    batchSlug: "batch-2025-26",
    relatedProjectSlug: "plastic-free-campus-2025",
    description: "The plastic-free campus campaign recognised as the standout project of the year.",
    image: img("hl1", 1000, 600),
    featured: true,
    priority: 1,
  },
  {
    slug: "best-camp-moment-2026",
    title: "Most Impactful Camp Moment",
    type: "Best Camp Moment",
    date: "2026-01-08",
    year: 2026,
    batchSlug: "batch-2025-26",
    relatedCampSlug: "special-camp-2026",
    description: "Restoring the public pond during the special camp.",
    image: img("hl2", 1000, 600),
    featured: false,
    priority: 2,
  },
  {
    slug: "community-appreciation-2026",
    title: "Community Appreciation",
    type: "Community Appreciation",
    date: "2026-01-09",
    year: 2026,
    batchSlug: "batch-2025-26",
    description: "Ward residents honoured the unit for its week of service.",
    image: img("hl3", 1000, 600),
    featured: false,
    priority: 3,
  },
  {
    slug: "volunteer-story-highlight-2025",
    title: "Volunteer Story Highlight",
    type: "Volunteer Story",
    date: "2025-12-01",
    year: 2025,
    batchSlug: "batch-2025-26",
    description: "A volunteer's journey from shy newcomer to camp leader.",
    image: img("hl4", 1000, 600),
    featured: false,
    priority: 4,
  },
];

export const timelineItems: TimelineItem[] = [
  {
    slug: "unit-started",
    title: "NSS Unit Established",
    date: "2018-07-01",
    year: 2018,
    type: "Unit Started",
    description: "The NSS unit was founded with its first batch of volunteers.",
    image: img("tl1", 800, 500),
    importance: "high",
  },
  {
    slug: "first-special-camp",
    title: "First Seven-Day Special Camp",
    date: "2019-12-20",
    year: 2019,
    type: "Camp",
    description: "The unit's first residential special camp in a neighbouring ward.",
    importance: "high",
  },
  {
    slug: "district-award",
    title: "District Best Unit Award",
    date: "2023-03-10",
    year: 2023,
    type: "Award",
    description: "Recognised as one of the best NSS units in the district.",
    image: img("tl3", 800, 500),
    importance: "high",
  },
  {
    slug: "seeds-of-change-batch",
    title: "Seeds of Change Batch",
    date: "2024-06-15",
    year: 2024,
    type: "Milestone",
    description: "The 2024–25 batch launched its green campaign series.",
    batchSlug: "batch-2024-25",
    importance: "medium",
  },
  {
    slug: "digital-legacy-launch",
    title: "Digital Legacy Launched",
    date: "2026-02-01",
    year: 2026,
    type: "Website Launch",
    description: "The NSS Digital Legacy archive went live to preserve the journey forever.",
    image: img("tl5", 800, 500),
    importance: "high",
  },
];

export const teamMembers: TeamMember[] = [
  {
    slug: "a-kumar",
    name: "Mr. A. Kumar",
    role: "Programme Officer",
    batchSlug: "batch-2025-26",
    photo: avatar1,
    bio: "Guides the unit's vision and mentors every batch of volunteers.",
    order: 1,
  },
  {
    slug: "anjana-r",
    name: "Anjana R.",
    role: "Volunteer Secretary",
    batchSlug: "batch-2025-26",
    photo: avatar2,
    bio: "Leads coordination across projects and camps for the current batch.",
    order: 2,
  },
  {
    slug: "vishnu-p",
    name: "Vishnu P.",
    role: "Volunteer Leader",
    batchSlug: "batch-2025-26",
    photo: avatar3,
    bio: "Heads the environment campaign team.",
    order: 3,
  },
  {
    slug: "fathima-s",
    name: "Fathima S.",
    role: "Volunteer Leader",
    batchSlug: "batch-2025-26",
    photo: avatar4,
    bio: "Coordinates awareness and outreach programmes.",
    order: 4,
  },
  {
    slug: "rahul-k",
    name: "Rahul K.",
    role: "Volunteer Secretary (2024–25)",
    batchSlug: "batch-2024-25",
    photo: avatar5,
    bio: "Led the Seeds of Change batch's green initiatives.",
    order: 5,
  },
];

export const volunteerStories: VolunteerStory[] = [
  {
    slug: "what-nss-taught-me",
    name: "Anjana R.",
    batchSlug: "batch-2025-26",
    photo: avatar2,
    quote: "NSS taught me that the smallest hand can lift the heaviest hope.",
    title: "What NSS Taught Me",
    story:
      "When I joined I was shy and unsure. Through camps and projects I found my voice, learned to lead, and discovered the quiet joy of service.",
    relatedCampSlug: "special-camp-2026",
    featured: true,
  },
  {
    slug: "my-camp-experience",
    name: "Vishnu P.",
    batchSlug: "batch-2025-26",
    photo: avatar3,
    quote: "Seven days that changed how I see my own neighbourhood.",
    title: "My Camp Experience",
    story:
      "Living in the ward for a week, I understood struggles I'd never noticed before. The pond we restored still reminds me what teamwork can do.",
    relatedCampSlug: "special-camp-2026",
    featured: false,
  },
  {
    slug: "a-project-i-will-never-forget",
    name: "Sneha T.",
    batchSlug: "batch-2024-25",
    photo: avatar4,
    quote: "Every sapling we planted carries a piece of our batch.",
    title: "A Project I Will Never Forget",
    story:
      "Our green campaign felt small at first, but watching those trees grow taller each year is the proof that service outlives us.",
    featured: false,
  },
];

export const notices: Notice[] = [
  {
    slug: "upcoming-blood-donation",
    title: "Upcoming Blood Donation Camp",
    date: "2026-02-20",
    type: "Upcoming Event",
    description:
      "A blood donation camp in association with the district hospital. Volunteers register at the NSS room.",
    important: true,
  },
  {
    slug: "annual-report-published",
    title: "Annual Report 2024–25 Published",
    date: "2025-04-15",
    type: "Report Published",
    description: "The annual report is now available in the Reports section.",
    important: false,
  },
  {
    slug: "monthly-meeting",
    title: "Monthly Volunteers' Meeting",
    date: "2026-02-10",
    type: "Meeting Notice",
    description: "All volunteers to attend the monthly review meeting after assembly.",
    important: false,
  },
];

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
