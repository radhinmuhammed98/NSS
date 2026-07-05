import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'camp',
  title: 'Camp',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Details (അടിസ്ഥാന വിവരങ്ങൾ)' },
    { name: 'content', title: 'Content & Schedule (വിവരണങ്ങൾ)' },
    { name: 'media', title: 'Media & Impact (ചിത്രങ്ങൾ)' },
    { name: 'links', title: 'Relationships (ബന്ധപ്പെട്ട ലിങ്കുകൾ)' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Camp Title',
      type: 'string',
      description: 'പ്രത്യേക ക്യാമ്പിന്റെ പേര് (e.g. Seven-Day Special Camp 2025)',
      group: 'basic',
      validation: (Rule) => Rule.required().error('ക്യാമ്പ് ടൈറ്റിൽ ആവശ്യമാണ് (Camp title is required)'),
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
      group: 'basic',
      validation: (Rule) => Rule.required().error('Slug ആവശ്യമാണ് (Slug is required)'),
    }),
    defineField({
      name: 'year',
      title: 'Camp Year',
      type: 'number',
      description: 'ക്യാമ്പ് നടന്ന വർഷം (e.g., 2025)',
      group: 'basic',
      validation: (Rule) => Rule.required().integer().min(1982).max(2100).error('സാധുവായ വർഷം നൽകുക (Valid year is required)'),
    }),
    defineField({
      name: 'batch',
      title: 'Batch',
      type: 'reference',
      to: [{ type: 'batch' }],
      description: 'ക്യാമ്പ് സംഘടിപ്പിച്ച ബാച്ച് (Select the batch that hosted this camp)',
      group: 'basic',
      validation: (Rule) => Rule.required().error('ബാച്ച് തിരഞ്ഞെടുക്കുക (Batch is required)'),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'ക്യാമ്പ് നടന്ന സ്കൂൾ അല്ലെങ്കിൽ പ്രദേശം (e.g., GMLPS Valakkulam)',
      group: 'basic',
      validation: (Rule) => Rule.required().error('സ്ഥലം നൽകുക (Location is required)'),
    }),
    defineField({
      name: 'theme',
      title: 'Camp Theme',
      type: 'string',
      description: 'ക്യാമ്പ് സന്ദേശം / തീം (e.g. Healthy Youth for Healthy India)',
      group: 'basic',
      validation: (Rule) => Rule.required().error('തീം നൽകുക (Theme is required)'),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      description: 'ക്യാമ്പ് ആരംഭിച്ച തീയതി',
      group: 'basic',
      validation: (Rule) => Rule.required().error('ആരംഭ തീയതി ആവശ്യമാണ് (Start date is required)'),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'ക്യാമ്പ് അവസാനിച്ച തീയതി',
      group: 'basic',
      validation: (Rule) =>
        Rule.required()
          .error('അവസാന തീയതി ആവശ്യമാണ് (End date is required)')
          .custom((endDate, context) => {
            const document = context.document as { startDate?: string }
            if (document?.startDate && endDate && new Date(endDate) < new Date(document.startDate)) {
              return 'അവസാന തീയതി ആരംഭ തീയതിക്ക് ശേഷമായിരിക്കണം. (End date cannot be before start date.)'
            }
            return true
          }),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 2,
      description: 'ക്യാമ്പ് കാർഡുകൾക്കായി ഒരു ലളിതമായ ചെറു വിവരണം (Brief summary for cards)',
      group: 'content',
      validation: (Rule) => Rule.required().max(200).error('ചെറു വിവരണം ആവശ്യമാണ്, പരമാവധി 200 അക്ഷരങ്ങൾ (Summary is required, max 200 chars)'),
    }),
    defineField({
      name: 'description',
      title: 'Detailed Description',
      type: 'text',
      rows: 5,
      description: 'ക്യാമ്പിനെക്കുറിച്ചുള്ള വിശദമായ വിവരണം (Detailed description of the 7 days)',
      group: 'content',
      validation: (Rule) => Rule.required().error('വിശദ വിവരണം ആവശ്യമാണ് (Detailed description is required)'),
    }),
    defineField({
      name: 'programmeOfficer',
      title: 'Programme Officer',
      type: 'string',
      description: 'ക്യാമ്പ് നയിച്ച പ്രോഗ്രാം ഓഫീസർ',
      group: 'content',
      validation: (Rule) => Rule.required().error('പ്രോഗ്രാം ഓഫീസറുടെ പേര് ആവശ്യമാണ് (Programme Officer name is required)'),
    }),
    defineField({
      name: 'campLeaders',
      title: 'Camp Leaders',
      type: 'array',
      description: 'ക്യാമ്പ് വളന്റിയർ ലീഡർമാർ (e.g. Volunteer Captains)',
      of: [{ type: 'string' }],
      group: 'content',
      validation: (Rule) => Rule.required().min(1).error('കുറഞ്ഞത് ഒരു ലീഡറുടെയെങ്കിലും പേര് ചേർക്കുക (At least 1 camp leader is required)'),
    }),
    defineField({
      name: 'volunteerCount',
      title: 'Volunteer Count',
      type: 'number',
      description: 'ക്യാമ്പിൽ പങ്കെടുത്ത ആകെ വളന്റിയർമാർ (Total volunteers in attendance)',
      group: 'content',
      validation: (Rule) => Rule.required().min(1).error('വളന്റിയർമാരുടെ എണ്ണം നൽകുക (Volunteer count is required)'),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'ക്യാമ്പ് ഗ്രൂപ്പ് ഫോട്ടോ. ലാൻഡ്‌സ്‌കേപ്പ് (landscape 16:9) അനുപാതം നിർബന്ധമാണ്.',
      options: {
        hotspot: true,
      },
      group: 'media',
      validation: (Rule) => Rule.required().error('കവർ ചിത്രം നിർബന്ധമാണ് (Cover image is required)'),
    }),
    defineField({
      name: 'dayWiseActivities',
      title: 'Day-Wise Schedule / Activities',
      type: 'array',
      description: '7 ദിവസങ്ങളിലെ പ്രവർത്തനങ്ങൾ ഓരോന്നായി ചേർക്കുക (Add schedule for each of the 7 days)',
      of: [{ type: 'campDay' }],
      group: 'content',
      validation: (Rule) => Rule.required().min(1).error('കുറഞ്ഞത് ഒരു ദിവസത്തെ വിവരമെങ്കിലും ചേർക്കുക (At least 1 day-wise activity is required)'),
    }),
    defineField({
      name: 'projects',
      title: 'Related Projects',
      type: 'array',
      description: 'ഈ ക്യാമ്പിൽ വെച്ച് ചെയ്ത പ്രോജക്റ്റുകൾ ഉണ്ടെങ്കിൽ ഇവിടെ ലിങ്ക് ചെയ്യാം (Link projects done during this camp)',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
      group: 'links',
    }),
    defineField({
      name: 'impactMetrics',
      title: 'Camp Impact Metrics',
      type: 'array',
      description: 'ക്യാമ്പ് വഴി നേടിയ പ്രധാന ലക്ഷ്യങ്ങളുടെ കണക്കുകൾ (e.g. 1 Asset Created, 100 Trees Planted)',
      of: [{ type: 'impactMetric' }],
      group: 'media',
      validation: (Rule) => Rule.required().min(1).error('കുറഞ്ഞത് ഒരു ഇംപാക്ട് മെട്രിക് എങ്കിലും ചേർക്കുക (At least 1 impact metric is required)'),
    }),
    defineField({
      name: 'reports',
      title: 'Related Reports',
      type: 'array',
      description: 'ഈ ക്യാമ്പുമായി ബന്ധപ്പെട്ട പിഡിഎഫ് റിപ്പോർട്ടുകൾ (Associated official reports)',
      of: [{ type: 'reference', to: [{ type: 'report' }] }],
      group: 'links',
    }),
    defineField({
      name: 'highlights',
      title: 'Related Highlights',
      type: 'array',
      description: 'ക്യാമ്പിൽ നിന്നുള്ള പ്രധാന ഫീച്ചറുകൾ',
      of: [{ type: 'reference', to: [{ type: 'highlight' }] }],
      group: 'links',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Camp',
      type: 'boolean',
      description: 'ഇത് ഹോംപേജിൽ കാണിക്കേണ്ട പ്രധാന ക്യാമ്പാണെങ്കിൽ ടിക്ക് ചെയ്യുക.',
      initialValue: false,
      group: 'basic',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      startDate: 'startDate',
      endDate: 'endDate',
      media: 'coverImage',
    },
    prepare({ title, startDate, endDate, media }) {
      const start = startDate ? new Date(startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : ''
      const end = endDate ? new Date(endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''
      const subtitle = start && end ? `${start} – ${end}` : (start || end || '')
      return {
        title: title || 'Untitled Camp',
        subtitle,
        media,
      }
    },
  },
})
