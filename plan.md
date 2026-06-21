# NSS Digital Legacy — Complete Website Plan

> **Document purpose:** This is the development and content-architecture plan for building the full NSS website first.  
> **Important:** This is **not a UI/design document**. Hosting, domain, and final deployment decisions are intentionally kept for later.

---

## 1. Project Vision

The website will be a long-term digital archive for the NSS unit.

It should preserve:

- Every NSS batch
- Every camp
- Every project
- Every highlight
- Every report
- Every important photo and video clip
- The journey of the NSS unit from its beginning to future years

The main idea:

> **Every batch serves and leaves, but their service journey stays forever.**

The website should not become outdated after one year. It should be structured so future NSS batches can keep adding content without rebuilding the whole site.

---

## 2. Working Project Name

**NSS Digital Legacy**

Possible subtitle:

> A living archive of service, leadership, camps, projects, and memories.

---

## 3. Core Goals

### 3.1 Public Goals

The public website should help visitors:

- Understand the NSS unit and its mission
- Explore batch-wise NSS history
- See projects completed by each batch
- View camp details and day-wise camp activities
- Watch short project and camp video clips
- Browse photos by batch, camp, project, category, or year
- Read reports and official documents
- View highlights, achievements, and special moments
- Contact the NSS unit

### 3.2 Internal Goals

The website should help NSS members and future editors:

- Add new projects without changing code
- Add future batches every year
- Add camp information in an organized way
- Add photos, video links, reports, and highlights
- Mark important items as featured/highlighted
- Keep the same website structure for many years

### 3.3 Long-Term Goal

The site should become the permanent digital memory of the NSS unit.

---

## 4. Non-Goals for First Version

These features should **not** be built in the first version:

- Student login system
- Public user registration
- Payment system
- Complex backend server
- Live chat
- Custom video streaming platform
- Huge file upload system for the public
- Attendance management
- Volunteer private dashboard
- Mobile app
- Online certificate generation
- Domain and hosting decision

These can be considered later only if the NSS unit really needs them.

---

## 5. Target Users

### 5.1 Visitors

- Students
- NSS volunteers
- Teachers
- Parents
- School management
- Alumni
- Local community members
- Officials or guests who want to see NSS activities

### 5.2 Content Editors

- Website maintainer
- NSS Programme Officer
- Volunteer Secretary
- Selected NSS volunteers
- Future batch editors

### 5.3 Admins

- Main developer/maintainer
- One trusted NSS teacher or coordinator

---

## 6. Main Website Modules

The complete website will be divided into these major modules:

1. Home
2. About NSS Unit
3. Batches
4. Projects
5. Camps
6. Highlights
7. Gallery
8. Videos
9. Reports
10. Journey Timeline
11. Team / Volunteers
12. Volunteer Stories
13. Notices / Updates
14. Contact

---

## 7. Site Map and Routes

### 7.1 Main Routes

```txt
/
Home

/about
About NSS Unit

/batches
All Batches

/batches/[batchSlug]
Single Batch Page

/projects
All Projects

/projects/[projectSlug]
Single Project Page

/camps
All Camps

/camps/[campSlug]
Single Camp Page

/highlights
All Highlights

/gallery
Gallery Albums

/gallery/[albumSlug]
Single Gallery Album

/videos
Video Clips Archive

/reports
Reports and Documents

/journey
NSS Journey Timeline

/team
Team and Volunteers

/stories
Volunteer Stories

/notices
Notices and Updates

/contact
Contact Page
```

### 7.2 Optional Future Routes

```txt
/search
Global Search Page

/media
Combined Photo + Video Media Archive

/achievements
Awards and Recognitions

/alumni
NSS Alumni Memories

/admin-guide
Private guide for future editors
```

---

## 8. Page-Level Content Plan

## 8.1 Home Page

The home page should introduce the entire archive and guide visitors into the main sections.

### Home Page Content Sections

1. NSS identity introduction
2. Motto and mission
3. Current academic year / active batch
4. Impact summary
5. Featured highlight
6. Latest projects
7. Latest camp spotlight
8. Batch-wise legacy preview
9. Gallery preview
10. Video clips preview
11. Reports preview
12. Volunteer story preview
13. Contact / join / reach-out section

