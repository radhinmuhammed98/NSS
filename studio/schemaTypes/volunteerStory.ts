import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'volunteerStory',
  title: 'Volunteer Story',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Volunteer Name',
      type: 'string',
      description: 'വളന്റിയറുടെ പേര്',
      validation: (Rule) => Rule.required().error('പേര് നൽകുക (Volunteer name is required)'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'യുആർഎൽ ലിങ്ക് രൂപീകരിക്കാൻ ഉപയോഗിക്കുന്നു (Auto-generate from name.)',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug ആവശ്യമാണ് (Slug is required)'),
    }),
    defineField({
      name: 'photo',
      title: 'Volunteer Photo',
      type: 'image',
      description: 'വളന്റിയറുടെ ഫോട്ടോ. പോർട്രെയ്റ്റ് (portrait 3:4) അനുപാതവും നല്ല വെളിച്ചമുള്ളതുമായ ചിത്രം തിരഞ്ഞെടുക്കുക.',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('ഫോട്ടോ നിർബന്ധമാണ് (Photo is required)'),
    }),
    defineField({
      name: 'quote',
      title: 'Highlight Quote',
      type: 'string',
      description: 'പ്രധാന വാക്യം / സന്ദേശം (A short inspirational quote from the story to highlight)',
      validation: (Rule) => Rule.required().error('ഹൈലൈറ്റ് വാക്യം നൽകുക (Highlight quote is required)'),
    }),
    defineField({
      name: 'title',
      title: 'Story Title',
      type: 'string',
      description: 'അനുഭവക്കുറിപ്പിന്റെ തലക്കെട്ട് (e.g. My Life-Changing Seven Days)',
      validation: (Rule) => Rule.required().error('തലക്കെട്ട് ആവശ്യമാണ് (Story title is required)'),
    }),
    defineField({
      name: 'story',
      title: 'The Full Story',
      type: 'text',
      rows: 8,
      description: 'വളന്റിയർ പങ്കുവെക്കുന്ന പൂർണ്ണമായ അനുഭവം (The full experience story)',
      validation: (Rule) => Rule.required().error('അനുഭവക്കുറിപ്പ് നൽകുക (The full story content is required)'),
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
      name: 'featured',
      title: 'Featured Story',
      type: 'boolean',
      description: 'ഹോംപേജിൽ പ്രദർശിപ്പിക്കേണ്ട പ്രധാന അനുഭവക്കുറിപ്പുകളിൽ ഉൾപ്പെടുത്തണോ?',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      name: 'name',
      batch: 'batch.title',
      media: 'photo',
    },
    prepare({ title, name, batch, media }) {
      return {
        title: title || 'Untitled Story',
        subtitle: `By ${name || 'Unknown'} ${batch ? `(${batch})` : ''}`,
        media,
      }
    },
  },
})
