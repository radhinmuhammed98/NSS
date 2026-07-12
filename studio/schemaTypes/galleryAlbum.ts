import { defineField, defineType } from 'sanity';

// Canonical category list — shared so the frontend can import the same values
export const GALLERY_CATEGORIES = [
  { title: 'Group Photos',          value: 'Group Photos'          },
  { title: 'Camp Memories',         value: 'Camp Memories'         },
  { title: 'Reels & Videos',        value: 'Reels & Videos'        },
  { title: 'Posters & Artwork',     value: 'Posters & Artwork'     },
  { title: 'Awards & Certificates', value: 'Awards & Certificates' },
  { title: 'Newspaper Coverage',    value: 'Newspaper Coverage'    },
  { title: 'Campus & NSS Life',     value: 'Campus & NSS Life'     },
  { title: 'Awareness Programs',    value: 'Awareness Programs'    },
  { title: 'Blood Donation',        value: 'Blood Donation'        },
  { title: 'Children\'s Day',       value: 'Children\'s Day'       },
  { title: 'Field Visits',          value: 'Field Visits'          },
  { title: 'Other',                 value: 'Other'                 },
] as const;

export default defineType({
  name: 'galleryAlbum',
  title: 'Gallery Album',
  type: 'document',
  fields: [
    // ── Step 1: Name & Slug ────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Album Name',
      type: 'string',
      description: 'Give this album a clear name. e.g. "Onam Celebrations 2025" or "Blood Donation Camp"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The web address for this album. Generate it from the title.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    // ── Step 2: Category ──────────────────────────────────────────
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Choose a category — the website will automatically group albums under the right section.',
      options: {
        list: GALLERY_CATEGORIES,
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    // ── Step 3: Photos & Videos ───────────────────────────────────
    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      of: [{ type: 'imageAsset' }],
      description: 'Upload all photos for this album. The first photo will be used as the cover automatically if no Custom Cover is provided.',
    }),
    defineField({
      name: 'videos',
      title: 'Videos (Optional)',
      type: 'array',
      of: [{ type: 'videoAsset' }],
      description: 'Optionally add videos. Paste a YouTube link or upload a video file.',
    }),

    // ── Step 4: Metadata ──────────────────────────────────────────
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'When were these photos taken?',
      initialValue: () => new Date().toISOString().split('T')[0],
    }),
    defineField({
      name: 'coverImage',
      title: 'Custom Cover Image (Optional)',
      type: 'image',
      description: 'Override the automatic cover. Leave empty to use the first uploaded photo.',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alternative text' }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Short Description (Optional)',
      type: 'text',
      rows: 3,
      description: 'A short caption shown below the album title.',
    }),
    defineField({
      name: 'batch',
      title: 'Batch (Optional)',
      type: 'reference',
      to: [{ type: 'batch' }],
      description: 'Link this album to a specific batch of volunteers.',
    }),
    defineField({
      name: 'relatedActivity',
      title: 'Related Activity (Optional)',
      type: 'reference',
      to: [{ type: 'project' }],
      description: 'Link this album to a specific activity/project.',
    }),

    // ── Step 5: Visibility ────────────────────────────────────────
    defineField({
      name: 'featured',
      title: 'Feature Album?',
      type: 'boolean',
      description: 'Feature this album in highlight sections.',
      initialValue: false,
    }),
    defineField({
      name: 'showOnHome',
      title: 'Show on Homepage?',
      type: 'boolean',
      description: 'Turn on to feature this album on the homepage media section.',
      initialValue: false,
    }),

    // ── Legacy field — kept for backward compatibility ────────────
    defineField({
      name: 'type',
      title: '(Legacy) Album Type',
      type: 'string',
      hidden: true, // hidden from Studio UI; existing values still readable by frontend
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
      firstImage: 'images.0.image',
    },
    prepare({ title, subtitle, media, firstImage }) {
      return {
        title: title || 'Untitled Album',
        subtitle: subtitle || '',
        media: media || firstImage,
      };
    },
  },

  orderings: [
    {
      title: 'Newest First',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Category A–Z',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
});
