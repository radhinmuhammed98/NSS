import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'The main big text shown at the top of the homepage.',
      placeholder: 'e.g., Empowering Youth, Serving Community',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      description: 'A short paragraph under the main title.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'The large background or main photo for the top section.',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'servicePillars',
      title: 'Three Service Pillars',
      type: 'array',
      description: 'Add exactly three main pillars or focus areas (e.g., Community Health, Education, Environment).',
      validation: (Rule) => Rule.required().min(3).max(3),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Pillar Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Material Icon Name',
              type: 'string',
              description: 'e.g., "favorite", "school", "eco"',
            }),
          ]
        }
      ]
    }),
    defineField({
      name: 'featuredProject',
      title: 'Featured Project',
      type: 'reference',
      to: [{ type: 'project' }],
      description: 'Select one project to highlight on the homepage.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredCamp',
      title: 'Featured Camp',
      type: 'reference',
      to: [{ type: 'camp' }],
      description: 'Select one camp to highlight on the homepage.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredGallery',
      title: 'Featured Gallery Album',
      type: 'reference',
      to: [{ type: 'galleryAlbum' }],
      description: 'Select one photo album to show on the homepage.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
    },
    prepare() {
      return {
        title: 'Home Page Configuration',
      };
    },
  },
});
