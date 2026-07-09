import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'campDay',
  title: 'Camp Day',
  type: 'object',
  fields: [
    defineField({
      name: 'dayNumber',
      title: 'Day Number',
      type: 'number',
      description: 'Which day of the camp is this? (e.g., 1, 2, 3)',
      validation: (Rule) => Rule.min(1).max(7),
    }),
    defineField({
      name: 'title',
      title: 'Title of the Day',
      type: 'string',
      description: 'A brief title for this day.',
      placeholder: 'e.g., Inauguration & Ice Breaking',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'What happened on this day? Write a summary of the activities.',
    }),
    defineField({
      name: 'activities',
      title: 'Activities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List the key activities of the day.',
    }),
    defineField({
      name: 'guests',
      title: 'Guests / Resource Persons',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'guest',
          title: 'Guest / Resource Person',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
            }),
            defineField({
              name: 'designation',
              title: 'Designation',
              type: 'string',
            }),
            defineField({
              name: 'photo',
              title: 'Photo (optional)',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'organisation',
              title: 'Organisation (optional)',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'images',
      title: 'Photos of the Day',
      type: 'array',
      of: [{ type: 'imageAsset' }],
      description: 'Upload some key photos from this day.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      dayNumber: 'dayNumber',
    },
    prepare({ title, dayNumber }) {
      return {
        title: `Day ${dayNumber || '?'}: ${title || 'Untitled'}`,
      };
    },
  },
});
