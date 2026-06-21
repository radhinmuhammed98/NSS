import type {
  SiteSettings,
  Batch,
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

export function mapSettings(s: any): SiteSettings {
  return {
    schoolName: s.schoolName || "",
    unitName: s.unitName || "",
    motto: s.motto || "Not Me, But You",
    location: s.location || "",
    academicYear: s.academicYear || "",
    programmeOfficer: s.programmeOfficer || "",
    volunteerSecretary: s.volunteerSecretary || "",
    email: s.email || "",
    phone: s.phone || "",
    mission: s.mission || "",
    vision: s.vision || "",
    objectives: s.objectives || [],
    history: s.history || "",
    achievements: s.achievements || [],
  };
}

export function mapBatch(b: any): Batch {
  return {
    slug: b.slug,
    title: b.title || "",
    yearRange: b.yearRange || "",
    year: Number(b.year || 0),
    description: b.description || "",
    theme: b.theme || "",
    coverImage: b.coverImage || "",
    programmeOfficer: b.programmeOfficer || "",
    volunteerSecretary: b.volunteerSecretary || "",
    leaders: b.leaders || [],
    volunteerCount: Number(b.volunteerCount || 0),
    impactMetrics: b.impactMetrics || [],
    featured: Boolean(b.featured),
  };
}

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
    impactMetrics: p.impactMetrics || [],
    relatedCampSlug: p.relatedCampSlug,
    reportSlugs: p.reportSlugs || [],
    highlightSlugs: p.highlightSlugs || [],
    organizers: p.organizers || [],
    featured: Boolean(p.featured),
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
    summary: c.summary || "",
    description: c.description || "",
    programmeOfficer: c.programmeOfficer || "",
    campLeaders: c.campLeaders || [],
    volunteerCount: Number(c.volunteerCount || 0),
    coverImage: c.coverImage || "",
    dayWiseActivities: (c.dayWiseActivities || []).map((day: any) => ({
      dayNumber: Number(day.dayNumber || 0),
      date: day.date || "",
      title: day.title || "",
      description: day.description || "",
      activities: day.activities || [],
      guests: day.guests || [],
      images: (day.images || []).map((img: any) => ({
        id: img.id || img._key || Math.random().toString(),
        src: img.src || "",
        alt: img.alt || "",
        caption: img.caption,
        credit: img.credit,
      })),
    })),
    projectSlugs: c.projectSlugs || [],
    impactMetrics: c.impactMetrics || [],
    reportSlugs: c.reportSlugs || [],
    highlightSlugs: c.highlightSlugs || [],
    featured: Boolean(c.featured),
  };
}

export function mapGalleryAlbum(a: any): GalleryAlbum {
  return {
    slug: a.slug,
    title: a.title || "",
    date: a.date || "",
    year: Number(a.year || 0),
    batchSlug: a.batchSlug,
    type: a.type || "General",
    description: a.description || "",
    coverImage: a.coverImage || "",
    images: (a.images || []).map((img: any) => ({
      id: img.id || img._key || Math.random().toString(),
      src: img.src || "",
      alt: img.alt || "",
      caption: img.caption,
      credit: img.credit,
    })),
  };
}

export function mapVideoClip(v: any): VideoClip {
  return {
    slug: v.slug,
    title: v.title || "",
    type: v.type || "",
    year: Number(v.year || 0),
    batchSlug: v.batchSlug,
    relatedProjectSlug: v.relatedProjectSlug,
    relatedCampSlug: v.relatedCampSlug,
    url: v.url || "",
    thumbnail: v.thumbnail || "",
    duration: v.duration || "",
    description: v.description || "",
    featured: Boolean(v.featured),
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
    name: s.name || "",
    batchSlug: s.batchSlug || "",
    photo: s.photo || "",
    quote: s.quote || "",
    title: s.title || "",
    story: s.story || "",
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