### Home Page Content Sources

- Site Settings
- Current Batch
- Featured Projects
- Featured Camp
- Featured Highlights
- Latest Gallery Albums
- Latest Video Clips
- Latest Reports
- Featured Volunteer Stories

---

## 8.2 About NSS Unit Page

This page explains the official identity and purpose of the NSS unit.

### Required Content

- School name
- NSS unit name
- Location
- Motto: “Not Me, But You”
- Programme Officer
- Volunteer Secretary
- Academic year
- Contact information
- NSS unit overview
- Mission
- Vision
- Objectives
- Short history of the unit
- NSS symbol/motto explanation if needed
- Unit-level achievements

### Content Source

- Site Settings
- About Page Content
- Team Members
- Timeline Items

---

## 8.3 Batches Page

This page lists all NSS batches.

### Batch Listing Should Support

- Year range
- Batch title/name
- Batch cover image
- Programme Officer
- Volunteer Secretary
- Number of volunteers
- Major project count
- Camp count
- Highlight count
- Short batch description

### Sorting

Default sorting:

```txt
Newest batch first
```

Optional filters:

```txt
Academic year
Programme Officer
Featured batch
```

---

## 8.4 Single Batch Page

Each NSS batch gets its own legacy page.

### Required Content

- Batch year range
- Batch name/title
- Batch cover image
- Programme Officer
- Volunteer Secretary
- Volunteer leaders
- Total volunteers
- Batch theme or motto
- Batch overview
- Impact numbers
- Major projects
- Special camp
- Highlights
- Gallery albums
- Videos
- Reports
- Volunteer stories
- Team list

### Batch Page Sections

```txt
Overview
Impact
Projects
Camps
Highlights
Gallery
Videos
Reports
Volunteer Stories
Team
```

### Example Batch

```txt
Batch: 2025–26
Title: Service Through Action
Programme Officer: [Name]
Volunteer Secretary: [Name]
Volunteers: 100
Projects: 12
Special Camps: 1
Highlights: 5
```

---

## 8.5 Projects Page

The projects page lists all NSS projects across all years and batches.

### Project Filters

Projects should be filterable by:

- Batch
- Year
- Category
- Location
- Featured status
- Camp-related or normal project
- Latest / oldest

### Project Categories

Use controlled categories:

```txt
Environment
Health
Education
Anti-Drug Awareness
Road Safety
Blood Donation
Palliative Care
Community Cleaning
Disaster Relief
Digital Literacy
School Development
Charity
Social Survey
Women Empowerment
Special Camp Activity
Other
```

### Project Listing Item

Each project card/list item should show:

- Project title
- Date
- Batch
- Category
- Location
- Short description
- Cover image
- Featured/highlight badge if applicable
- Impact summary

---

## 8.6 Single Project Page

Each project gets a full detail page.

### Required Content

- Project title
- Slug
- Date
- Batch
- Academic year
- Category
- Location
- Project status
- Cover image
- Short summary
- Full description
- Problem addressed
- What NSS did
- People involved
- Impact numbers
- Photos
- Video clips
- Related reports
- Related camp if applicable
- Highlights from the project
- Credits/organizers

### Project Impact Fields

Possible fields:

- Volunteers participated
- People reached
- Trees planted
- Area cleaned
- Houses visited
- Students reached
- Blood units collected
- Materials distributed
- Awareness sessions conducted

Not every project needs every field. The CMS should allow flexible impact items.

---

## 8.7 Camps Page

The camps page lists all NSS camps.

### Camp Filters

- Year
- Batch
- Location
- Theme
- Featured status
- Latest / oldest

### Camp Listing Item

Each camp item should show:

- Camp title
- Year
- Batch
- Location
- Dates
- Theme
- Cover image
- Short description

---

## 8.8 Single Camp Page

Each camp should feel like a complete documentary-style archive.

### Required Content

- Camp title
- Slug
- Batch
- Year
- Location
- Camp dates
- Theme
- Camp overview
- Programme Officer
- Camp leaders
- Total volunteers
- Cover image
- Day-wise activities
- Photos
- Video clips
- Reports
- Highlights
- Community impact
- Guest details if any
- Closing summary

