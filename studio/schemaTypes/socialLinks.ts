import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'socialLinks',
  title: 'Social Links',
  type: 'document',
  fields: [
    defineField({
      name: 'facebook',
      title: 'Facebook Page URL',
      type: 'url',
      description: 'NSS യൂണിറ്റ് ഫേസ്ബുക്ക് പേജ് ലിങ്ക് (e.g., https://facebook.com/nssvalakkulam)',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram Profile URL',
      type: 'url',
      description: 'NSS യൂണിറ്റ് ഇൻസ്റ്റാഗ്രാം പേജ് ലിങ്ക് (e.g., https://instagram.com/nssvalakkulam)',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube Channel URL',
      type: 'url',
      description: 'NSS യൂണിറ്റ് യൂട്യൂബ് ചാനൽ ലിങ്ക് (e.g., https://youtube.com/@nssvalakkulam)',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter / X URL',
      type: 'url',
      description: 'NSS യൂണിറ്റ് X പ്രൊഫൈൽ ലിങ്ക് (e.g., https://x.com/nssvalakkulam)',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Social Media Profiles',
        subtitle: 'Configure external social links',
      }
    },
  },
})
