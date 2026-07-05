import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      description: 'The name of the community service or project.',
      validation: (Rule) => Rule.required(),
      placeholder: 'e.g., Snehaveedu Construction',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The web address for this project. Generate it from the title.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'When did this project happen?',
      initialValue: () => new Date().toISOString().split('T')[0],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Upload the main photo for this project to be shown on the homepage and project list.',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'A brief description of the photo for visually impaired users.',
        })
      ],
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Write a full story about the project. Why did you do it? What was the impact? Write naturally as paragraphs.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location (Optional)',
      type: 'string',
      description: 'Where did this take place?',
      placeholder: 'e.g., Valakkulam Ward 4',
    }),
    defineField({
      name: 'status',
      title: 'Status (Optional)',
      type: 'string',
      options: {
        list: [
          { title: 'Completed', value: 'completed' },
          { title: 'Ongoing', value: 'ongoing' },
          { title: 'Planned', value: 'planned' },
        ],
        layout: 'radio'
      },
      initialValue: 'completed',
    }),
    defineField({
      name: 'campRelated',
      title: 'Part of a Camp? (Optional)',
      type: 'boolean',
      description: 'Turn this on if this project was done during a 7-day camp.',
      initialValue: false,
    }),
    defineField({
      name: 'relatedCamp',
      title: 'Select Camp (Optional)',
      type: 'reference',
      to: [{ type: 'camp' }],
      hidden: ({ document }) => !document?.campRelated,
    }),
    defineField({
      name: 'images',
      title: 'Additional Photos (Optional)',
      type: 'array',
      of: [{ type: 'imageAsset' }],
      description: 'Add more photos from the project.',
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage?',
      type: 'boolean',
      description: 'Turn this on to showcase this project on the homepage.',
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
