export const SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  schoolName,
  unitName,
  motto,
  location,
  academicYear,
  "schoolLogo": schoolLogo.asset->url,
  "nssLogo": nssLogo.asset->url,
  principal,
  programmeOfficer,
  volunteerSecretary,
  volunteerStrength,
  email,
  phone,
  footerDescription
}`;

export const HOME_QUERY = `*[_type == "homePage"][0] {
  heroTitle,
  heroSubtitle,
  "heroImage": heroImage.asset->url,
  homeFeatures,
  reachOutCtaTitle,
  reachOutCtaSubtitle,
  reachOutCtaDescription
}`;

export const ABOUT_QUERY = `*[_type == "about"][0] {
  mission,
  vision,
  objectives,
  history,
  achievements
}`;


export const PROJECTS_QUERY = `*[_type == "project"] | order(date desc) {
  "slug": slug.current,
  title,
  date,
  year,
  "batchSlug": batch->slug.current,
  category,
  location,
  status,
  summary,
  description,
  problemAddressed,
  whatNssDid,
  "coverImage": coverImage.asset->url,
  images[] {
    "id": _key,
    "src": image.asset->url,
    alt,
    caption,
    credit
  },
  impactMetrics,
  "relatedCampSlug": relatedCamp->slug.current,
  "reportSlugs": reports[]->slug.current,
  "highlightSlugs": highlights[]->slug.current,
  organizers,
  featured,
  campRelated
}`;

export const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && slug.current == $slug][0] {
  "slug": slug.current,
  title,
  date,
  year,
  "batchSlug": batch->slug.current,
  category,
  location,
  status,
  summary,
  description,
  problemAddressed,
  whatNssDid,
  "coverImage": coverImage.asset->url,
  images[] {
    "id": _key,
    "src": image.asset->url,
    alt,
    caption,
    credit
  },
  impactMetrics,
  "relatedCampSlug": relatedCamp->slug.current,
  "reportSlugs": reports[]->slug.current,
  "highlightSlugs": highlights[]->slug.current,
  organizers,
  featured,
  campRelated
}`;

export const CAMPS_QUERY = `*[_type == "camp"] | order(year desc) {
  "slug": slug.current,
  title,
  year,
  "batchSlug": batch->slug.current,
  location,
  theme,
  startDate,
  endDate,
  summary,
  description,
  programmeOfficer,
  campLeaders,
  volunteerCount,
  "coverImage": coverImage.asset->url,
  dayWiseActivities[] {
    dayNumber,
    date,
    title,
    description,
    activities,
    guests,
    images[] {
      "id": _key,
      "src": image.asset->url,
      alt,
      caption,
      credit
    }
  },
  "projectSlugs": projects[]->slug.current,
  impactMetrics,
  "reportSlugs": reports[]->slug.current,
  "highlightSlugs": highlights[]->slug.current,
  featured
}`;

export const CAMP_BY_SLUG_QUERY = `*[_type == "camp" && slug.current == $slug][0] {
  "slug": slug.current,
  title,
  year,
  "batchSlug": batch->slug.current,
  location,
  theme,
  startDate,
  endDate,
  summary,
  description,
  programmeOfficer,
  campLeaders,
  volunteerCount,
  "coverImage": coverImage.asset->url,
  dayWiseActivities[] {
    dayNumber,
    date,
    title,
    description,
    activities,
    guests,
    images[] {
      "id": _key,
      "src": image.asset->url,
      alt,
      caption,
      credit
    }
  },
  "projectSlugs": projects[]->slug.current,
  impactMetrics,
  "reportSlugs": reports[]->slug.current,
  "highlightSlugs": highlights[]->slug.current,
  featured
}`;

export const ALBUMS_QUERY = `*[_type == "galleryAlbum"] | order(date desc) {
  "slug": slug.current,
  title,
  date,
  year,
  "batchSlug": batch->slug.current,
  type,
  description,
  "coverImage": coverImage.asset->url,
  images[] {
    "id": _key,
    "src": image.asset->url,
    alt,
    caption,
    credit
  }
}`;

export const ALBUM_BY_SLUG_QUERY = `*[_type == "galleryAlbum" && slug.current == $slug][0] {
  "slug": slug.current,
  title,
  date,
  year,
  "batchSlug": batch->slug.current,
  type,
  description,
  "coverImage": coverImage.asset->url,
  images[] {
    "id": _key,
    "src": image.asset->url,
    alt,
    caption,
    credit
  }
}`;

