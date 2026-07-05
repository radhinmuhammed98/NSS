import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'batch',
  title: 'Batch',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Batch Title',
      type: 'string',
      description: 'e.g., Batch 2024-25',
      placeholder: 'e.g., Batch 2024-25',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Auto-generate from title.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'academicYear',
      title: 'Academic Year',
      type: 'string',
      description: 'e.g., 2024-25',
      placeholder: 'e.g., 2024-25',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      description: `
        Current = shown on homepage and Team page.
        Previous = shown in the Batch Archive (latest 2).
        Archive = older batches, still stored for history.
        
        ⚠️ Only ONE batch should be set to "Current" at a time.
        When a new academic year starts: set the old batch to "Previous", and create a new batch with "Current".
      `,
      options: {
        list: [
          { title: '✅ Current  (Active this year)', value: 'current' },
          { title: '📁 Previous (Recent past batch)', value: 'previous' },
          { title: '🗄️ Archive  (Older batch)', value: 'archive' },
        ],
        layout: 'radio',
      },
      initialValue: 'current',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description (Optional)',
      type: 'text',
      rows: 3,
      description: 'A short note about this batch. Shown on the archive page.',
    }),
    defineField({
      name: 'leader1Name',
      title: 'First Leader Name (e.g. Volunteer Secretary)',
      type: 'string',
      description: 'Name of the first Volunteer Secretary / Leader.',
    }),
    defineField({
      name: 'leader1Role',
      title: 'First Leader Role',
      type: 'string',
      initialValue: 'Volunteer Secretary',
      description: 'e.g. Volunteer Secretary',
    }),
    defineField({
      name: 'leader1Photo',
      title: 'First Leader Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'leader2Name',
      title: 'Second Leader Name (e.g. Volunteer Secretary)',
      type: 'string',
      description: 'Name of the second Volunteer Secretary / Leader.',
    }),
    defineField({
      name: 'leader2Role',
      title: 'Second Leader Role',
      type: 'string',
      initialValue: 'Volunteer Secretary',
      description: 'e.g. Volunteer Secretary',
    }),
    defineField({
      name: 'leader2Photo',
      title: 'Second Leader Photo',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      year: 'academicYear',
    },
    prepare({ title, status, year }) {
      const icon = status === 'current' ? '✅' : status === 'previous' ? '📁' : '🗄️';
      return {
        title: `${icon} ${title || 'Untitled Batch'}`,
        subtitle: year || '',
      };
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'yearDesc',
      by: [{ field: 'academicYear', direction: 'desc' }],
    },
  ],
});
