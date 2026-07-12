import type {
  Batch,
  SiteSettings,
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
  HomePage,
  AboutPage,
} from "@/types";

export function mapBatch(b: any): Batch {
  return {
    slug: b.slug,
    title: b.title || "",
    academicYear: b.academicYear || "",
    status: b.status || "archive",
    description: b.description,
    leader1Name: b.leader1Name,
    leader1Role: b.leader1Role,
    leader1Photo: b.leader1Photo,
    leader2Name: b.leader2Name,
    leader2Role: b.leader2Role,
    leader2Photo: b.leader2Photo,
  };
}


export const mapSiteSettings = (doc: any): SiteSettings => ({
  schoolName: "KHMHSS Valakkulam",
  unitName: "National Service Scheme (NSS) Unit 466",
  motto: "Not Me, But You",
  location: "Thennala, Malappuram, Kerala – 676508",
  academicYear: doc.academicYear || "2025–26",
  schoolLogo: "/khm-logo.webp",
  nssLogo: "/nss-logo.svg",
  principal: doc.principal,
  programmeOfficer: doc.programmeOfficer || "",
  volunteerSecretary: doc.volunteerSecretary || "",
  volunteerStrength: doc.volunteerStrength,
  email: doc.email || "",
  phone: doc.phone,
  footerDescription: doc.footerDescription,
});

export const mapHomePage = (doc: any): HomePage => ({
  heroTitle: doc?.heroTitle || "",
  heroSubtitle: doc?.heroSubtitle || "",
  heroImage: doc?.heroImage || "",
  homeFeatures: doc?.servicePillars || [],
  reachOutCtaTitle: doc?.reachOutCtaTitle || "",
  reachOutCtaSubtitle: doc?.reachOutCtaSubtitle || "",
  reachOutCtaDescription: doc?.reachOutCtaDescription || "",
});

export const mapAboutPage = (doc: any): AboutPage => ({
  mission: doc.mission || "",
  vision: doc.vision || "",
  objectives: doc.objectives || [],
  history: doc.history || "",
  achievements: doc.achievements || [],
});

export function mapProject(p: any): Project {
  return {
    slug: p.slug,
    title: p.title || "",
    date: p.date || "",
    year: Number(p.year || 0),
    batchSlug: p.batchSlug || "",
    category: p.category || "General",
    location: p.location || "",
    status: p.status || "completed",
    summary: p.summary || "",
    description: p.description || "",
    problemAddressed: p.problemAddressed || "",
    whatNssDid: p.whatNssDid || "",
    coverImage: p.coverImage || "",
    images: (p.images || []).map((img: any) => ({
      id: img.id || img._key || Math.random().toString(),
      src: img.src || "",
      alt: img.alt || "",
      caption: img.caption,
      credit: img.credit,
    })),
    videos: p.videos || [],
    impactMetrics: p.impactMetrics || [],
    relatedCampSlug: p.relatedCampSlug,
    reportSlugs: p.reportSlugs || [],
    highlightSlugs: p.highlightSlugs || [],
    organizers: p.organizers || [],
    featured: Boolean(p.featured),
    showOnHome: p.showOnHome !== false,
    campRelated: Boolean(p.campRelated),
  };
}

export function mapCamp(c: any): Camp {
  return {
    slug: c.slug,
    title: c.title || "",
    year: Number(c.year || 0),
    batchSlug: c.batchSlug || "",
    location: c.location || "",
    theme: c.theme || "",
    startDate: c.startDate || "",
    endDate: c.endDate || "",
    summary: c.summary || c.description?.substring(0, 100) || "",
    description: c.description || "",
    programmeOfficer: c.programmeOfficer || "",
    campLeaders: c.campLeaders || [],
    volunteerCount: Number(c.volunteerCount || 0),
    coverImage: c.coverImage || "",
    dayWiseActivities: (c.dayWiseActivities || c.campDiary || []).map((day: any) => ({
      dayNumber: Number(day.dayNumber || 0),
      date: day.date || "",
      title: day.title || "",
      description: day.description || "",
      activities: day.activities || [],
      guests: (day.guests || []).map((g: any) => {
        if (typeof g === "string") return g;
        return {
          name: g.name || "",
          designation: g.designation,
          photo: g.photo,
          organisation: g.organisation,
        };
      }),
      images: (day.images || []).map((img: any) => ({
        id: img.id || img._key || Math.random().toString(),
        src: img.src || "",
        alt: img.alt || "",
        caption: img.caption,
        credit: img.credit,
      })),
      videos: day.videos || [],
    })),
    projectSlugs: c.projectSlugs || [],
    impactMetrics: c.impactMetrics || [],
    reportSlugs: c.reportSlugs || [],
    highlightSlugs: c.highlightSlugs || [],
    featured: Boolean(c.featured),
  };
}

