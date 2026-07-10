import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'galleryAlbum',
  title: 'Gallery Album',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Album Name',
      type: 'string',
      description: 'The name of the photo album.',
      placeholder: 'e.g., Onam Celebrations 2025',
      
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The web address for this album. Generate it from the title.',
      options: { source: 'title', maxLength: 96 },
      
    }),
    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      of: [{ type: 'imageAsset' }],
      description: 'Upload all the photos for this album here.',
    }),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'videoClip' }] }],
      description: 'Select videos for this album from the Videos section.',
    }),
    defineField({
      name: 'date',
      title: 'Date (Optional)',
      type: 'date',
      description: 'When were these photos taken?',
      initialValue: () => new Date().toISOString().split('T')[0],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image (Optional)',
      type: 'image',
      description: 'Main photo for the album cover. If left empty, the first photo will be used.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description (Optional)',
      type: 'text',
      description: 'A short description of this album.',
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage?',
      type: 'boolean',
      description: 'Turn this on to showcase this album on the homepage.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      firstImage: 'images.0.image',
    },
    prepare(selection) {
      const { title, media, firstImage } = selection;
      return {
        title,
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
  ],
});
