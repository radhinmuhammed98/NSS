import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'timelineItem',
  title: 'Journey Milestone / Timeline Item',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Milestone Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Milestone Type',
      type: 'string',
      description: 'e.g. Unit Founded, National Award, Website Launch',
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
      name: 'image',
      title: 'Milestone Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'batch',
      title: 'Associated Batch',
      type: 'reference',
      to: [{ type: 'batch' }],
      description: 'Optional batch association',
    }),
    defineField({
      name: 'importance',
      title: 'Importance / Significance Level',
      type: 'string',
      options: {
        list: [
          { title: 'High (Primary Milestones)', value: 'high' },
          { title: 'Medium (Regular Achievements)', value: 'medium' },
          { title: 'Low (Minor Updates)', value: 'low' },
        ],
      },
      initialValue: 'medium',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      media: 'image',
    },
    prepare({ title, type, media }) {
      return {
        title,
        subtitle: type || '',
        media,
      }
    },
  },
})
