# NSS Digital Legacy — Build Plan

A living, batch-wise archive for the NSS unit. This first pass delivers the **complete core archive** fully built, plus **route shells** (working pages with empty/coming-soon states) for every remaining section, all driven by typed mock data so future content slots in without code changes.

## Stack reality check

This project runs on **TanStack Start** (file-based routing in `src/routes/`, SSR, Tailwind v4) — not Vite + React Router + Sanity as the source doc assumed. The content model, relationships, and page plans carry over unchanged. Data lives in typed mock files now; a CMS (Sanity or Lovable Cloud) can replace the data layer later because all pages read through a single data-access module.

## Design direction

- **Style:** Claymorphism — soft puffy surfaces, layered inset/outset shadows, rounded-2xl/3xl corners, pastel depth. Mobile-first.
- **Palette (NSS Blue & Coral):** clay bg `#e8eef7`, mid blue `#7aa5d8`, deep blue `#3b6fa0`, coral accent `#f08a6a`. Defined as `oklch` tokens in `src/styles.css`.
- **Motion (intensity 3/5):** tasteful 3D — Framer Motion entrance fades/lifts, hover tilt on clay cards, gentle floating hero element, scroll reveals. No heavy WebGL, no autoplay sound.
- **Typography:** rounded, friendly display + clean body pairing (e.g. Sora / Manrope).

## Data layer (mock JSON, typed)

`src/data/` holds typed arrays; `src/types/` holds interfaces; `src/lib/data/` exposes accessor functions (getBatches, getProjectBySlug, getCampsByBatch, getFeatured, etc.) so pages never import raw arrays directly.

Content types: SiteSettings, Batch, Project, Camp, CampDay, GalleryAlbum, ImageAsset, VideoClip, Report, Highlight, TimelineItem, TeamMember, VolunteerStory, Notice, Category, ImpactMetric — with the relationships from the source doc (Batch ↔ Projects/Camps/Albums/Videos/Reports/Highlights/Stories/Team; Project ↔ Batch/Category/Camp/media; Camp ↔ Batch/CampDays/Projects/media).

Demo content seeded: 2 batches (2024–25, 2025–26), 3 projects, 1 seven-day camp with 7 day entries, 4 highlights, 3 gallery albums, 3 video clips, 3 reports, 5 team members, 3 volunteer stories, 5 timeline items, 3 notices.

## Routes

```text
/                       Home — fully built
/about                  About — fully built
/batches                Batches list — fully built
/batches/$batchSlug     Single batch (tabbed sections) — fully built
/projects               Projects list + filters — fully built
/projects/$projectSlug  Single project — fully built
/camps                  Camps list + filters — fully built
/camps/$campSlug        Single camp + day-wise timeline — fully built
/highlights             Shell + grid from mock highlights
/gallery                Shell + album grid
/gallery/$albumSlug     Shell single album
/videos                 Shell + clip grid (click-to-load thumbnails)
/reports                Shell + report list
/journey                Shell + timeline
/team                   Shell + team grid
/stories                Shell + story cards
/notices                Shell + notice list
/contact                Shell + contact info (no form v1)
```

Shells are real pages with header, layout, and either mock content or clean empty states ("No videos added yet.") — never broken sections.

## Core pages (fully built)

- **Home:** NSS identity hero (floating clay 3D element), motto, active-batch + impact summary, featured highlight, latest projects, camp spotlight, batch legacy preview, gallery/video/report previews, story preview, reach-out section. Previews only (performance rule).
- **About:** unit identity, motto "Not Me, But You", officers, mission/vision/objectives, short history, achievements.
- **Batches / Single Batch:** sortable list (newest first); detail page with tabbed sections (Overview, Impact, Projects, Camps, Highlights, Gallery, Videos, Reports, Stories, Team).
- **Projects / Single Project:** client-side filters (batch, year, category, location, featured, camp-related); detail with summary, full description, problem/what-NSS-did, flexible impact metrics, media, related camp/reports/highlights.
- **Camps / Single Camp:** filters; documentary-style detail with day-wise timeline (day number, date, title, activities, media, guests, highlights).

## Cross-cutting

- **Shared layout:** sticky clay navbar with section links + mobile drawer; footer.
- **Reusable components:** ClayCard, ClayButton, SectionHeading, FilterBar, EmptyState, MediaThumb (click-to-load video), ImpactStat, Badge.
- **SEO:** per-route `head()` with title, description, og:title/description, og:image at leaf routes, JSON-LD where relevant; relative canonical paths.
- **Accessibility:** alt text, keyboard nav, semantic headings, good contrast, no autoplay sound.
- **Performance:** lazy-loaded gallery images, click-to-load videos, route splitting, light homepage media.
- **States:** friendly empty states everywhere; clean 404 (already present) and data-fallback handling.

## Build order

1. Tokens + claymorphism utilities in `src/styles.css`; install framer-motion; fonts.
2. Types + mock data + data accessors.
3. Shared layout, navbar/footer, core clay components.
4. Home + About.
5. Batches + Single Batch.
6. Projects + Single Project.
7. Camps + Single Camp (day-wise timeline).
8. Route shells for the 10 remaining sections with mock content/empty states.
9. SEO/meta, accessibility, animation polish, QA pass across routes + mobile.

## Future-proofing

No hardcoded year/batch in components — everything flows from data. Swapping mock data for a real CMS later means re-implementing only `src/lib/data/`. CMS integration, search, alumni, achievements, and admin workflow are explicitly deferred (your non-goals / future phases).

## Out of scope (v1)

Login, registration, payments, custom backend, live chat, uploads, attendance, certificates, hosting/domain — per your non-goals.
