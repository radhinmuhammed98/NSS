import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'camp',
  title: 'Camp',
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
      title: 'Camp Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Camp Year',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'batch',
      title: 'Batch',
      type: 'reference',
      to: [{ type: 'batch' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'theme',
      title: 'Camp Theme',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Detailed Description',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'programmeOfficer',
      title: 'Programme Officer',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'campLeaders',
      title: 'Camp Leaders',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'volunteerCount',
      title: 'Volunteer Count',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dayWiseActivities',
      title: 'Day-Wise Schedule / Activities',
      type: 'array',
      of: [{ type: 'campDay' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'projects',
      title: 'Related Projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    }),
    defineField({
      name: 'impactMetrics',
      title: 'Camp Impact Metrics',
      type: 'array',
      of: [{ type: 'impactMetric' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reports',
      title: 'Related Reports',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'report' }] }],
    }),
    defineField({
      name: 'highlights',
      title: 'Related Highlights',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'highlight' }] }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Camp',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      batch: 'batch.title',
      media: 'coverImage',
    },
    prepare({ title, batch, media }) {
      return {
        title,
        subtitle: batch || '',
        media,
      }
    },
  },
})
