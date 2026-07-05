import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'report',
  title: 'Report',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Report Title',
      type: 'string',
      description: 'ഔദ്യോഗിക റിപ്പോർട്ട് നാമം (e.g., Annual Report 2024-25)',
      validation: (Rule) => Rule.required().error('തലക്കെട്ട് ആവശ്യമാണ് (Report title is required)'),
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
      name: 'type',
      title: 'Report Type',
      type: 'string',
      description: 'വിഭാഗം (e.g., Annual Report, Audit Report, Camp Report)',
      validation: (Rule) => Rule.required().error('വിഭാഗം തിരഞ്ഞെടുക്കുക/എഴുതുക (Report type is required)'),
    }),
    defineField({
      name: 'date',
      title: 'Report Date',
      type: 'date',
      description: 'റിപ്പോർട്ട് സമർപ്പിച്ച തീയതി',
      validation: (Rule) => Rule.required().error('തീയതി ആവശ്യമാണ് (Report date is required)'),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      description: 'വർഷം (e.g., 2025)',
      validation: (Rule) => Rule.required().integer().min(1982).max(2100).error('സാധുവായ വർഷം നൽകുക (Valid year is required)'),
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
      description: 'ബന്ധപ്പെട്ട പ്രോജക്റ്റ് (Optional project link)',
    }),
    defineField({
      name: 'relatedCamp',
      title: 'Related Camp',
      type: 'reference',
      to: [{ type: 'camp' }],
      description: 'ബന്ധപ്പെട്ട ക്യാമ്പ് (Optional camp link)',
    }),
    defineField({
      name: 'pdfFile',
      title: 'Sanity PDF File',
      type: 'file',
      description: 'റിപ്പോർട്ട് പിഡിഎഫ് ഫയൽ അപ്ലോഡ് ചെയ്യുക (Upload PDF directly. Accept .pdf only.)',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'externalUrl',
      title: 'External PDF URL',
      type: 'url',
      description: 'മറ്റേതെങ്കിലും വെബ്സൈറ്റിൽ അപ്ലോഡ് ചെയ്ത ലിങ്ക് (External link to PDF if not uploaded above)',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'റിപ്പോർട്ടിന്റെ ഉള്ളടക്കത്തെക്കുറിച്ചുള്ള ചെറു വിവരണം',
      validation: (Rule) => Rule.required().error('വിവരണം നൽകുക (Description is required)'),
    }),
    defineField({
      name: 'isPublic',
      title: 'Is Publicly Accessible',
      type: 'boolean',
      description: 'എല്ലാവർക്കും കാണാൻ സാധിക്കണോ? (Show to the general public?)',
      initialValue: true,
    }),
  ],
  validation: (Rule) =>
    Rule.custom((fields) => {
      if (!fields?.pdfFile && !fields?.externalUrl) {
        return 'ദയവായി ഒരു PDF ഫയൽ അപ്ലോഡ് ചെയ്യുക അല്ലെങ്കിൽ ബാഹ്യ ലിങ്ക് നൽകുക. (Either upload a PDF file or provide an external URL.)'
      }
      if (fields?.pdfFile && fields?.externalUrl) {
        return 'ഫയൽ അപ്‌ലോഡ് അല്ലെങ്കിൽ ലിങ്ക് ഏതെങ്കിലും ഒന്ന് മാത്രം തിരഞ്ഞെടുക്കുക. (Choose either file upload OR external URL, not both.)'
      }
      return true
    }),
  preview: {
    select: {
      title: 'title',
      type: 'type',
      year: 'year',
    },
    prepare({ title, type, year }) {
      return {
        title: title || 'Untitled Report',
        subtitle: `${type || 'General'} (${year || ''})`,
      }
    },
  },
})
