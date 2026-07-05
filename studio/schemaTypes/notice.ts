import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'notice',
  title: 'Notice & Announcement',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Notice Title',
      type: 'string',
      description: 'അറിയിപ്പിന്റെ വിഷയം (e.g. Special Meeting for Volunteers)',
      validation: (Rule) => Rule.required().error('തലക്കെട്ട് ആവശ്യമാണ് (Notice title is required)'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'വെബ്‌സൈറ്റ് യുആർഎൽ ലിങ്ക് രൂപീകരിക്കാൻ ഉപയോഗിക്കുന്നു (Auto-generate from title.)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug ആവശ്യമാണ് (Slug is required)'),
    }),
    defineField({
      name: 'date',
      title: 'Date of Issue',
      type: 'date',
      description: 'അറിയിപ്പ് നൽകിയ തീയതി',
      validation: (Rule) => Rule.required().error('തീയതി ആവശ്യമാണ് (Date is required)'),
    }),
    defineField({
      name: 'type',
      title: 'Notice Type',
      type: 'string',
      description: 'അറിയിപ്പ് വിഭാഗം (e.g. Announcement, Circular, Meeting, General)',
      validation: (Rule) => Rule.required().error('അറിയിപ്പ് വിഭാഗം ആവശ്യമാണ് (Notice type is required)'),
    }),
    defineField({
      name: 'description',
      title: 'Description / Content',
      type: 'text',
      rows: 5,
      description: 'അറിയിപ്പിന്റെ പൂർണ്ണ വിവരങ്ങൾ (Detailed notice content)',
      validation: (Rule) => Rule.required().error('വിവരണം നൽകുക (Description content is required)'),
    }),
    defineField({
      name: 'attachment',
      title: 'Attachment File (PDF/Image)',
      type: 'file',
      description: 'ബന്ധപ്പെട്ട പിഡിഎഫ് ഫയൽ അല്ലെങ്കിൽ സർക്കുലർ ഉണ്ടെങ്കിൽ അപ്ലോഡ് ചെയ്യാം (Optional circular document/file to download)',
    }),
    defineField({
      name: 'important',
      title: 'Mark as Important / Urgent',
      type: 'boolean',
      description: 'ഇത് വളരെ പ്രധാനപ്പെട്ട അറിയിപ്പാണെങ്കിൽ ടിക്ക് ചെയ്യുക. (Highlights the notice with an urgent tag on the site)',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      important: 'important',
    },
    prepare({ title, date, important }) {
      const formattedDate = date ? new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''
      return {
        title: title || 'Untitled Notice',
        subtitle: `${formattedDate}${important ? ' ⚠️ URGENT' : ''}`,
      }
    },
  },
})
