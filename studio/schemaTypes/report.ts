import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'report',
  title: 'Report / റിപ്പോർട്ട്',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info / അടിസ്ഥാന വിവരങ്ങൾ', default: true },
    { name: 'optional', title: 'Additional Details / കൂടുതൽ വിവരങ്ങൾ' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Report Title / റിപ്പോർട്ട് തലക്കെട്ട്',
      type: 'string',
      description: 'The title of the report. / ഈ റിപ്പോർട്ടിന്റെ തലക്കെട്ട് നൽകുക.',
      placeholder: 'e.g., Annual Activity Report 2025-26 / ഉദാ: വാർഷിക പ്രവർത്തന റിപ്പോർട്ട് 2025-26',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'PDF File / പി.ഡി.എഫ് ഫയൽ',
      type: 'file',
      description: 'Upload the PDF document. / പി.ഡി.എഫ് ഫയൽ ഇവിടെ അപ്‌ലോഡ് ചെയ്യുക.',
      options: { accept: '.pdf' },
      group: 'basic',
    }),
    defineField({
      name: 'date',
      title: 'Date / തീയതി',
      type: 'date',
      description: 'The date this report was published. (Auto-filled) / ഈ റിപ്പോർട്ട് പബ്ലിഷ് ചെയ്ത തീയതി.',
      group: 'basic',
    }),
    defineField({
      name: 'description',
      title: 'Description / വിവരണം',
      type: 'text',
      description: 'A brief summary of what is in this report. / ഈ റിപ്പോർട്ടിന്റെ ഒരു ചെറിയ വിവരണം.',
      group: 'optional',
    }),
  ],
  initialValue: () => ({
    date: new Date().toISOString().split('T')[0],
  }),
  preview: {
    select: {
      title: 'title',
      date: 'date',
    },
    prepare(selection) {
      const { title, date } = selection;
      const dateStr = date ? new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'No Date';
      return {
        title: title || 'Untitled Report',
        subtitle: `Published: ${dateStr}`,
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
