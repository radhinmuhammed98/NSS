import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'notice',
  title: 'Notice',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Notice Title',
      type: 'string',
      description: 'The main heading of the notice.',
      placeholder: 'e.g., Blood Donation Camp Announcement',
      
    }),
    defineField({
      name: 'date',
      title: 'Date (Optional)',
      type: 'date',
      description: 'When is this notice published or effective?',
      initialValue: () => new Date().toISOString().split('T')[0],
    }),
    defineField({
      name: 'description',
      title: 'Details (Optional)',
      type: 'text',
      rows: 5,
      description: 'The full text of the announcement.',
    }),
    defineField({
      name: 'attachment',
      title: 'File Attachment (Optional)',
      type: 'file',
      description: 'Upload a PDF or document if there is one.',
      options: { accept: '.pdf,.doc,.docx' },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
    },
    prepare(selection) {
      const { title, date } = selection;
      return {
        title,
        subtitle: date,
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