export function mapGalleryAlbum(a: any): GalleryAlbum {
  const category = a.category || a.type || "Other";
  return {
    slug: a.slug,
    title: a.title || "",
    date: a.date || "",
    year: Number(a.year || 0),
    batchSlug: a.batchSlug,
    category,
    type: category, // keep type === category for backward compat
    description: a.description || "",
    coverImage: a.coverImage || "",
    images: (a.images || []).map((img: any) => ({
      id: img.id || img._key || Math.random().toString(),
      src: img.src || "",
      alt: img.alt || "",
      caption: img.caption,
      credit: img.credit,
    })),
    videos: a.videos || [],
    showOnHome: Boolean(a.showOnHome),
    imageCount: a.imageCount != null ? Number(a.imageCount) : undefined,
  };
}

export function mapReport(r: any): Report {
  return {
    slug: r.slug,
    title: r.title || "",
    type: r.type || "",
    date: r.date || "",
    year: Number(r.year || 0),
    batchSlug: r.batchSlug,
    relatedProjectSlug: r.relatedProjectSlug,
    relatedCampSlug: r.relatedCampSlug,
    file: r.pdfFileUrl || r.externalUrl || "",
    description: r.description || "",
    isPublic: r.isPublic !== false,
  };
}

export function mapHighlight(h: any): Highlight {
  return {
    slug: h.slug,
    title: h.title || "",
    type: h.type || "",
    date: h.date || "",
    year: Number(h.year || 0),
    batchSlug: h.batchSlug,
    relatedProjectSlug: h.relatedProjectSlug,
    relatedCampSlug: h.relatedCampSlug,
    description: h.description || "",
    image: h.image || "",
    featured: Boolean(h.featured),
    priority: Number(h.priority || 10),
  };
}

export function mapTimelineItem(t: any): TimelineItem {
  return {
    slug: t.slug,
    title: t.title || "",
    date: t.date || "",
    year: Number(t.year || 0),
    type: t.type || "",
    description: t.description || "",
    image: t.image,
    batchSlug: t.batchSlug,
    importance: t.importance || "medium",
  };
}

export function mapTeamMember(m: any): TeamMember {
  return {
    slug: m.slug,
    name: m.name || "",
    role: m.role || "",
    batchSlug: m.batchSlug,
    photo: m.photo || "",
    bio: m.bio || "",
    order: Number(m.order || 10),
  };
}

export function mapVolunteerStory(s: any): VolunteerStory {
  return {
    slug: s.slug,
    name: s.name || s.author || "",
    batchSlug: s.batchSlug || "",
    photo: s.photo || "",
    quote: s.quote || "",
    title: s.title || "",
    story: s.story || s.content || "",
    relatedProjectSlug: s.relatedProjectSlug,
    relatedCampSlug: s.relatedCampSlug,
    featured: Boolean(s.featured),
  };
}

export function mapNotice(n: any): Notice {
  return {
    slug: n.slug,
    title: n.title || "",
    date: n.date || "",
    type: n.type || "General",
    description: n.description || "",
    attachment: n.attachment,
    important: Boolean(n.important),
  };
}

export function mapSocialLinks(s: any): SocialLinks {
  if (!s) return {};
  return {
    facebook: s.facebook || undefined,
    instagram: s.instagram || undefined,
    youtube: s.youtube || undefined,
    twitter: s.twitter || undefined,
  };
}
