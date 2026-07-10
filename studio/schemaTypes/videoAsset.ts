import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'videoAsset',
  title: 'Video Asset',
  type: 'object',
  fields: [
    defineField({
      name: 'video',
      title: 'Upload Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Upload your video directly here. (Max limit usually ~100MB depending on your Sanity plan)',
    }),
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image (Optional)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Untitled Video',
        media: selection.media,
      }
    }
  },
})
