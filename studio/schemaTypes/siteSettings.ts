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
      
    }),
    defineField({
      name: 'unitName',
      title: 'NSS Unit Name',
      type: 'string',
      description: 'e.g., NSS Unit 466',
      
    }),
    defineField({
      name: 'schoolAddress',
      title: 'School Address',
      type: 'text',
      description: 'The physical address of the school.',
      
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Contact Phone',
      type: 'string',
      
    }),
    defineField({
      name: 'schoolLogo',
      title: 'School Logo',
      type: 'image',
      description: 'Upload the official school logo.',
      options: { hotspot: true },
      
    }),
    defineField({
      name: 'nssLogo',
      title: 'NSS Logo',
      type: 'image',
      description: 'Upload the official NSS logo.',
      options: { hotspot: true },
      
    }),
    defineField({
      name: 'principal',
      title: 'Principal Name',
      type: 'string',
      
    }),
    defineField({
      name: 'programmeOfficer',
      title: 'Programme Officer Name',
      type: 'string',
      
    }),
    defineField({
      name: 'volunteerStrength',
      title: 'Total Volunteer Strength',
      type: 'number',
      description: 'Number of active volunteers (e.g., 100).',
      
    }),
    defineField({
      name: 'footerDescription',
      title: 'Footer Text',
      type: 'text',
      description: 'A short sentence shown at the bottom of every page.',
      
    }),
    defineField({
      name: 'motto',
      title: 'Motto',
      type: 'string',
      description: 'e.g., Not Me But You',
      initialValue: 'Not Me But You',
      
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
