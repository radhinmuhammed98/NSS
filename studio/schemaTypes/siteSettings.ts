import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'schoolName',
      title: 'School Name',
      type: 'string',
      description: 'The full name of the school.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'unitName',
      title: 'NSS Unit Name',
      type: 'string',
      description: 'e.g., NSS Unit 466',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'schoolAddress',
      title: 'School Address',
      type: 'text',
      description: 'The physical address of the school.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Contact Phone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'schoolLogo',
      title: 'School Logo',
      type: 'image',
      description: 'Upload the official school logo.',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nssLogo',
      title: 'NSS Logo',
      type: 'image',
      description: 'Upload the official NSS logo.',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'principal',
      title: 'Principal Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'programmeOfficer',
      title: 'Programme Officer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'volunteerStrength',
      title: 'Total Volunteer Strength',
      type: 'number',
      description: 'Number of active volunteers (e.g., 100).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'footerDescription',
      title: 'Footer Text',
      type: 'text',
      description: 'A short sentence shown at the bottom of every page.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'motto',
      title: 'Motto',
      type: 'string',
      description: 'e.g., Not Me But You',
      initialValue: 'Not Me But You',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});
