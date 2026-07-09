import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project / പ്രോജക്റ്റ്',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info / അടിസ്ഥാന വിവരങ്ങൾ', default: true },
    { name: 'photos', title: 'Photos / ചിത്രങ്ങൾ' },
    { name: 'whatHappened', title: 'What Happened / വിവരണം' },
    { name: 'guests', title: 'Guests & Organizers / അതിഥികളും സംഘാടകരും' },
    { name: 'impact', title: 'Impact / സ്വാധീനം' },
    { name: 'optional', title: 'Optional Extras / മറ്റ് വിവരങ്ങൾ' },
    { name: 'advanced', title: 'Advanced / കൂടുതൽ വിവരങ്ങൾ' },
  ],
  fields: [
    // --- BASIC INFORMATION ---
    defineField({
      name: 'title',
      title: 'Project Title / പ്രോജക്റ്റ് നാമം',
      type: 'string',
      description: 'The name of the community service or project. / ഈ പദ്ധതിയുടെ പേര് നൽകുക.',
      placeholder: 'e.g., Snehaveedu Construction / ഉദാ: സ്നേഹവീട് നിർമ്മാണം',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date / തീയതി',
      type: 'date',
      description: 'When did this project happen? / ഈ പദ്ധതി നടന്ന തീയതി.',
      group: 'basic',
    }),
    defineField({
      name: 'batch',
      title: 'Academic Batch / അക്കാദമിക് ബാച്ച്',
      type: 'reference',
      to: [{ type: 'batch' }],
      description: 'Which batch conducted this project? (Auto-filled) / ഏത് ബാച്ചിന്റെ കീഴിലാണ് ഇത് ചെയ്തത്?',
      group: 'basic',
    }),
    defineField({
      name: 'category',
      title: 'Category / വിഭാഗം',
      type: 'string',
      description: 'Select the main focus area of the project. / ഈ പദ്ധതിയുടെ പ്രധാന പ്രവർത്തന മേഖല തിരഞ്ഞെടുക്കുക.',
      group: 'basic',
      options: {
        list: [
          "Environment",
          "Health",
          "Education",
          "Anti-Drug Awareness",
          "Road Safety",
          "Blood Donation",
          "Palliative Care",
          "Community Cleaning",
          "Disaster Relief",
          "Digital Literacy",
          "School Development",
          "Charity",
          "Social Survey",
          "Women Empowerment",
          "Special Camp Activity",
          "Other",
        ]
      },
    }),
    defineField({
      name: 'status',
      title: 'Status / പദ്ധതിയുടെ നിലവിലെ അവസ്ഥ',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'Completed / പൂർത്തിയായി', value: 'completed' },
          { title: 'Ongoing / നടന്നു കൊണ്ടിരിക്കുന്നു', value: 'ongoing' },
          { title: 'Planned / വിഭാവനം ചെയ്തത്', value: 'planned' },
        ],
        layout: 'radio'
      },
    }),
    defineField({
      name: 'location',
      title: 'Location / സ്ഥലം',
      type: 'string',
      description: 'Where did this project take place? / ഇത് എവിടെയാണ് നടന്നത്?',
      placeholder: 'e.g., Valakkulam Ward 4 / ഉദാ: വളാഞ്ചേരി വാർഡ് 4',
      group: 'basic',
    }),

    // --- PHOTOS ---
    defineField({
      name: 'coverImage',
      title: 'Main Cover Photo / പ്രധാന കവർ ചിത്രം',
      type: 'image',
      description: '⚠️ Upload the main photo to show on the website. You can drag & drop. / വെബ്സൈറ്റിൽ കാണിക്കുന്ന പ്രധാന കവർ ചിത്രം.',
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
    defineField({
      name: 'images',
      title: 'Additional Photos / കൂടുതൽ ചിത്രങ്ങൾ',
      type: 'array',
      of: [{ type: 'imageAsset' }],
      description: 'Add more photos from the project. Drag to reorder. / ഈ പദ്ധതിയുടെ മറ്റ് ചിത്രങ്ങൾ ചേർക്കുക.',
      group: 'photos',
    }),

    // --- WHAT HAPPENED ---
    defineField({
      name: 'description',
      title: 'What happened during this activity? / ഈ പ്രവർത്തനത്തിൽ എന്താണ് സംഭവിച്ചത്?',
      type: 'text',
      rows: 6,
      description: 'Write a full summary about the project. / നടന്ന കാര്യങ്ങൾ വിവരിച്ചുകൊണ്ട് ലളിതമായി എഴുതുക.',
      group: 'whatHappened',
    }),
    defineField({
      name: 'problemAddressed',
      title: 'What issue was the community facing? / സമൂഹം നേരിട്ട പ്രശ്നം എന്തായിരുന്നു?',
      type: 'text',
      rows: 4,
      description: 'Explain the problem you set out to solve. / പരിഹരിക്കാൻ ശ്രമിച്ച പ്രശ്നം എന്താണെന്ന് വിശദീകരിക്കുക.',
      group: 'whatHappened',
    }),
    defineField({
      name: 'whatNssDid',
      title: 'What did the NSS volunteers do to resolve the issue? / ഈ പ്രശ്നം പരിഹരിക്കാൻ NSS വോളന്റിയർമാർ എന്താണ് ചെയ്തത്?',
      type: 'text',
      rows: 4,
      description: 'Explain the action taken by NSS volunteers. / വോളന്റിയർമാർ ചെയ്ത പ്രവർത്തനങ്ങൾ വിശദീകരിക്കുക.',
      group: 'whatHappened',
    }),

    // --- GUESTS & ORGANIZERS ---
    defineField({
      name: 'organizers',
      title: 'Organizers & Key Guests / സംഘാടകരും മുഖ്യാതിഥികളും',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add the names of organizers, resource persons, or guest organizations. / സംഘാടകരുടെയോ അതിഥികളുടെയോ പേരുകൾ ചേർക്കുക.',
      group: 'guests',
    }),

    // --- IMPACT ---
    defineField({
      name: 'impactMetrics',
      title: 'Key Impact Numbers / പ്രധാന സ്വാധീന അളവുകൾ',
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
      description: 'Add metrics like "Beneficiaries: 50" or "Hours: 10". / ഉദാഹരണത്തിന് "ഗുണഭോക്താക്കൾ: 50" എന്ന് ചേർക്കുക.',
      group: 'impact',
    }),

    // --- OPTIONAL EXTRAS ---
    defineField({
      name: 'campRelated',
      title: 'Part of a Special Camp? / ഏഴ് ദിവസത്തെ സ്പെഷ്യൽ ക്യാമ്പിന്റെ ഭാഗമാണോ?',
      type: 'boolean',
      description: 'Turn this on if this project was done during a 7-day camp. / ഈ പദ്ധതി സ്പെഷ്യൽ ക്യാമ്പിന്റെ ഭാഗമാണെങ്കിൽ ഇത് ഓൺ ചെയ്യുക.',
      group: 'optional',
    }),
    defineField({
      name: 'relatedCamp',
      title: 'Select Camp / ക്യാമ്പ് തിരഞ്ഞെടുക്കുക',
      type: 'reference',
      to: [{ type: 'camp' }],
      hidden: ({ document }) => !document?.campRelated,
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
      description: 'Auto-generate this from the title. Hidden from basic view. / തലക്കെട്ടിൽ നിന്ന് ഇത് സ്വയമേവ നിർമ്മിക്കാൻ "Generate" ക്ലിക്ക് ചെയ്യുക.',
      options: { source: 'title', maxLength: 96 },
      group: 'advanced',
    }),
    defineField({
      name: 'year',
      title: 'Project Year / പദ്ധതി വർഷം',
      type: 'number',
      description: 'The year of the project. (Auto-filled from Batch) / ഈ പദ്ധതി നടന്ന വർഷം.',
      group: 'advanced',
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage? / ഹോംപേജിൽ പ്രദർശിപ്പിക്കണോ?',
      type: 'boolean',
      description: 'Turn this on to showcase this project on the homepage. / വെബ്സൈറ്റിന്റെ പ്രധാന പേജിൽ കാണിക്കാൻ ഇത് ഓൺ ചെയ്യുക.',
      group: 'advanced',
    }),
  ],
  initialValue: {
    status: 'completed',
    featured: false,
    campRelated: false,
    images: [],
    impactMetrics: [],
    organizers: [],
    reports: [],
    highlights: []
  },
  preview: {
    select: {
      title: 'title',
      date: 'date',
      category: 'category',
      status: 'status',
      media: 'coverImage',
    },
    prepare(selection) {
      const { title, date, category, status, media } = selection;
      const dateStr = date ? new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'No Date';
      const statusIcon = status === 'completed' ? '🟢' : status === 'ongoing' ? '🔵' : '🟡';
      const statusStr = status ? `${statusIcon} ${status.toUpperCase()}` : '';
      return {
        title: title || 'Untitled Project',
        subtitle: [dateStr, category, statusStr].filter(Boolean).join(' | '),
        media: media,
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
