import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'campDay',
  title: 'Camp Day Entry',
  type: 'object',
  fields: [
    defineField({
      name: 'dayNumber',
      title: 'Day Number',
      type: 'number',
      description: 'ക്യാമ്പ് ദിവസം (e.g. Day 1, 2... up to 7)',
      validation: (Rule) => Rule.required().integer().min(1).max(10).error('സാധുവായ ഒരു ദിവസം നൽകുക (Day number must be between 1 and 10)'),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'ഈ ക്യാമ്പ് ദിവസത്തെ തീയതി',
      validation: (Rule) => Rule.required().error('തീയതി ആവശ്യമാണ് (Date is required)'),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'ഈ ദിവസത്തെ പ്രധാന പരിപാടി അല്ലെങ്കിൽ വിഷയം (e.g. Inauguration / Survey Conducted)',
      validation: (Rule) => Rule.required().error('തലക്കെട്ട് നൽകുക (Title is required)'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'ഈ ദിവസത്തെ പ്രവർത്തനങ്ങളുടെ ഒരു ചെറു വിവരണം',
      validation: (Rule) => Rule.required().error('വിവരണം നൽകുക (Description is required)'),
    }),
    defineField({
      name: 'activities',
      title: 'Activities List',
      type: 'array',
      description: 'ഇന്ന് ചെയ്ത പ്രധാന കാര്യങ്ങളുടെ പട്ടിക (e.g. Cleaning drive, Seminars, Cultural event)',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1).error('കുറഞ്ഞത് ഒരു പ്രവർത്തിയെങ്കിലും ലിസ്റ്റ് ചെയ്യുക (At least 1 activity must be listed)'),
    }),
    defineField({
      name: 'guests',
      title: 'Guests/Dignitaries',
      type: 'array',
      description: 'അതിഥികൾ (e.g. Ward Councillor, Headmaster)',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'images',
      title: 'Day Photos',
      type: 'array',
      description: 'ഈ ദിവസം പകർത്തിയ ചിത്രങ്ങൾ',
      of: [{ type: 'imageAsset' }],
    }),
  ],
  preview: {
    select: {
      dayNumber: 'dayNumber',
      title: 'title',
    },
    prepare({ dayNumber, title }) {
      return {
        title: `Day ${dayNumber || '?'}: ${title || 'Untitled'}`,
      }
    },
  },
})
