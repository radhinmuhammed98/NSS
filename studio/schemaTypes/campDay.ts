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
      validation: (Rule) => Rule.required().min(1).max(7),
    }),
    defineField({
      name: 'title',
      title: 'Title of the Day',
      type: 'string',
      description: 'A brief title for this day.',
      placeholder: 'e.g., Inauguration & Ice Breaking',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'What happened on this day? Write a summary of the activities.',
      validation: (Rule) => Rule.required(),
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
        title: `Day ${dayNumber}: ${title}`,
      };
    },
  },
});