### Day-Wise Camp Timeline

Each camp should have day-wise entries.

Example:

```txt
Day 1 — Inauguration
Day 2 — Cleaning Drive
Day 3 — Awareness Class
Day 4 — Survey and Community Visit
Day 5 — Cultural Evening
Day 6 — Public Service Activity
Day 7 — Valedictory Function
```

### Day Entry Fields

Each day should include:

- Day number
- Date
- Title
- Description
- Activities
- Photos
- Videos
- Guests/resource persons
- Highlights

---

## 8.9 Highlights Page

The highlights page shows the best and most important moments.

### Highlight Types

```txt
Best Project
Best Camp Moment
Most Impactful Activity
Award
Achievement
Media Coverage
Volunteer Story
Before/After Transformation
Community Appreciation
Special Guest Visit
Milestone
Other
```

### Highlight Fields

- Title
- Type
- Year
- Batch
- Related project
- Related camp
- Date
- Description
- Image/video
- Featured status
- Priority/order

### Homepage Featured Highlight

One highlight can be marked as:

```txt
Featured on homepage
```

---

## 8.10 Gallery Page

The gallery should not be a random dump of photos. It should be album-based.

### Gallery Album Types

```txt
Project Album
Camp Album
Batch Album
Event Album
Highlight Album
General NSS Album
```

### Gallery Filters

- Batch
- Year
- Category
- Project
- Camp
- Album type

### Gallery Album Fields

- Album title
- Slug
- Date
- Batch
- Related project
- Related camp
- Album type
- Description
- Cover image
- Images
- Photographer/credits if needed

### Image Metadata

For each image, optionally store:

- Caption
- Alt text
- Date
- Credit
- Related people/event

---

## 8.11 Videos Page

The videos page should store short clips without depending on YouTube.

### Video Types

```txt
Project Clip
Camp Clip
Highlight Clip
Interview
Volunteer Memory
Event Clip
Documentary Clip
```

### Video Fields

- Title
- Slug
- Type
- Batch
- Year
- Related project
- Related camp
- Video file/link
- Thumbnail
- Duration
- Caption/description
- Featured status

### Video Rules

For first version:

- Use short clips only
- Avoid long videos
- Compress before upload
- Prefer MP4 format
- Keep video clips organized by project/camp/batch
- Add thumbnails for faster browsing

---

## 8.12 Reports Page

The reports page stores official and semi-official documents.

### Report Types

```txt
Annual Report
Project Report
Camp Report
Activity Report
Notice
Brochure
Certificate
Press Note
Permission Letter
Other
```

### Report Fields

- Title
- Type
- Year
- Batch
- Related project
- Related camp
- File
- Description
- Date
- Published status

### Report Listing Filters

- Year
- Batch
- Report type
- Project
- Camp

---

## 8.13 Journey Timeline Page

The journey page shows NSS history from the start to now.

### Timeline Item Types

```txt
Unit Started
Major Project
Camp
Award
Milestone
Leadership Change
Media Coverage
Community Impact
Website Launch
Other
```

### Timeline Fields

- Title
- Date/year
- Type
- Description
- Image
- Related batch
- Related project
- Related camp
- Importance level

### Timeline Sorting

Default:

```txt
Oldest to newest
```

Optional toggle:

```txt
Newest first
```

---

## 8.14 Team / Volunteers Page

This page shows NSS team information batch-wise.

### Team Sections

- Current Programme Officer
- Current Volunteer Secretary
- Current volunteer leaders
- Batch-wise teams
- Past Programme Officers if available
- Key contributors
- Website maintenance team

### Team Member Fields

- Name
- Role
- Batch
- Photo
- Short bio
- Contact visibility
- Display order

### Privacy Note

Do not publish phone numbers or personal data of students unless permission is given.

---

## 8.15 Volunteer Stories Page

This page stores emotional memories and experiences.

### Story Fields

- Volunteer name
- Batch
- Photo
- Quote
- Story title
- Full story
- Related project/camp
- Featured status
- Permission status

