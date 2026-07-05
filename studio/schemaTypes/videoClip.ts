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
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Link to the YouTube or Google Drive video.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date (Optional)',
      type: 'date',
      description: 'When was this video recorded?',
      initialValue: () => new Date().toISOString().split('T')[0],
    }),
    defineField({
      name: 'description',
      title: 'Description (Optional)',
      type: 'text',
      description: 'A brief description of what happens in the video.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
    },
    prepare(selection) {
      const { title, date } = selection;
      return {
        title,
        subtitle: date,
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
