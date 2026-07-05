import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'highlight',
  title: 'Highlight',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Highlight Title',
      type: 'string',
      description: 'പ്രധാന നേട്ടത്തിന്റെ പേര് (e.g. Cleanest Campus Award)',
      validation: (Rule) => Rule.required().error('തലക്കെട്ട് ആവശ്യമാണ് (Title is required)'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'യുആർഎൽ ലിങ്ക് രൂപീകരിക്കാൻ ഉപയോഗിക്കുന്നു (Auto-generate from title.)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug ആവശ്യമാണ് (Slug is required)'),
    }),
    defineField({
      name: 'type',
      title: 'Highlight Type',
      type: 'string',
      description: 'വിഭാഗം (e.g., Award, Milestone, Achievement, Event)',
      validation: (Rule) => Rule.required().error('വിഭാഗം ആവശ്യമാണ് (Highlight type is required)'),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'നേട്ടം ലഭിച്ച അല്ലെങ്കിൽ നടന്ന തീയതി',
      validation: (Rule) => Rule.required().error('തീയതി ആവശ്യമാണ് (Date is required)'),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      description: 'വർഷം (e.g., 2025)',
      validation: (Rule) => Rule.required().integer().min(1982).max(2100).error('വർഷം നൽകുക (Valid year is required)'),
    }),
    defineField({
      name: 'batch',
      title: 'Batch',
      type: 'reference',
      to: [{ type: 'batch' }],
      description: 'ബന്ധപ്പെട്ട ബാച്ച് (Optional batch association)',
    }),
    defineField({
      name: 'relatedProject',
      title: 'Related Project',
      type: 'reference',
      to: [{ type: 'project' }],
      description: 'ബന്ധപ്പെട്ട പ്രോജക്റ്റ് ഉണ്ടെങ്കിൽ ലിങ്ക് ചെയ്യാം (Optional project link)',
    }),
    defineField({
      name: 'relatedCamp',
      title: 'Related Camp',
      type: 'reference',
      to: [{ type: 'camp' }],
      description: 'ബന്ധപ്പെട്ട ക്യാമ്പ് ഉണ്ടെങ്കിൽ ലിങ്ക് ചെയ്യാം (Optional camp link)',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'നേട്ടത്തെക്കുറിച്ചുള്ള ലളിതമായ വിവരണം (Keep it concise, 2-3 sentences)',
      validation: (Rule) => Rule.required().error('വിവരണം നൽകുക (Description is required)'),
    }),
    defineField({
      name: 'image',
      title: 'Highlight Photo',
      type: 'image',
      description: 'പ്രധാന ആകർഷകമായ ഫോട്ടോ. ലാൻഡ്‌സ്‌കേപ്പ് (landscape 16:9) അനുപാതം ശുപാർശ ചെയ്യുന്നു.',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('ചിത്രം നിർബന്ധമാണ് (Highlight photo is required)'),
    }),
    defineField({
      name: 'featured',
      title: 'Is Featured Highlight',
      type: 'boolean',
      description: 'ഹോംപേജിലെ പ്രധാന സ്ലൈഡറിൽ ഇത് കാണിക്കണമെങ്കിൽ ടിക്ക് ചെയ്യുക.',
      initialValue: false,
    }),
    defineField({
      name: 'priority',
      title: 'Priority Weight',
      type: 'number',
      description: 'ക്രമീകരിക്കുന്നതിനുള്ള മുൻഗണന നംബർ (ചെറിയ സംഖ്യ നൽകിയാൽ ആദ്യം കാണിക്കും, e.g. 1, 2, 3...)',
      initialValue: 10,
      validation: (Rule) => Rule.required().min(0).error('മുൻഗണനാ ക്രമം രേഖപ്പെടുത്തുക (Valid priority is required)'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      media: 'image',
    },
    prepare({ title, type, media }) {
      return {
        title: title || 'Untitled Highlight',
        subtitle: type || '',
        media,
      }
    },
  },
})
