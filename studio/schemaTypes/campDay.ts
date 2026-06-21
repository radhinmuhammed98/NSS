import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'campDay',
  title: 'Camp Day Entry',
  type: 'object',
  fields: [
    defineField({
      name: 'dayNumber',
      title: 'Day Number',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'activities',
      title: 'Activities',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'guests',
      title: 'Guests/Dignitaries',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'images',
      title: 'Day Photos',
      type: 'array',
      of: [{ type: 'imageAsset' }],
    }),
  ],
  preview: {
    select: {
      dayNumber: 'dayNumber',
      title: 'title',
    },
    prepare({ dayNumber, title }) {
      return {
        title: `Day ${dayNumber || '?'}: ${title || 'Untitled'}`,
      }
    },
  },
})
