import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'The full name of the team member.',
      placeholder: 'e.g., John Doe',
      
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'Their position in NSS.',
      placeholder: 'e.g., Programme Officer, Volunteer Secretary',
      
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      description: 'A clear photo of the person.',
      options: { hotspot: true },
      validation: (Rule) => Rule.optional(),
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
    }),
    defineField({
      name: 'batch',
      title: 'Batch (Optional)',
      type: 'reference',
      to: [{ type: 'batch' }],
      description: 'Which batch does this team member belong to? Used to filter the Team page automatically.',
    }),
    defineField({
      name: 'bio',
      title: 'Bio (Optional)',
      type: 'text',
      description: 'A short paragraph about them.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      batch: 'batch.title',
      media: 'photo',
    },
    prepare({ title, subtitle, batch, media }) {
      return {
        title,
        subtitle: batch ? `${subtitle} · ${batch}` : subtitle,
        media,
      };
    },
  },
});