### Example Story Themes

- “What NSS taught me”
- “My camp experience”
- “A project I will never forget”
- “How service changed my view”

---

## 8.16 Notices / Updates Page

This page shows latest NSS announcements.

### Notice Types

```txt
Upcoming Event
Activity Update
Report Published
Camp Notice
Meeting Notice
General Announcement
```

### Notice Fields

- Title
- Date
- Type
- Description
- Attachment
- Expiry date
- Important flag

---

## 8.17 Contact Page

The contact page should include:

- School name
- NSS unit name
- Location
- Programme Officer name
- Contact email
- Phone number only if approved
- Map link if needed
- Social links if official
- Simple contact instructions

No complex contact form is required in first version.

---

## 9. Content Model Plan

The website should be content-driven.

Recommended main content types:

```txt
SiteSettings
Batch
Project
Camp
CampDay
GalleryAlbum
ImageAsset
VideoClip
Report
Highlight
TimelineItem
TeamMember
VolunteerStory
Notice
Category
ImpactMetric
```

---

## 10. Content Relationships

### 10.1 Batch Relationships

A Batch can have:

```txt
Many Projects
Many Camps
Many Gallery Albums
Many Video Clips
Many Reports
Many Highlights
Many Volunteer Stories
Many Team Members
```

### 10.2 Project Relationships

A Project can belong to:

```txt
One Batch
One Category
Optional Camp
Many Images
Many Videos
Many Reports
Many Highlights
Many Impact Metrics
```

### 10.3 Camp Relationships

A Camp can belong to:

```txt
One Batch
Many Camp Days
Many Projects
Many Images
Many Videos
Many Reports
Many Highlights
Many Impact Metrics
```

### 10.4 Highlight Relationships

A Highlight can link to:

```txt
One Batch
Optional Project
Optional Camp
Optional Gallery Album
Optional Video Clip
```

---

## 11. CMS Plan

The CMS should allow future NSS members to update content without touching code.

### 11.1 CMS Users

Possible roles:

```txt
Main Admin
Teacher/Admin
Volunteer Editor
Viewer
```

### 11.2 Editor Permissions

For first version, keep permissions simple:

- Admins can create/edit/delete anything
- Editors can create/edit content
- Viewers can only read content inside CMS

### 11.3 Content Publishing Flow

Suggested flow:

```txt
Draft → Review → Published
```

For the first version, this can be manual:

1. Volunteer adds content
2. Teacher/main admin checks it
3. Content is published

---

## 12. Content Entry Rules

To keep the archive clean, every content item should follow rules.

### 12.1 Project Entry Rules

Every project must have:

- Title
- Date
- Batch
- Category
- Short description
- At least one image or placeholder
- Location
- Status

Recommended:

- Impact metrics
- Video clip
- Report

### 12.2 Camp Entry Rules

Every camp must have:

- Title
- Year
- Batch
- Location
- Dates
- Theme
- Cover image
- Day-wise activities

Recommended:

- Video clips
- Camp report
- Highlights

### 12.3 Gallery Entry Rules

Every album must have:

- Title
- Batch or year
- Album type
- Cover image
- Images
- Description

### 12.4 Video Entry Rules

Every video clip must have:

- Title
- Batch/year
- Type
- Thumbnail
- Video file or video URL
- Related project/camp if applicable

---

## 13. Data Validation Rules

The CMS should prevent messy content.

### Required Fields

- Title
- Slug
- Batch/year where relevant
- Date where relevant
- Category/type where relevant

### Slug Rules

Use lowercase URL-friendly slugs.

Example:

```txt
plastic-free-campus-2025
special-camp-2026
batch-2025-26
```

### Image Rules

Every important image should have:

- Alt text
- Caption if possible
- Compressed version

### Featured Rules

Only a few items should be featured at once.

Recommended:

```txt
Homepage featured highlight: 1
Homepage featured projects: 3 to 6
Homepage featured videos: 3 to 6
Homepage featured reports: 3 to 6
```

---

## 14. Search and Filtering Plan

### 14.1 First Version

Use frontend filtering.

Filters:

