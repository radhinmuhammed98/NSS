import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'notice',
  title: 'Notice & Announcement',
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
      title: 'Notice Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date of Issue',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Notice Type',
      type: 'string',
      description: 'e.g. Announcement, Circular, Meeting, General',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description / Content',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attachment',
      title: 'Attachment File (PDF/Image)',
      type: 'file',
      description: 'Optional circular PDF or document to download.',
    }),
    defineField({
      name: 'important',
      title: 'Mark as Important / Urgent',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      important: 'important',
    },
    prepare({ title, date, important }) {
      return {
        title,
        subtitle: `${date || ''} ${important ? '⚠️ IMPORTANT' : ''}`,
      }
    },
  },
})
