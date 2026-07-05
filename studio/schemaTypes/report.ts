import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'report',
  title: 'Report',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Report Title',
      type: 'string',
      description: 'The title of the report.',
      placeholder: 'e.g., Annual Activity Report 2025-26',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'PDF File',
      type: 'file',
      description: 'Upload the PDF document.',
      options: { accept: '.pdf' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date (Optional)',
      type: 'date',
      description: 'The date this report was published.',
      initialValue: () => new Date().toISOString().split('T')[0],
    }),
    defineField({
      name: 'description',
      title: 'Description (Optional)',
      type: 'text',
      description: 'A brief summary of what is in this report.',
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
