import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'galleryAlbum',
  title: 'Gallery Album',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Details (അടിസ്ഥാന വിവരങ്ങൾ)' },
    { name: 'media', title: 'Photos (ചിത്രങ്ങൾ)' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Album Title',
      type: 'string',
      description: 'ആൽബത്തിന്റെ പേര് (e.g. Children\'s Day Celebration 2025)',
      group: 'basic',
      validation: (Rule) => Rule.required().error('ആൽബം പേര് ആവശ്യമാണ് (Album title is required)'),
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
      group: 'basic',
      validation: (Rule) => Rule.required().error('Slug ആവശ്യമാണ് (Slug is required)'),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'പരിപാടി നടന്ന തീയതി',
      group: 'basic',
      validation: (Rule) => Rule.required().error('തീയതി ആവശ്യമാണ് (Date is required)'),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      description: 'പരിപാടി നടന്ന വർഷം (ലിസ്റ്റുകൾ ക്രമീകരിക്കാൻ ഉപയോഗിക്കുന്നു, e.g., 2025)',
      group: 'basic',
      validation: (Rule) => Rule.required().integer().min(1982).max(2100).error('വർഷം നൽകുക (Valid year is required)'),
    }),
    defineField({
      name: 'batch',
      title: 'Batch',
      type: 'reference',
      to: [{ type: 'batch' }],
      description: 'ബന്ധപ്പെട്ട ബാച്ച് (Optional batch association)',
      group: 'basic',
    }),
    defineField({
      name: 'type',
      title: 'Album Type / Category',
      type: 'string',
      description: 'ആൽബം വിഭാഗം (e.g., Campaign, Camp, Celebration, Clean-up)',
      group: 'basic',
      validation: (Rule) => Rule.required().error('ആൽബം വിഭാഗം തിരഞ്ഞെടുക്കുക/നൽകുക (Album type is required)'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'ആൽബത്തെക്കുറിച്ചുള്ള ലളിതമായ വിവരണം (Short description of the event captured)',
      group: 'basic',
      validation: (Rule) => Rule.required().error('വിവരണം നൽകുക (Description is required)'),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'ആൽബത്തിന്റെ പ്രധാന ചിത്രം (Cover image of the album)',
      options: {
        hotspot: true,
      },
      group: 'media',
      validation: (Rule) => Rule.required().error('കവർ ചിത്രം നിർബന്ധമാണ് (Cover image is required)'),
    }),
    defineField({
      name: 'images',
      title: 'Album Photos',
      type: 'array',
      description: 'ആൽബത്തിലെ മുഴുവൻ ഫോട്ടോകളും ചേർക്കുക (Add all photos. Minimum 1 photo required.)',
      of: [{ type: 'imageAsset' }],
      group: 'media',
      validation: (Rule) => Rule.required().min(1).error('കുറഞ്ഞത് ഒരു ചിത്രമെങ്കിലും ആൽബത്തിൽ ചേർക്കുക (At least 1 photo is required in the album)'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      images: 'images',
      media: 'coverImage',
    },
    prepare({ title, type, images, media }) {
      const count = images ? images.length : 0
      return {
        title: title || 'Untitled Album',
        subtitle: `${type || 'General'} (${count} Photo${count !== 1 ? 's' : ''})`,
        media,
      }
    },
  },
})
