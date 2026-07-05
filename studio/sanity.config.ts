import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { codeInput } from '@sanity/code-input'
import { schemaTypes } from './schemaTypes'

// Define singleton types
const singletonTypes = new Set(['siteSettings', 'socialLinks', 'donation'])

// Define singleton actions (prevent delete, duplicate, etc.)
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'default',
  title: 'NSS Digital Legacy Studio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '2atqkk07',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    codeInput(),
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
                  .title('Website Configuration')
                  .items([
                    S.listItem()
                      .title('Site Settings')
                      .id('siteSettings')
                      .child(
                        S.document()
                          .schemaType('siteSettings')
                          .documentId('siteSettings')
                          .title('Website Configuration')
                      ),
                    S.listItem()
                      .title('Social Links')
                      .id('socialLinks')
                      .child(
                        S.document()
                          .schemaType('socialLinks')
                          .documentId('socialLinks')
                          .title('Social Links Configuration')
                      ),
                    S.listItem()
                      .title('Donation Settings')
                      .id('donation')
                      .child(
                        S.document()
                          .schemaType('donation')
                          .documentId('donation')
                          .title('Donation Settings Configuration')
                      ),
                  ])
              ),
            S.divider(),
            
            // Activities Group
            S.listItem()
              .title('Activities')
              .child(
                S.list()
                  .title('Activities Documents')
                  .items([
                    S.listItem()
                      .title('Projects')
                      .child(
                        S.documentTypeList('project')
                          .title('Projects')
                          .defaultOrdering([{ field: 'date', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('Camps')
                      .child(
                        S.documentTypeList('camp')
                          .title('Camps')
                          .defaultOrdering([{ field: 'year', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('Highlights')
                      .child(
                        S.documentTypeList('highlight')
                          .title('Highlights')
                          .defaultOrdering([{ field: 'date', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('Notices')
                      .child(
                        S.documentTypeList('notice')
                          .title('Notices')
                          .defaultOrdering([{ field: 'date', direction: 'desc' }])
                      ),
                    S.documentTypeListItem('category').title('Project Categories'),
                  ])
              ),
              
            // Media Group
            S.listItem()
              .title('Media')
              .child(
                S.list()
                  .title('Media Documents')
                  .items([
                    S.listItem()
                      .title('Gallery (Albums)')
                      .child(
                        S.documentTypeList('galleryAlbum')
                          .title('Gallery (Albums)')
                          .defaultOrdering([{ field: 'date', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('Videos')
                      .child(
                        S.documentTypeList('videoClip')
                          .title('Videos')
                          .defaultOrdering([{ field: 'year', direction: 'desc' }])
                      ),
                    S.documentTypeListItem('report').title('Reports'),
                  ])
              ),
              
            // People Group
            S.listItem()
              .title('People')
              .child(
                S.list()
                  .title('People Documents')
                  .items([
                    S.listItem()
                      .title('Team')
                      .child(
                        S.documentTypeList('teamMember')
                          .title('Team')
                          .defaultOrdering([{ field: 'order', direction: 'asc' }])
                      ),
                    S.listItem()
                      .title('Volunteers')
                      .child(
                        S.documentTypeList('volunteerStory')
                          .title('Volunteers')
                          .defaultOrdering([{ field: 'name', direction: 'asc' }])
                      ),
                  ])
              ),
              
            // History Group
            S.listItem()
              .title('History')
              .child(
                S.list()
                  .title('History Documents')
                  .items([
                    S.listItem()
                      .title('Batches')
                      .child(
                        S.documentTypeList('batch')
                          .title('Batches')
                          .defaultOrdering([{ field: 'year', direction: 'desc' }])
                      ),
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
