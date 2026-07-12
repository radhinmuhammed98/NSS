import { defineField, defineType } from 'sanity';

// Canonical category list — shared so the frontend can import the same values
export const GALLERY_CATEGORIES = [
  { title: 'Group Photos',          value: 'Group Photos'          },
  { title: 'Camp Memories',         value: 'Camp Memories'         },
  { title: 'Reels & Videos',        value: 'Reels & Videos'        },
  { title: 'Posters & Artwork',     value: 'Posters & Artwork'     },
  { title: 'Awards & Certificates', value: 'Awards & Certificates' },
  { title: 'Newspaper Clippings',   value: 'Newspaper Clippings'   },
  { title: 'Campus & NSS Life',     value: 'Campus & NSS Life'     },
  { title: 'Other',                 value: 'Other'                 },
] as const;

export default defineType({
  name: 'galleryAlbum',
  title: 'Gallery Album',
  type: 'document',
  fields: [
    // ── Step 1: Name ──────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Album Name',
      type: 'string',
      description: 'Give this album a clear name. e.g. "Onam Celebrations 2025" or "Blood Donation Camp"',
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

    // ── Step 3: Photos ────────────────────────────────────────────
    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      of: [{ type: 'imageAsset' }],
      description: 'Upload all photos for this album. The first photo will be used as the cover automatically.',
    }),

    // ── Step 4: Videos (optional) ─────────────────────────────────
    defineField({
      name: 'videos',
      title: 'Videos (Optional)',
      type: 'array',
      of: [{ type: 'videoAsset' }],
      description: 'Optionally add videos. Paste a YouTube link or upload a video file.',
    }),

    // ── Step 5: Date ──────────────────────────────────────────────
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'When were these photos taken?',
      initialValue: () => new Date().toISOString().split('T')[0],
    }),

    // ── Optional extras ───────────────────────────────────────────
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
      title: 'Description (Optional)',
      type: 'text',
      rows: 3,
      description: 'A short caption shown below the album title.',
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
