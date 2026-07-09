import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'camp',
  title: 'Special Camp / സ്പെഷ്യൽ ക്യാമ്പ്',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info / അടിസ്ഥാന വിവരങ്ങൾ', default: true },
    { name: 'photos', title: 'Photos / ചിത്രങ്ങൾ' },
    { name: 'whatHappened', title: 'What Happened / വിവരണം' },
    { name: 'guests', title: 'Guests & Leadership / നേതൃത്വവും അതിഥികളും' },
    { name: 'impact', title: 'Impact / സ്വാധീനം' },
    { name: 'optional', title: 'Optional Extras / മറ്റ് വിവരങ്ങൾ' },
    { name: 'advanced', title: 'Advanced / കൂടുതൽ വിവരങ്ങൾ' },
  ],
  fields: [
    // --- BASIC INFORMATION ---
    defineField({
      name: 'title',
      title: 'Camp Title / ക്യാമ്പ് നാമം',
      type: 'string',
      description: 'The name of the camp. / ക്യാമ്പിന്റെ പേര് നൽകുക.',
      placeholder: 'e.g., Annual Special Camp 2026 / ഉദാ: വാർഷിക സ്പെഷ്യൽ ക്യാമ്പ് 2026',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Start Date / ആരംഭ തീയതി',
      type: 'date',
      description: 'When did the camp start? / ക്യാമ്പ് ആരംഭിച്ച തീയതി.',
      group: 'basic',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date / അവസാന തീയതി',
      type: 'date',
      description: 'When did the camp end? / ക്യാമ്പ് അവസാനിച്ച തീയതി.',
      group: 'basic',
    }),
    defineField({
      name: 'batch',
      title: 'Academic Batch / അക്കാദമിക് ബാച്ച്',
      type: 'reference',
      to: [{ type: 'batch' }],
      description: 'Which batch conducted this camp? (Auto-filled) / ഏത് ബാച്ചിന്റെ കീഴിലാണ് ഈ ക്യാമ്പ് സംഘടിപ്പിച്ചത്?',
      group: 'basic',
    }),
    defineField({
      name: 'location',
      title: 'Camp Location / ക്യാമ്പ് നടന്ന സ്ഥലം',
      type: 'string',
      description: 'Where was the camp held? / ക്യാമ്പ് എവിടെയാണ് നടന്നത്?',
      placeholder: 'e.g., Govt. UP School, Valakkulam / ഉദാ: ഗവ. യു.പി. സ്കൂൾ, വളാഞ്ചേരി',
      group: 'basic',
    }),
    defineField({
      name: 'theme',
      title: 'Camp Theme / ക്യാമ്പ് പ്രമേയം',
      type: 'string',
      description: 'The official theme or motto of the camp. / ക്യാമ്പിന്റെ ഔദ്യോഗിക പ്രമേയം.',
      placeholder: 'e.g., Youth for Clean India / ഉദാ: മാലിന്യമുക്ത ഭാരതത്തിനായി യുവത്വം',
      group: 'basic',
    }),

    // --- PHOTOS ---
    defineField({
      name: 'coverImage',
      title: 'Camp Cover Photo / പ്രധാന കവർ ചിത്രം',
      type: 'image',
      description: '⚠️ Upload the main cover photo for the camp. / ഈ ക്യാമ്പിനെ പ്രതിനിധീകരിക്കുന്ന പ്രധാന ഫോട്ടോ.',
      options: { hotspot: true },
      group: 'photos',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text / ചിത്രത്തിന്റെ വിവരണം',
          description: 'A brief description of the photo for screen readers. / ചിത്രത്തെക്കുറിച്ചുള്ള ഒരു ചെറിയ വിവരണം.',
        })
      ],
    }),

    // --- WHAT HAPPENED ---
    defineField({
      name: 'description',
      title: 'Camp Overview & Summary / ക്യാമ്പ് വിവരണം',
      type: 'text',
      rows: 6,
      description: 'Write a general summary of the camp. What was the main focus? / ക്യാമ്പിന്റെ പൊതുവായ വിവരണം എഴുതുക.',
      group: 'whatHappened',
    }),
    defineField({
      name: 'campDiary',
      title: 'Camp Diary (Day-by-Day) / ക്യാമ്പ് ഡയറി (ദിവസേനയുള്ള വിവരങ്ങൾ)',
      type: 'array',
      of: [{ type: 'campDay' }],
      description: 'Add day-by-day activities here. Drag to reorder. / ദിവസേനയുള്ള പ്രവർത്തനങ്ങൾ ഓരോന്നായി ചേർക്കുക.',
      group: 'whatHappened',
    }),

    // --- GUESTS & LEADERSHIP ---
    defineField({
      name: 'programmeOfficer',
      title: 'Programme Officer / പ്രോഗ്രാം ഓഫീസർ',
      type: 'string',
      description: 'Name of the NSS Programme Officer. / പ്രോഗ്രാം ഓഫീസറുടെ പേര് ചേർക്കുക.',
      group: 'guests',
    }),
    defineField({
      name: 'campLeaders',
      title: 'Camp Leaders / ക്യാമ്പ് ലീഡർമാർ',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add the names of camp leaders or volunteer secretaries. / വോളന്റിയർ സെക്രട്ടറിമാർ അഥവാ ക്യാമ്പ് ലീഡർമാരുടെ പേരുകൾ.',
      group: 'guests',
    }),
    defineField({
      name: 'volunteerCount',
      title: 'Total Volunteers / ആകെ വോളന്റിയർമാർ',
      type: 'number',
      description: 'Number of volunteers who participated in this camp. / ക്യാമ്പിൽ പങ്കെടുത്ത വോളന്റിയർമാരുടെ എണ്ണം.',
      group: 'guests',
    }),

    // --- IMPACT ---
    defineField({
      name: 'impactMetrics',
      title: 'Camp Impact / ക്യാമ്പിന്റെ സ്വാധീന അളവുകൾ',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'impactMetric',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Label / അളവ് നാമം' }),
            defineField({ name: 'value', type: 'string', title: 'Value / അളവ് മൂല്യം' })
          ]
        }
      ],
      description: 'Metrics like "Trees Planted: 100" or "Houses Renovated: 2". / ക്യാമ്പ് വഴിയുണ്ടായ പ്രധാന മാറ്റങ്ങൾ അക്കങ്ങളിൽ ചേർക്കുക.',
      group: 'impact',
    }),

    // --- OPTIONAL EXTRAS ---
    defineField({
      name: 'projects',
      title: 'Camp Projects / ക്യാമ്പ് പ്രോജക്റ്റുകൾ',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
      description: 'Select projects conducted during this camp. / ഈ ക്യാമ്പിൽ ചെയ്ത പദ്ധതികൾ തിരഞ്ഞെടുക്കുക.',
      group: 'optional',
    }),
    defineField({
      name: 'reports',
      title: 'Linked Reports / റിപ്പോർട്ടുകൾ',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'report' }] }],
      group: 'optional',
    }),
    defineField({
      name: 'highlights',
      title: 'Linked Highlights / ഹൈലൈറ്റുകൾ',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'highlight' }] }],
      group: 'optional',
    }),

    // --- ADVANCED ---
    defineField({
      name: 'slug',
      title: 'Web Link (Slug) / വെബ് വിലാസം',
      type: 'slug',
      description: 'Auto-generate from the title. Hidden from basic view. / തലക്കെട്ടിൽ നിന്ന് ഇത് സ്വയമേവ നിർമ്മിക്കാൻ "Generate" ക്ലിക്ക് ചെയ്യുക.',
      options: { source: 'title', maxLength: 96 },
      group: 'advanced',
    }),
    defineField({
      name: 'year',
      title: 'Camp Year / ക്യാമ്പ് വർഷം',
      type: 'number',
      description: 'The year when this camp was conducted. (Auto-filled) / ക്യാമ്പ് നടന്ന വർഷം.',
      group: 'advanced',
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage? / ഹോംപേജിൽ പ്രദർശിപ്പിക്കണോ?',
      type: 'boolean',
      description: 'Showcase this camp on the home page. / വെബ്സൈറ്റിന്റെ പ്രധാന പേജിൽ കാണിക്കാൻ ഇത് ഓൺ ചെയ്യുക.',
      group: 'advanced',
    }),
  ],
  initialValue: {
    featured: false,
    campDiary: [
      {
        _type: 'campDay',
        dayNumber: 1,
        title: 'Day 1',
        description: '',
        activities: [],
        guests: [],
        images: []
      }
    ],
    projects: [],
    impactMetrics: [],
    reports: [],
    highlights: [],
    campLeaders: []
  },
  preview: {
    select: {
      title: 'title',
      date: 'date',
      location: 'location',
      media: 'coverImage',
    },
    prepare(selection) {
      const { title, date, location, media } = selection;
      const dateStr = date ? new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'No Date';
      return {
        title: title || 'Untitled Camp',
        subtitle: `${dateStr} | ${location || 'No Location'}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
});
