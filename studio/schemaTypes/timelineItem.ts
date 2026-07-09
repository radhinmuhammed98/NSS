import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'timelineItem',
  title: 'Journey Milestone / Timeline Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Milestone Title',
      type: 'string',
      description: 'പ്രധാന നാഴികക്കല്ലിന്റെ വിഷയം (e.g. Unit 466 Founded or National Level Special Award)',
      validation: (Rule) => Rule.error('തലക്കെട്ട് ആവശ്യമാണ് (Title is required)'),
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
      validation: (Rule) => Rule.error('Slug ആവശ്യമാണ് (Slug is required)'),
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'date',
      description: 'നാഴികക്കല്ല് രൂപപ്പെട്ട തീയതി (Milestone date)',
      validation: (Rule) => Rule.error('തീയതി ആവശ്യമാണ് (Date is required)'),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      description: 'നാഴികക്കല്ല് നടന്ന വർഷം (e.g., 2025)',
      validation: (Rule) => Rule.integer().min(1980).max(2100).error('വർഷം ആവശ്യമാണ് (Valid year is required)'),
    }),
    defineField({
      name: 'type',
      title: 'Milestone Type',
      type: 'string',
      description: 'വിഭാഗം (e.g. Unit Founded, National Award, Website Launch, Camp Achievement)',
      validation: (Rule) => Rule.error('നാഴികക്കല്ല് വിഭാഗം ആവശ്യമാണ് (Milestone type is required)'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'നാഴികക്കല്ലിന്റെ വിശദ വിവരണം (A brief history/context of this milestone)',
      validation: (Rule) => Rule.error('വിവരണം ആവശ്യമാണ് (Description is required)'),
    }),
    defineField({
      name: 'image',
      title: 'Milestone Image',
      type: 'image',
      description: 'ബന്ധപ്പെട്ട പ്രധാന ചിത്രം ഉണ്ടെങ്കിൽ അപ്ലോഡ് ചെയ്യാം (Optional historical photo)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'importance',
      title: 'Importance / Significance Level',
      type: 'string',
      options: {
        list: [
          { title: 'High (പ്രധാന നാഴികക്കല്ലുകൾ)', value: 'high' },
          { title: 'Medium (സാധാരണ നേട്ടങ്ങൾ)', value: 'medium' },
          { title: 'Low (ചെറിയ അപ്‌ഡേറ്റുകൾ)', value: 'low' },
        ],
      },
      initialValue: 'medium',
      validation: (Rule) => Rule.error('പ്രാധാന്യ നില തിരഞ്ഞെടുക്കുക (Significance level is required)'),
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
        title: title || 'Untitled Milestone',
        subtitle: type || '',
        media,
      }
    },
  },
})