- Batch
- Year
- Category
- Type
- Featured
- Related camp/project

### 14.2 Future Version

Add full search if content becomes large.

Search should cover:

- Project titles
- Camp titles
- Batch names
- Categories
- Descriptions
- Locations
- Reports
- Highlights

---

## 15. Media Management Plan

### 15.1 Photos

Photos should be:

- Compressed before upload
- Organized into albums
- Connected to batch/project/camp
- Given captions where useful

Recommended photo sizes:

```txt
Thumbnail: small optimized image
Display image: compressed web image
Original: avoid storing unless necessary
```

### 15.2 Videos

Videos should be:

- Short clips
- Compressed
- Given thumbnails
- Stored as MP4
- Linked to projects/camps/batches
- Not uploaded randomly without naming

Recommended clip types:

```txt
Homepage highlight clip
Project clip
Camp day clip
Volunteer memory clip
Event moment clip
```

### 15.3 Documents

Documents should be:

- PDF where possible
- Named properly
- Linked to relevant project/camp/year
- Marked as public only if safe

---

## 16. Naming Conventions

### 16.1 File Naming

Use clear names:

```txt
batch-2025-26-cover.jpg
special-camp-2026-day-1.jpg
plastic-free-campus-report-2025.pdf
anti-drug-awareness-clip-2025.mp4
```

Avoid:

```txt
IMG_20250605_1234.jpg
VID_001.mp4
finalfinalnew.pdf
```

### 16.2 Content Naming

Use consistent titles:

```txt
Plastic-Free Campus Campaign
Seven-Day Special Camp 2026
Anti-Drug Awareness Programme
World Environment Day Activity
```

---

## 17. Privacy and Safety Rules

Before publishing content, check:

- Do we have permission to show student photos?
- Are phone numbers visible in documents?
- Are signatures or sensitive documents visible?
- Are minors shown in sensitive contexts?
- Is the content respectful?
- Are private school documents accidentally public?
- Is any student being embarrassed or exposed?

Avoid publishing:

- Personal phone numbers of students
- Private addresses
- Unapproved student details
- Sensitive medical details
- Private school letters
- Documents with signatures unless approved
- Embarrassing photos or videos

---

## 18. Content Moderation Checklist

Before publishing a project/camp/gallery item:

```txt
[ ] Title is clear
[ ] Batch/year is selected
[ ] Category/type is selected
[ ] Description is checked
[ ] Images are compressed
[ ] Videos are short and appropriate
[ ] No private information is visible
[ ] Report file is safe to publish
[ ] Related project/camp links are correct
[ ] Featured flag is used only if needed
```

---

## 19. SEO and Metadata Plan

Even though hosting/domain is later, the site should be prepared for SEO.

Each page should have:

- Page title
- Meta description
- Open Graph title
- Open Graph description
- Open Graph image
- Clean URL slug

### Example Project SEO

```txt
Title:
Plastic-Free Campus Campaign | NSS Digital Legacy

Description:
A batch-wise NSS project archive entry about the Plastic-Free Campus Campaign, including photos, impact, reports, and highlights.
```

### Sitemap Pages

Important pages:

```txt
Home
About
Batches
Projects
Camps
Highlights
Gallery
Reports
Contact
```

---

## 20. Accessibility Plan

The website should be usable by everyone.

Required:

- Alt text for important images
- Keyboard-friendly navigation
- Proper headings
- Good contrast
- Captions or descriptions for videos where possible
- Meaningful link text
- Avoid autoplay sound

---

## 21. Performance Plan

The website may contain many photos and videos, so performance matters.

### Rules

- Use compressed images
- Lazy-load gallery images
- Do not load all videos at once
- Use thumbnails for videos
- Load full video only when user clicks
- Split pages by route
- Avoid huge homepage media
- Keep homepage fast

### Homepage Media Rule

The homepage should only show previews, not the entire archive.

---

## 22. Technical Architecture

### 22.1 Frontend

Recommended:

```txt
Vite
React
TypeScript
Tailwind CSS
Framer Motion
React Router
Sanity Client
```

### 22.2 Content Source

Recommended:

```txt
Sanity CMS
```

