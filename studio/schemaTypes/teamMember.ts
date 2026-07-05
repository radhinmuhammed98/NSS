import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      description: 'അംഗത്തിന്റെ മുഴുവൻ പേര്',
      validation: (Rule) => Rule.required().error('പേര് നൽകുക (Full name is required)'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'ലിങ്ക് രൂപീകരിക്കാൻ ഉപയോഗിക്കുന്നു (Auto-generate from name.)',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug ആവശ്യമാണ് (Slug is required)'),
    }),
    defineField({
      name: 'role',
      title: 'Role / Designation',
      type: 'string',
      description: 'പദവി (e.g. Programme Officer, Volunteer Secretary, Group Leader)',
      validation: (Rule) => Rule.required().error('പദവി രേഖപ്പെടുത്തുക (Role is required)'),
    }),
    defineField({
      name: 'batch',
      title: 'Batch',
      type: 'reference',
      to: [{ type: 'batch' }],
      description: 'അംഗം ഉൾപ്പെടുന്ന ബാച്ച് (Select the batch this member belongs to)',
      validation: (Rule) => Rule.required().error('ബാച്ച് തിരഞ്ഞെടുക്കുക (Batch is required)'),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      description: 'അംഗത്തിന്റെ ഫോട്ടോ. പോർട്രെയ്റ്റ് (portrait 3:4) അനുപാതവും നല്ല വെളിച്ചമുള്ളതുമായ ചിത്രം തിരഞ്ഞെടുക്കുക.',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('ഫോട്ടോ അപ്ലോഡ് ചെയ്യേണ്ടതുണ്ട് (Photo is required)'),
    }),
    defineField({
      name: 'bio',
      title: 'Bio / Short Description',
      type: 'text',
      rows: 3,
      description: 'അംഗത്തെക്കുറിച്ചുള്ള ലഘു വിവരണം (A short bio or description)',
      validation: (Rule) => Rule.required().error('ലഘു വിവരണം നൽകുക (Bio is required)'),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'പ്രദർശിപ്പിക്കുന്ന ക്രമം (e.g. 1 for PO, 2 for VS, 3 for Leaders). ചെറിയ സംഖ്യകൾ ആദ്യം വരും.',
      initialValue: 10,
      validation: (Rule) => Rule.required().min(0).error('മുൻഗണനാ ക്രമം ആവശ്യമാണ് (Valid display order is required)'),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      role: 'role',
      batch: 'batch.title',
      media: 'photo',
    },
    prepare({ title, role, batch, media }) {
      return {
        title: title || 'Untitled Member',
        subtitle: `${role || ''} ${batch ? `(${batch})` : ''}`,
        media,
      }
    },
  },
})
