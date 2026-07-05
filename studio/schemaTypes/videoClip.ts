import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'videoClip',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
      description: 'The title of the video.',
      placeholder: 'e.g., Annual Camp Highlights',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Link to the video (e.g. YouTube, Google Drive, or raw MP4 URL).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type / Tag',
      type: 'string',
      description: 'e.g., Annual Camp, Project Demo, Volunteer Memory',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      description: 'e.g., 2026',
    }),
    defineField({
      name: 'batch',
      title: 'Batch',
      type: 'reference',
      to: [{ type: 'batch' }],
    }),
    defineField({
      name: 'relatedProject',
      title: 'Related Project (Optional)',
      type: 'reference',
      to: [{ type: 'project' }],
    }),
    defineField({
      name: 'relatedCamp',
      title: 'Related Camp (Optional)',
      type: 'reference',
      to: [{ type: 'camp' }],
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'duration',
      title: 'Duration (Optional)',
      type: 'string',
      placeholder: 'e.g., 5:12',
    }),
    defineField({
      name: 'description',
      title: 'Description (Optional)',
      type: 'text',
      rows: 3,
      description: 'A brief description of what happens in the video.',
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      year: 'year',
      media: 'thumbnail',
    },
    prepare(selection) {
      const { title, year, media } = selection;
      return {
        title,
        subtitle: year ? String(year) : '',
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
});
