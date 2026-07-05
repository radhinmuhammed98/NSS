import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { codeInput } from '@sanity/code-input'
import { schemaTypes } from './schemaTypes'
import { media } from 'sanity-plugin-media'

// Define singleton types
const singletonTypes = new Set(['siteSettings', 'homePage', 'socialLinks', 'donation', 'about'])

// Define singleton actions (prevent delete, duplicate, etc.)
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'default',
  title: 'NSS Digital Legacy Studio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '2atqkk07',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    codeInput(),
    media(),
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content Categories')
          .items([
            // Website Group
            S.listItem()
              .title('Website')
              .child(
                S.list()
                  .title('Website')
                  .items([
                    S.listItem()
                      .title('Site Settings')
                      .id('siteSettings')
                      .child(
                        S.document()
                          .schemaType('siteSettings')
                          .documentId('siteSettings')
                          .title('Site Settings')
                      ),
                    S.listItem()
                      .title('Home Page')
                      .id('homePage')
                      .child(
                        S.document()
                          .schemaType('homePage')
                          .documentId('homePage')
                          .title('Home Page')
                      ),
                    S.listItem()
                      .title('About')
                      .id('about')
                      .child(
                        S.document()
                          .schemaType('about')
                          .documentId('about')
                          .title('About')
                      ),
                    S.listItem()
                      .title('Donation')
                      .id('donation')
                      .child(
                        S.document()
                          .schemaType('donation')
                          .documentId('donation')
                          .title('Donation')
                      ),
                    S.listItem()
                      .title('Social Links')
                      .id('socialLinks')
                      .child(
                        S.document()
                          .schemaType('socialLinks')
                          .documentId('socialLinks')
                          .title('Social Links')
                      ),
                  ])
              ),
            S.divider(),
            
            // Activities Group
            S.listItem()
              .title('Activities')
              .child(
                S.list()
                  .title('Activities')
                  .items([
                    S.documentTypeListItem('project').title('Projects'),
                    S.documentTypeListItem('camp').title('Camps'),
                    S.documentTypeListItem('highlight').title('Highlights'),
                    S.documentTypeListItem('galleryAlbum').title('Gallery'),
                    S.documentTypeListItem('videoClip').title('Videos'),
                  ])
              ),
              
            // People Group
            S.listItem()
              .title('People')
              .child(
                S.list()
                  .title('People')
                  .items([
                    S.documentTypeListItem('batch').title('Batches'),
                    S.documentTypeListItem('teamMember').title('Team'),
                    S.documentTypeListItem('volunteerStory').title('Volunteers'),
                  ])
              ),

            // Updates Group
            S.listItem()
              .title('Updates')
              .child(
                S.list()
                  .title('Updates')
                  .items([
                    S.documentTypeListItem('notice').title('Notices'),
                    S.documentTypeListItem('report').title('Reports'),
                  ])
              ),
              
            // History Group
            S.listItem()
              .title('History')
              .child(
                S.list()
                  .title('History')
                  .items([
                    S.documentTypeListItem('timelineItem').title('Timeline'),
                  ])
              ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
    // Filter out singleton types from new document creation
    templates: (templates) =>
      templates.filter((template) => !singletonTypes.has(template.schemaId)),
  },

  document: {
    // For singleton documents, only allow actions in singletonActions
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})
