import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'campDay',
  title: 'Camp Day / ക്യാമ്പ് ദിവസം',
  type: 'object',
  fields: [
    defineField({
      name: 'dayNumber',
      title: 'Day Number / ദിവസ നമ്പർ',
      type: 'number',
      description: 'Which day of the camp is this? (e.g., 1, 2, 3) / ഇത് ക്യാമ്പിന്റെ എത്രാമത്തെ ദിവസമാണ്?',
      validation: (Rule) => Rule.min(1).max(7),
    }),
    defineField({
      name: 'title',
      title: 'Title of the Day / ദിവസത്തെ തലക്കെട്ട്',
      type: 'string',
      description: 'A brief title for this day. / ഈ ദിവസത്തെ ഒരു ചെറിയ തലക്കെട്ട്.',
      placeholder: 'e.g., Inauguration & Ice Breaking / ഉദാ: ഉദ്ഘാടനവും പരിചയപ്പെടലും',
    }),
    defineField({
      name: 'description',
      title: 'Description / വിവരണം',
      type: 'text',
      rows: 4,
      description: 'What happened on this day? Write a summary of the activities. / ഈ ദിവസം എന്താണ് സംഭവിച്ചത്? ഒരു ചെറിയ വിവരണം എഴുതുക.',
    }),
    defineField({
      name: 'activities',
      title: 'Activities / പ്രവർത്തനങ്ങൾ',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List the key activities of the day. / ഈ ദിവസത്തെ പ്രധാന പ്രവർത്തനങ്ങൾ ചേർക്കുക.',
      initialValue: [],
    }),
    defineField({
      name: 'guests',
      title: 'Guests & Resource Persons / അതിഥികളും പ്രഭാഷകരും',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'guest',
          title: 'Guest / Resource Person',
          fields: [
            defineField({
              name: 'name',
              title: 'Name / പേര്',
              type: 'string',
            }),
            defineField({
              name: 'designation',
              title: 'Designation / പദവി',
              type: 'string',
            }),
            defineField({
              name: 'photo',
              title: 'Photo / ഫോട്ടോ',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'organisation',
              title: 'Organisation / സ്ഥാപനം',
              type: 'string',
            }),
          ],
        },
      ],
      initialValue: [],
    }),
    defineField({
      name: 'images',
      title: 'Photos of the Day / ഈ ദിവസത്തെ ചിത്രങ്ങൾ',
      type: 'array',
      of: [{ type: 'imageAsset' }],
      description: 'Upload some key photos from this day. / ഈ ദിവസത്തെ പ്രധാന ഫോട്ടോകൾ ചേർക്കുക.',
      initialValue: [],
    }),
    defineField({
      name: 'videos',
      title: 'Videos of the Day / ഈ ദിവസത്തെ വീഡിയോകൾ',
      type: 'array',
      of: [{ type: 'videoAsset' }],
      description: 'Upload videos for this day directly here. / ഈ ദിവസത്തെ വീഡിയോകൾ ഇവിടെ അപ്‌ലോഡ് ചെയ്യുക.',
      initialValue: [],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      dayNumber: 'dayNumber',
    },
    prepare({ title, dayNumber }) {
      return {
        title: `Day ${dayNumber || '?'}: ${title || 'Untitled Day'}`,
      };
    },
  },
});
