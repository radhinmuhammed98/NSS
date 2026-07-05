import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'donation',
  title: 'Donation Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enable Donations',
      type: 'boolean',
      description: 'സംഭാവന വിവരങ്ങൾ വെബ്‌സൈറ്റിൽ കാണിക്കണോ? (Show donation details on the website?)',
      initialValue: false,
    }),
    defineField({
      name: 'upiId',
      title: 'UPI ID',
      type: 'string',
      description: 'ഭാരത് പേ / ജിപേ യുപിഐ ഐഡി (e.g. nss@okaxis). Required if donations are enabled.',
      validation: (Rule) =>
        Rule.custom((upiId, context) => {
          const document = context.document as { enabled?: boolean }
          if (document?.enabled && !upiId) {
            return 'സംഭാവനകൾ പ്രവർത്തനക്ഷമമാക്കുമ്പോൾ UPI ID നൽകേണ്ടതുണ്ട്. (UPI ID is required when donations are enabled.)'
          }
          return true
        }),
    }),
    defineField({
      name: 'qrImage',
      title: 'UPI QR Code Image',
      type: 'image',
      description: 'സംഭാവന സ്വീകരിക്കാനുള്ള ക്യുആർ കോഡ് ചിത്രം അപ്ലോഡ് ചെയ്യുക. (Upload the UPI payment QR code image. Square ratio recommended.)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bankAccount',
      title: 'Bank Account Details',
      type: 'object',
      description: 'ബാങ്ക് അക്കൗണ്ട് വിവരങ്ങൾ (Direct bank transfer details)',
      fields: [
        defineField({
          name: 'name',
          title: 'Account Holder Name',
          type: 'string',
          description: 'e.g. NSS Unit KHMHSS Valakkulam',
        }),
        defineField({
          name: 'account',
          title: 'Account Number',
          type: 'string',
        }),
        defineField({
          name: 'ifsc',
          title: 'IFSC Code',
          type: 'string',
          description: 'e.g. SBIN0001234',
        }),
        defineField({
          name: 'bank',
          title: 'Bank Name',
          type: 'string',
          description: 'e.g. State Bank of India',
        }),
        defineField({
          name: 'branch',
          title: 'Branch Name',
          type: 'string',
          description: 'e.g. Valakkulam',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Donation Settings',
        subtitle: 'Configure website donation options',
      }
    },
  },
})
