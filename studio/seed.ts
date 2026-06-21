import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "2atqkk07",
  dataset: "production",
  useCdn: false,
  apiVersion: "2026-01-01",
  token: process.env.SANITY_API_TOKEN,
});

async function seed() {
  console.log("Seeding minimal test content...");

  if (!process.env.SANITY_API_TOKEN) {
    console.error("Missing SANITY_API_TOKEN environment variable.");
    process.exit(1);
  }

  // 1. Site Settings
  const siteSettings = await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    title: "NSS Digital Legacy",
    description: "A living archive of service, leadership, camps, projects, and memories.",
    motto: "Not Me, But You",
    schoolName: "Test School",
    unitName: "NSS Unit 123",
    academicYear: "2025-26",
  });

  // 2. Batch
  const batch = await client.createOrReplace({
    _id: "batch-2025-26",
    _type: "batch",
    title: "Batch 2025-26",
    slug: { current: "batch-2025-26" },
    startYear: 2025,
    endYear: 2026,
    motto: "Service Through Action",
    volunteerCount: 100,
  });

  // 3. Category
  const category = await client.createOrReplace({
    _id: "category-environment",
    _type: "category",
    title: "Environment",
    slug: { current: "environment" },
  });

  // 4. Project
  const project = await client.createOrReplace({
    _id: "project-tree-plantation-drive",
    _type: "project",
    title: "Tree Plantation Drive",
    slug: { current: "tree-plantation-drive" },
    date: "2025-08-15",
    batch: { _type: "reference", _ref: batch._id },
    category: { _type: "reference", _ref: category._id },
    shortDescription: "Planted 100 trees in the local community.",
    isFeatured: true,
  });

  // 5. Camp
  const camp = await client.createOrReplace({
    _id: "camp-annual-special-camp-2025",
    _type: "camp",
    title: "Annual Special Camp 2025",
    slug: { current: "annual-special-camp-2025" },
    batch: { _type: "reference", _ref: batch._id },
    startDate: "2025-12-24",
    endDate: "2025-12-30",
    location: "Village XYZ",
    shortDescription: "7-day special camp focused on community development.",
    isFeatured: true,
    dayWiseActivities: [
      {
        _key: "day1",
        dayNumber: 1,
        date: "2025-12-24",
        title: "Inauguration and Survey",
        description: "Camp inaugurated by the local Panchayat President.",
      },
      {
        _key: "day2",
        dayNumber: 2,
        date: "2025-12-25",
        title: "Cleaning Drive",
        description: "Cleaned the local hospital premises.",
      },
    ],
  });

  // 6. Album
  const album = await client.createOrReplace({
    _id: "album-camp-memories",
    _type: "album",
    title: "Camp Memories",
    slug: { current: "camp-memories" },
    date: "2025-12-30",
    batch: { _type: "reference", _ref: batch._id },
    camp: { _type: "reference", _ref: camp._id },
    albumType: "camp",
  });

  // 7. Video Clip
  const video = await client.createOrReplace({
    _id: "video-camp-inauguration-video",
    _type: "videoClip",
    title: "Camp Inauguration Video",
    slug: { current: "camp-inauguration-video" },
    videoType: "camp",
    batch: { _type: "reference", _ref: batch._id },
    camp: { _type: "reference", _ref: camp._id },
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  });

  // 8. Report
  const report = await client.createOrReplace({
    _id: "report-annual-report-2025",
    _type: "report",
    title: "Annual Report 2025",
    reportType: "annual",
    date: "2026-03-31",
    batch: { _type: "reference", _ref: batch._id },
    isPublished: true,
  });

  // 9. Highlight
  const highlight = await client.createOrReplace({
    _id: "highlight-best-nss-unit-award",
    _type: "highlight",
    title: "Best NSS Unit Award",
    highlightType: "award",
    date: "2026-02-15",
    batch: { _type: "reference", _ref: batch._id },
    description: "Received the Best NSS Unit award from the University.",
    isFeaturedOnHome: true,
  });

  // 10. Timeline Item
  const timeline = await client.createOrReplace({
    _id: "timeline-nss-unit-started",
    _type: "timelineItem",
    title: "NSS Unit Started",
    date: "2010-06-01",
    itemType: "milestone",
    description: "The NSS unit was officially inaugurated.",
    importanceLevel: "high",
  });

  // 11. Team Member
  const teamMember = await client.createOrReplace({
    _id: "team-john-doe",
    _type: "teamMember",
    name: "John Doe",
    role: "volunteerSecretary",
    batch: { _type: "reference", _ref: batch._id },
    displayOrder: 1,
  });

  // 12. Volunteer Story
  const story = await client.createOrReplace({
    _id: "story-my-journey-in-nss",
    _type: "volunteerStory",
    title: "My Journey in NSS",
    slug: { current: "my-journey-in-nss" },
    author: "Jane Smith",
    batch: { _type: "reference", _ref: batch._id },
    content: "NSS completely changed my perspective on life...",
  });

  // 13. Notice
  const notice = await client.createOrReplace({
    _id: "notice-upcoming-blood-donation-camp",
    _type: "notice",
    title: "Upcoming Blood Donation Camp",
    date: "2026-01-10",
    content: "All volunteers are requested to participate in the blood donation drive.",
    isActive: true,
  });

  console.log("Seed completed successfully!");
}

seed().catch(console.error);
