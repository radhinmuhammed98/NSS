import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'notice',
  title: 'Notice / അറിയിപ്പ്',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info / അടിസ്ഥാന വിവരങ്ങൾ', default: true },
    { name: 'content', title: 'Details / വിവരണം' },
    { name: 'optional', title: 'Attachment / അറ്റാച്ച്മെന്റ്' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Notice Title / അറിയിപ്പ് തലക്കെട്ട്',
      type: 'string',
      description: 'The main heading of the notice. / ഈ അറിയിപ്പിന്റെ പ്രധാന തലക്കെട്ട് നൽകുക.',
      placeholder: 'e.g., Blood Donation Camp Announcement / ഉദാ: രക്തദാന ക്യാമ്പ് അറിയിപ്പ്',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date / തീയതി',
      type: 'date',
      description: 'When is this notice published or effective? (Auto-filled) / ഇത് പബ്ലിഷ് ചെയ്യുന്ന തീയതി.',
      group: 'basic',
    }),
    defineField({
      name: 'description',
      title: 'Details / വിവരണം',
      type: 'text',
      rows: 6,
      description: 'The full text of the announcement. / അറിയിപ്പിന്റെ പൂർണ്ണമായ വിവരങ്ങൾ ഇവിടെ എഴുതുക.',
      group: 'content',
    }),
    defineField({
      name: 'attachment',
      title: 'File Attachment / ഫയൽ അറ്റാച്ച്മെന്റ്',
      type: 'file',
      description: 'Upload a PDF or document if there is one. / ബന്ധപ്പെട്ട സർക്കുലറോ അല്ലെങ്കിൽ മറ്റ് ഫയലുകളോ ഇവിടെ അപ്‌ലോഡ് ചെയ്യാം.',
      options: { accept: '.pdf,.doc,.docx' },
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
        title: title || 'Untitled Notice',
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