### 22.3 Data Fetching

Possible approach:

```txt
Frontend fetches content from Sanity
Content is rendered into pages
Filters run on client side for first version
```

### 22.4 No Backend Needed Initially

The first version should not require:

```txt
Express server
PHP server
Custom database server
Login backend
Payment backend
```

---

## 23. Suggested Project Folder Structure

```txt
nss-digital-legacy/
│
├── public/
│   ├── placeholders/
│   ├── demo-videos/
│   └── icons/
│
├── src/
│   ├── app/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── features/
│   │   ├── batches/
│   │   ├── projects/
│   │   ├── camps/
│   │   ├── gallery/
│   │   ├── videos/
│   │   ├── reports/
│   │   ├── highlights/
│   │   ├── timeline/
│   │   └── team/
│   │
│   ├── lib/
│   │   ├── sanity/
│   │   ├── seo/
│   │   └── utils/
│   │
│   ├── pages/
│   ├── routes/
│   ├── types/
│   └── main.tsx
│
├── sanity/
│   ├── schemas/
│   ├── deskStructure/
│   └── sanity.config.ts
│
├── docs/
│   ├── plan.md
│   ├── content-guide.md
│   └── editor-guide.md
│
└── README.md
```

---

## 24. Sanity Schema List

Create these schemas:

```txt
siteSettings.ts
batch.ts
project.ts
camp.ts
campDay.ts
galleryAlbum.ts
videoClip.ts
report.ts
highlight.ts
timelineItem.ts
teamMember.ts
volunteerStory.ts
notice.ts
category.ts
impactMetric.ts
```

---

## 25. Example Schema Fields

### 25.1 Batch

```txt
title
slug
yearRange
description
coverImage
programmeOfficer
volunteerSecretary
volunteerCount
leaders[]
impactMetrics[]
featured
projects[]
camps[]
galleryAlbums[]
videos[]
reports[]
```

### 25.2 Project

```txt
title
slug
date
year
batch
category
location
summary
description
problemAddressed
whatNssDid
coverImage
images[]
videoClips[]
impactMetrics[]
relatedCamp
reports[]
highlights[]
featured
status
```

### 25.3 Camp

```txt
title
slug
year
batch
location
theme
startDate
endDate
summary
description
programmeOfficer
campLeaders[]
volunteerCount
coverImage
dayWiseActivities[]
projects[]
images[]
videoClips[]
reports[]
highlights[]
featured
```

### 25.4 Highlight

```txt
title
slug
type
date
year
batch
relatedProject
relatedCamp
description
image
videoClip
featured
priority
```

### 25.5 Report

```txt
title
slug
type
date
year
batch
relatedProject
relatedCamp
file
description
isPublic
```

---

## 26. Content States

Each major content item should have a status:

```txt
Draft
Ready for Review
Published
Archived
```

For first version, this can be simple:

```txt
published: true/false
```

---

## 27. Demo Content Plan

To build the first complete demo, prepare sample content:

### Required Demo Data

```txt
2 batches
3 projects
1 camp
7 camp-day entries
4 highlights
3 gallery albums
3 short video clips
3 reports
5 team members
3 volunteer stories
5 timeline items
3 notices
```

### Demo Batches

```txt
Batch 2024–25
Batch 2025–26
```

### Demo Projects

```txt
Plastic-Free Campus Campaign
Anti-Drug Awareness Programme
World Environment Day Activity
```

### Demo Camp

```txt
Seven-Day Special Camp 2026
```

### Demo Highlights

```txt
Best Project of the Year
Most Impactful Camp Moment
Community Appreciation
Volunteer Story Highlight
```

---

## 28. Development Phases

## Phase 1 — Planning and Foundation

Tasks:

- Finalize content model
- Create project structure
- Add routing
- Add TypeScript types
- Add Sanity setup or mock JSON first
- Prepare placeholder content

Deliverable:

```txt
Project running locally with routes and sample data
```

---

## Phase 2 — Core Content Pages

Build:

- Home
- About
- Batches
- Single Batch
- Projects
- Single Project
- Camps
- Single Camp

Deliverable:

```txt
Main archive system working with demo content
```

