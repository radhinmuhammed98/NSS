# NSS Digital Legacy — CMS Mapping Document

This document defines the schema mappings and relationship resolution details between the Sanity CMS dataset and the TypeScript model interfaces on the React frontend.

---

## 🗺️ Field-by-Field Mappings

Sanity documents are fetched via GROQ, which maps query fields into frontend model fields.

### 1. Website Configuration (`siteSettings`)
| Sanity Field | TypeScript Property | Type | Details |
|---|---|---|---|
| `schoolName` | `schoolName` | `string` | |
| `unitName` | `unitName` | `string` | |
| `motto` | `motto` | `string` | Default: "Not Me, But You" |
| `location` | `location` | `string` | |
| `academicYear` | `academicYear` | `string` | e.g. "2025–26" |
| `programmeOfficer`| `programmeOfficer` | `string` | |
| `volunteerSecretary`| `volunteerSecretary` | `string` | |
| `email` | `email` | `string` | Contact email |
| `phone` | `phone` | `string` | Optional |
| `mission` | `mission` | `string` | |
| `vision` | `vision` | `string` | |
| `objectives` | `objectives` | `string[]` | Array of strings |
| `history` | `history` | `string` | Historical text |
| `achievements` | `achievements` | `string[]` | Array of key achievements |

### 2. Batch (`batch`)
| Sanity Field | TypeScript Property | Type | Details |
|---|---|---|---|
| `slug.current` | `slug` | `string` | Unique identifier |
| `title` | `title` | `string` | |
| `yearRange` | `yearRange` | `string` | |
| `year` | `year` | `number` | |
| `description` | `description` | `string` | |
| `theme` | `theme` | `string` | |
| `coverImage` | `coverImage` | `string` | Resolved asset URL |
| `programmeOfficer`| `programmeOfficer` | `string` | |
| `volunteerSecretary`| `volunteerSecretary` | `string` | |
| `leaders` | `leaders` | `string[]` | List of leader names |
| `volunteerCount` | `volunteerCount` | `number` | |
| `impactMetrics` | `impactMetrics` | `ImpactMetric[]` | Array of impact stats |
| `featured` | `featured` | `boolean` | Mark current batch |

### 3. Project (`project`)
| Sanity Field | TypeScript Property | Type | Details |
|---|---|---|---|
| `slug.current` | `slug` | `string` | |
| `title` | `title` | `string` | |
| `date` | `date` | `string` | YYYY-MM-DD |
| `year` | `year` | `number` | |
| `batch` | `batchSlug` | `string` | Reference resolved to `batch->slug.current` |
| `category` | `category` | `string` | Reference resolved to `category->title` |
| `location` | `location` | `string` | |
| `status` | `status` | `ProjectStatus`| "completed" \| "ongoing" \| "planned" |
| `summary` | `summary` | `string` | |
| `description` | `description` | `string` | |
| `problemAddressed`| `problemAddressed` | `string` | |
| `whatNssDid` | `whatNssDid` | `string` | |
| `coverImage` | `coverImage` | `string` | Resolved asset URL |
| `images` | `images` | `ImageAsset[]` | Array of image assets with captions/alt |
| `impactMetrics` | `impactMetrics` | `ImpactMetric[]` | |
| `relatedCamp` | `relatedCampSlug` | `string` | Reference resolved to `relatedCamp->slug.current` |
| `reports` | `reportSlugs` | `string[]` | References resolved to `reports[]->slug.current` |
| `highlights` | `highlightSlugs` | `string[]` | References resolved to `highlights[]->slug.current` |
| `organizers` | `organizers` | `string[]` | |
| `featured` | `featured` | `boolean` | |
| `campRelated` | `campRelated` | `boolean` | |

### 4. Camp (`camp`)
| Sanity Field | TypeScript Property | Type | Details |
|---|---|---|---|
| `slug.current` | `slug` | `string` | |
| `title` | `title` | `string` | |
| `year` | `year` | `number` | |
| `batch` | `batchSlug` | `string` | Reference resolved to `batch->slug.current` |
| `location` | `location` | `string` | |
| `theme` | `theme` | `string` | |
| `startDate` | `startDate` | `string` | YYYY-MM-DD |
| `endDate` | `endDate` | `string` | YYYY-MM-DD |
| `summary` | `summary` | `string` | |
| `description` | `description` | `string` | |
| `programmeOfficer`| `programmeOfficer` | `string` | |
| `campLeaders` | `campLeaders` | `string[]` | |
| `volunteerCount` | `volunteerCount` | `number` | |
| `coverImage` | `coverImage` | `string` | Resolved asset URL |
| `dayWiseActivities`| `dayWiseActivities`| `CampDay[]` | Array of day activities with day photos |
| `projects` | `projectSlugs` | `string[]` | References resolved to `projects[]->slug.current` |
| `impactMetrics` | `impactMetrics` | `ImpactMetric[]` | |
| `reports` | `reportSlugs` | `string[]` | References resolved to `reports[]->slug.current` |
| `highlights` | `highlightSlugs` | `string[]` | References resolved to `highlights[]->slug.current` |
| `featured` | `featured` | `boolean` | |

### 5. Gallery Album (`galleryAlbum`)
| Sanity Field | TypeScript Property | Type | Details |
|---|---|---|---|
| `slug.current` | `slug` | `string` | |
| `title` | `title` | `string` | |
| `date` | `date` | `string` | |
| `year` | `year` | `number` | |
| `batch` | `batchSlug` | `string` | Reference resolved to `batch->slug.current` |
| `type` | `type` | `string` | Album Type |
| `description` | `description` | `string` | |
| `coverImage` | `coverImage` | `string` | Resolved asset URL |
| `images` | `images` | `ImageAsset[]` | Array of image assets |

