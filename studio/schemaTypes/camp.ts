import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'camp',
  title: 'Camp',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Camp Title',
      type: 'string',
      description: 'The name of the camp.',
      placeholder: 'e.g., Annual Special Camp 2026',
      
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The web address for this camp. Generate it from the title.',
      options: { source: 'title', maxLength: 96 },
      
    }),
    defineField({
      name: 'date',
      title: 'Start Date',
      type: 'date',
      description: 'When did the camp start?',
      initialValue: () => new Date().toISOString().split('T')[0],
      
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Upload the main photo for this camp.',
      options: { hotspot: true },
      
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'A brief description of the photo.',
        })
      ],
    }),
    defineField({
      name: 'description',
      title: 'Camp Overview',
      type: 'text',
      rows: 6,
      description: 'Write a general summary of the camp. What was the main focus?',
      
    }),
    defineField({
      name: 'theme',
      title: 'Theme (Optional)',
      type: 'string',
      description: 'The official theme or motto of the camp.',
      placeholder: 'e.g., Youth for Clean India',
    }),
    defineField({
      name: 'location',
      title: 'Location (Optional)',
      type: 'string',
      description: 'Where was the camp held?',
      placeholder: 'e.g., Govt. UP School, Valakkulam',
    }),
    defineField({
      name: 'campDiary',
      title: 'Camp Diary (Optional)',
      type: 'array',
      of: [{ type: 'campDay' }],
      description: 'Add day-by-day activities here.',
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage?',
      type: 'boolean',
      description: 'Turn this on to showcase this camp on the homepage.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'coverImage',
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
