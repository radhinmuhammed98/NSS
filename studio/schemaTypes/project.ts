import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
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
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Project Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      description: 'Used for filtering/sorting',
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
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Completed', value: 'completed' },
          { title: 'Ongoing', value: 'ongoing' },
          { title: 'Planned', value: 'planned' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 2,
      description: 'Brief overview for project cards',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Detailed Description',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'problemAddressed',
      title: 'Problem Addressed',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whatNssDid',
      title: 'What NSS Did',
      type: 'text',
      rows: 4,
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
      name: 'images',
      title: 'Project Gallery / Additional Photos',
      type: 'array',
      of: [{ type: 'imageAsset' }],
    }),
    defineField({
      name: 'impactMetrics',
      title: 'Project Impact Metrics',
      type: 'array',
      of: [{ type: 'impactMetric' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relatedCamp',
      title: 'Related Camp',
      type: 'reference',
      to: [{ type: 'camp' }],
      description: 'Select if this project was done as part of a Seven-Day Special Camp',
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
      name: 'organizers',
      title: 'Organizers / Coordinators',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'campRelated',
      title: 'Camp Related',
      type: 'boolean',
      description: 'Check if this project is camp-related (e.g. executed during camp)',
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