### 6. Video Clip (`videoClip`)
| Sanity Field | TypeScript Property | Type | Details |
|---|---|---|---|
| `slug.current` | `slug` | `string` | |
| `title` | `title` | `string` | |
| `type` | `type` | `string` | |
| `year` | `year` | `number` | |
| `batch` | `batchSlug` | `string` | Reference resolved to `batch->slug.current` |
| `relatedProject` | `relatedProjectSlug`| `string` | Reference resolved to `relatedProject->slug.current` |
| `relatedCamp` | `relatedCampSlug` | `string` | Reference resolved to `relatedCamp->slug.current` |
| `url` | `url` | `string` | MP4 link |
| `thumbnail` | `thumbnail` | `string` | Resolved thumbnail asset URL |
| `duration` | `duration` | `string` | |
| `description` | `description` | `string` | |
| `featured` | `featured` | `boolean` | |

### 7. Report (`report`)
| Sanity Field | TypeScript Property | Type | Details |
|---|---|---|---|
| `slug.current` | `slug` | `string` | |
| `title` | `title` | `string` | |
| `type` | `type` | `string` | |
| `date` | `date` | `string` | |
| `year` | `year` | `number` | |
| `batch` | `batchSlug` | `string` | Reference resolved to `batch->slug.current` |
| `relatedProject` | `relatedProjectSlug`| `string` | Reference resolved to `relatedProject->slug.current` |
| `relatedCamp` | `relatedCampSlug` | `string` | Reference resolved to `relatedCamp->slug.current` |
| `pdfFile` | `file` | `string` | Resolved uploaded file asset URL |
| `externalUrl` | `file` | `string` | Used if `pdfFile` is absent |
| `description` | `description` | `string` | |
| `isPublic` | `isPublic` | `boolean` | |

### 8. Highlight (`highlight`)
| Sanity Field | TypeScript Property | Type | Details |
|---|---|---|---|
| `slug.current` | `slug` | `string` | |
| `title` | `title` | `string` | |
| `type` | `type` | `string` | |
| `date` | `date` | `string` | |
| `year` | `year` | `number` | |
| `batch` | `batchSlug` | `string` | Reference resolved to `batch->slug.current` |
| `relatedProject` | `relatedProjectSlug`| `string` | Reference resolved to `relatedProject->slug.current` |
| `relatedCamp` | `relatedCampSlug` | `string` | Reference resolved to `relatedCamp->slug.current` |
| `description` | `description` | `string` | |
| `image` | `image` | `string` | Resolved asset URL |
| `featured` | `featured` | `boolean` | |
| `priority` | `priority` | `number` | |

### 9. Timeline Item (`timelineItem`)
| Sanity Field | TypeScript Property | Type | Details |
|---|---|---|---|
| `slug.current` | `slug` | `string` | |
| `title` | `title` | `string` | |
| `date` | `date` | `string` | |
| `year` | `year` | `number` | |
| `type` | `type` | `string` | |
| `description` | `description` | `string` | |
| `image` | `image` | `string` | Optional resolved asset URL |
| `batch` | `batchSlug` | `string` | Reference resolved to `batch->slug.current` |
| `importance` | `importance` | `string` | "high" \| "medium" \| "low" |

### 10. Team Member (`teamMember`)
| Sanity Field | TypeScript Property | Type | Details |
|---|---|---|---|
| `slug.current` | `slug` | `string` | |
| `name` | `name` | `string` | |
| `role` | `role` | `string` | |
| `batch` | `batchSlug` | `string` | Reference resolved to `batch->slug.current` |
| `photo` | `photo` | `string` | Resolved asset URL |
| `bio` | `bio` | `string` | |
| `order` | `order` | `number` | Display priority order |

### 11. Volunteer Story (`volunteerStory`)
| Sanity Field | TypeScript Property | Type | Details |
|---|---|---|---|
| `slug.current` | `slug` | `string` | |
| `name` | `name` | `string` | Volunteer name |
| `batch` | `batchSlug` | `string` | Reference resolved to `batch->slug.current` |
| `photo` | `photo` | `string` | Resolved asset URL |
| `quote` | `quote` | `string` | Prominent quote statement |
| `title` | `title` | `string` | |
| `story` | `story` | `string` | Testimonial text |
| `relatedProject` | `relatedProjectSlug`| `string` | Reference resolved to `relatedProject->slug.current` |
| `relatedCamp` | `relatedCampSlug` | `string` | Reference resolved to `relatedCamp->slug.current` |
| `featured` | `featured` | `boolean` | |

### 12. Notice (`notice`)
| Sanity Field | TypeScript Property | Type | Details |
|---|---|---|---|
| `slug.current` | `slug` | `string` | |
| `title` | `title` | `string` | |
| `date` | `date` | `string` | |
| `type` | `type` | `string` | Notice Type |
| `description` | `description` | `string` | |
| `attachment` | `attachment` | `string` | Optional circular PDF file asset URL |
| `important` | `important` | `boolean` | Important highlight badge |

---

## 🔗 Reference Resolution details

References in GROQ are resolved using the `->` arrow operator.
*   **Single reference**: `batch->slug.current` resolves the referenced batch document's slug text directly into a string property.
*   **Multiple references**: `reports[]->slug.current` resolves an array of referenced report documents into an array of slug strings.
*   **Asset References**: `image.asset->url` dereferences the Sanity image/file metadata document to extract the direct public CDN URL of the media file.
