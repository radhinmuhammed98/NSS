import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'highlight',
  title: 'Highlight',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Highlight Title',
      type: 'string',
      description: 'A catchy title for this achievement or highlight.',
      placeholder: 'e.g., Best NSS Unit Award 2025',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'When did this happen?',
      initialValue: () => new Date().toISOString().split('T')[0],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'A photo representing this highlight.',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
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
      description: 'A short description of this achievement.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'image',
    },
    prepare(selection) {
      const { title, date, media } = selection;
      return {
        title,
        subtitle: date,
        media,
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
