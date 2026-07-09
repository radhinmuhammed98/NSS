import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'imageAsset',
  title: 'Image Asset',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image File',
      type: 'image',
      options: {
        hotspot: true,
      },
      
    }),
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'Important for accessibility and SEO.',
      
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'credit',
      title: 'Photo Credit',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'image',
    },
  },
})
