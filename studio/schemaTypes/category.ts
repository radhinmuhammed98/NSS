import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Project Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Title',
      type: 'string',
      description: 'പ്രോജക്റ്റ് വിഭാഗം (e.g. Environment, Health, Education, Cleanliness)',
      validation: (Rule) => Rule.required().error('വിഭാഗം പേര് ആവശ്യമാണ് (Category title is required)'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'ലിങ്ക് രൂപീകരിക്കാൻ ഉപയോഗിക്കുന്നു (Auto-generate from title.)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug ആവശ്യമാണ് (Slug is required)'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'ഈ വിഭാഗത്തെക്കുറിച്ചുള്ള വിവരണം (Optional description of projects under this category)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
