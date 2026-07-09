import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  groups: [
    { name: 'about', title: 'About Content (വിവരണങ്ങൾ)' },
  ],
  fields: [
    defineField({
      name: 'mission',
      title: 'Mission Statement',
      type: 'text',
      rows: 3,
      description: 'ലക്ഷ്യ പ്രഖ്യാപനം (Our mission. Keep it under 3-4 sentences.)',
      group: 'about',
      validation: (Rule) => Rule.error('മിഷൻ വിവരണം നിർബന്ധമാണ് (Mission statement is required)'),
    }),
    defineField({
      name: 'vision',
      title: 'Vision Statement',
      type: 'text',
      rows: 3,
      description: 'വിഷൻ വിവരണം (Our vision. Keep it under 3-4 sentences.)',
      group: 'about',
      validation: (Rule) => Rule.error('വിഷൻ വിവരണം നിർബന്ധമാണ് (Vision statement is required)'),
    }),
    defineField({
      name: 'objectives',
      title: 'Objectives',
      type: 'array',
      description: 'യൂണിറ്റിന്റെ പ്രധാന ലക്ഷ്യങ്ങൾ (List at least 1 objective)',
      of: [{ type: 'string' }],
      group: 'about',
      validation: (Rule) => Rule.min(1).error('കുറഞ്ഞത് ഒരു ലക്ഷ്യമെങ്കിലും നൽകുക (At least 1 objective is required)'),
    }),
    defineField({
      name: 'history',
      title: 'Unit History / Background',
      type: 'text',
      rows: 8,
      description: 'യൂണിറ്റിന്റെ ചരിത്രവും പശ്ചാത്തലവും (Detailed history of our NSS unit)',
      group: 'about',
      validation: (Rule) => Rule.error('യൂണിറ്റ് ചരിത്രം നിർബന്ധമാണ് (Unit history is required)'),
    }),
    defineField({
      name: 'achievements',
      title: 'Key Historical Achievements',
      type: 'array',
      description: 'പ്രധാന നേട്ടങ്ങൾ (Key historic achievements or awards)',
      of: [{ type: 'string' }],
      group: 'about',
      validation: (Rule) => Rule.min(1).error('കുറഞ്ഞത് ഒരു നേട്ടമെങ്കിലും നൽകുക (At least 1 achievement is required)'),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page Configuration',
      }
    },
  },
})
