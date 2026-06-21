import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'volunteerStory',
  title: 'Volunteer Story',
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
      name: 'name',
      title: 'Volunteer Name',
      type: 'string',
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
      name: 'photo',
      title: 'Volunteer Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Highlight Quote',
      type: 'string',
      description: 'A key sentence from the story to display as a pull quote',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Story Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'story',
      title: 'The Full Story',
      type: 'text',
      rows: 8,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relatedProject',
      title: 'Related Project',
      type: 'reference',
      to: [{ type: 'project' }],
      description: 'Optional project association',
    }),
    defineField({
      name: 'relatedCamp',
      title: 'Related Camp',
      type: 'reference',
      to: [{ type: 'camp' }],
      description: 'Optional camp association',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Story',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      name: 'name',
      batch: 'batch.title',
      media: 'photo',
    },
    prepare({ title, name, batch, media }) {
      return {
        title,
        subtitle: `By ${name || ''} ${batch ? `(${batch})` : ''}`,
        media,
      }
    },
  },
})