---

## Phase 3 — Media and Documents

Build:

- Gallery
- Single Gallery Album
- Videos
- Reports
- Highlights

Deliverable:

```txt
Media archive and document archive working
```

---

## Phase 4 — Story and Legacy Pages

Build:

- Journey Timeline
- Team
- Volunteer Stories
- Notices
- Contact

Deliverable:

```txt
Complete NSS legacy website structure
```

---

## Phase 5 — CMS Integration

Tasks:

- Create Sanity schemas
- Connect frontend to Sanity
- Replace mock content with CMS content
- Add CMS preview/testing
- Add editor guide

Deliverable:

```txt
Future editors can add/update content from CMS
```

---

## Phase 6 — Quality and Cleanup

Tasks:

- Check all routes
- Check mobile responsiveness
- Check broken links
- Check empty states
- Check image alt text
- Check video loading
- Check privacy issues
- Optimize assets
- Prepare final content guide

Deliverable:

```txt
Complete demo-ready website
```

---

## 29. Empty State Rules

Every archive page should handle missing content.

Examples:

```txt
No projects found for this batch.
No videos added yet.
Reports will be published soon.
Gallery album is being prepared.
```

Do not show broken sections.

---

## 30. Error Handling Plan

Handle:

- Missing images
- Missing videos
- Broken file links
- Empty project lists
- Invalid slugs
- CMS fetch errors
- Network failure

For invalid pages:

```txt
Show a clean 404 page with link back to archive.
```

For CMS errors:

```txt
Show fallback content or friendly message.
```

---

## 31. Future-Proofing Plan

The website should support:

- New batch every year
- New camp every year
- Unlimited projects
- Multiple gallery albums
- Video clips
- Reports
- Highlight of the year
- Timeline growth
- Alumni stories later
- More categories later

Avoid hardcoding one year or one batch in code.

---

## 32. Maintenance Plan

### Monthly

- Add new activities
- Add photos/videos
- Check broken links
- Update notices

### After Each Event

- Add project/event entry
- Add gallery album
- Add short video clip if available
- Add report if available
- Mark highlight if important

### Yearly

- Add new batch
- Archive previous batch
- Add annual report
- Update team
- Update impact numbers
- Add year summary

---

## 33. Editor Guide Plan

Create a future `content-guide.md` explaining:

- How to add a project
- How to add a camp
- How to add photos
- How to add videos
- How to add reports
- How to select featured content
- Privacy checklist before publishing
- Image/video compression rules
- Naming rules

---

## 34. Acceptance Criteria

The complete site plan is successful if:

```txt
[ ] Visitors can browse batches
[ ] Visitors can browse projects
[ ] Visitors can browse camps
[ ] Each batch has its own archive page
[ ] Each project has a detail page
[ ] Each camp has a day-wise page
[ ] Photos are album-based
[ ] Videos are organized as clips
[ ] Reports are downloadable/viewable
[ ] Highlights can be featured
[ ] Timeline shows NSS journey
[ ] Future batches can be added
[ ] Content is not hardcoded permanently
[ ] Website works even with low content
[ ] Privacy-sensitive data is not exposed
```

---

## 35. Final Build Strategy

Build the complete site in this order:

```txt
1. Create data models
2. Create routes
3. Create mock content
4. Build archive pages
5. Build detail pages
6. Add filters
7. Add media sections
8. Add CMS integration
9. Add editor workflow
10. Clean and test
```

Do not start with animations or visual effects.

The most important foundation is:

```txt
Batch → Project → Camp → Gallery → Video → Report → Highlight
```

Once this structure is correct, the UI can be made premium later.

---

## 36. Final Summary

This project is not only an NSS website.

It is:

> **A permanent, batch-wise, camp-wise, project-wise digital legacy system for the NSS unit.**

The website should be built so:

- Current batch can add content
- Future batches can continue it
- Old batches remain preserved
- Camps are documented properly
- Projects are searchable and organized
- Highlights are remembered
- Reports and media stay accessible
- The framework remains the same for years

Final concept:

```txt
NSS Digital Legacy
A living archive of service, leadership, camps, projects, and memories.
```