export const VIDEOS_QUERY = `*[_type == "videoClip"] | order(year desc) {
  "slug": slug.current,
  title,
  type,
  year,
  "batchSlug": batch->slug.current,
  "relatedProjectSlug": relatedProject->slug.current,
  "relatedCampSlug": relatedCamp->slug.current,
  "url": videoUrl,
  "thumbnail": thumbnail.asset->url,
  duration,
  description,
  featured
}`;

export const REPORTS_QUERY = `*[_type == "report"] | order(date desc) {
  "slug": slug.current,
  title,
  type,
  date,
  year,
  "batchSlug": batch->slug.current,
  "relatedProjectSlug": relatedProject->slug.current,
  "relatedCampSlug": relatedCamp->slug.current,
  "pdfFileUrl": pdfFile.asset->url,
  externalUrl,
  description,
  isPublic
}`;

export const HIGHLIGHTS_QUERY = `*[_type == "highlight"] | order(priority asc) {
  "slug": slug.current,
  title,
  type,
  date,
  year,
  "batchSlug": batch->slug.current,
  "relatedProjectSlug": relatedProject->slug.current,
  "relatedCampSlug": relatedCamp->slug.current,
  description,
  "image": image.asset->url,
  featured,
  priority
}`;

export const HIGHLIGHT_BY_SLUG_QUERY = `*[_type == "highlight" && slug.current == $slug][0] {
  "slug": slug.current,
  title,
  type,
  date,
  year,
  "batchSlug": batch->slug.current,
  "relatedProjectSlug": relatedProject->slug.current,
  "relatedCampSlug": relatedCamp->slug.current,
  description,
  "image": image.asset->url,
  featured,
  priority
}`;

export const TIMELINE_QUERY = `*[_type == "timelineItem"] {
  "slug": slug.current,
  title,
  date,
  year,
  type,
  description,
  "image": image.asset->url,
  "batchSlug": batch->slug.current,
  importance
}`;

export const TEAM_QUERY = `*[_type == "teamMember"] | order(order asc) {
  "slug": slug.current,
  name,
  role,
  "batchSlug": batch->slug.current,
  "photo": photo.asset->url,
  bio,
  order
}`;

export const STORIES_QUERY = `*[_type == "volunteerStory"] {
  "slug": slug.current,
  name,
  "batchSlug": batch->slug.current,
  "photo": photo.asset->url,
  quote,
  title,
  story,
  "relatedProjectSlug": relatedProject->slug.current,
  "relatedCampSlug": relatedCamp->slug.current,
  featured
}`;

export const NOTICES_QUERY = `*[_type == "notice"] | order(date desc) {
  "slug": slug.current,
  title,
  date,
  type,
  description,
  "attachment": attachment.asset->url,
  important
}`;

export const DONATION_QUERY = `*[_type == "donation"][0] {
  enabled,
  upiId,
  "qrImageUrl": qrImage.asset->url,
  bankAccount {
    name,
    account,
    ifsc,
    bank,
    branch
  }
}`;

export const SOCIAL_LINKS_QUERY = `*[_type == "socialLinks"][0] {
  facebook,
  instagram,
  youtube,
  twitter
}`;

// ─── Batch Queries ────────────────────────────────────────────────────────────

export const BATCHES_QUERY = `*[_type == "batch"] | order(academicYear desc) {
  "slug": slug.current,
  title,
  academicYear,
  status,
  description,
  leader1Name,
  leader1Role,
  "leader1Photo": leader1Photo.asset->url,
  leader2Name,
  leader2Role,
  "leader2Photo": leader2Photo.asset->url
}`;

export const CURRENT_BATCH_QUERY = `*[_type == "batch" && status == "current"] | order(academicYear desc)[0] {
  "slug": slug.current,
  title,
  academicYear,
  status,
  description,
  leader1Name,
  leader1Role,
  "leader1Photo": leader1Photo.asset->url,
  leader2Name,
  leader2Role,
  "leader2Photo": leader2Photo.asset->url
}`;

// Team members belonging to the current batch
export const CURRENT_BATCH_TEAM_QUERY = `*[_type == "teamMember" && batch->status == "current"] | order(order asc) {
  "slug": slug.current,
  name,
  role,
  "batchSlug": batch->slug.current,
  "batchTitle": batch->title,
  "photo": photo.asset->url,
  bio,
  order
}`;

