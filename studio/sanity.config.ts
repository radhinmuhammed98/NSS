import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

// Define singleton types
const singletonTypes = new Set(['siteSettings'])

// Define singleton actions (prevent delete, duplicate, etc.)
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'default',
  title: 'NSS Digital Legacy Studio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'your_project_id',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content Categories')
          .items([
            // Singleton Site Settings
            S.listItem()
              .title('Configuration')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Website Configuration')
              ),
            S.divider(),
            
            // Legacy Group
            S.listItem()
              .title('Legacy')
              .child(
                S.list()
                  .title('Legacy Documents')
                  .items([
                    S.documentTypeListItem('batch').title('Batches'),
                    S.documentTypeListItem('timelineItem').title('Journey Timeline'),
                  ])
              ),
              
            // Activities Group
            S.listItem()
              .title('Activities')
              .child(
                S.list()
                  .title('Activities Documents')
                  .items([
                    S.documentTypeListItem('project').title('Projects'),
                    S.documentTypeListItem('camp').title('Camps'),
                    S.documentTypeListItem('category').title('Project Categories'),
                  ])
              ),
              
            // Media Group
            S.listItem()
              .title('Media')
              .child(
                S.list()
                  .title('Media & Documents')
                  .items([
                    S.documentTypeListItem('galleryAlbum').title('Gallery Albums'),
                    S.documentTypeListItem('videoClip').title('Video Clips'),
                    S.documentTypeListItem('report').title('Reports'),
                    S.documentTypeListItem('highlight').title('Highlights'),
                  ])
              ),
              
            // People Group
            S.listItem()
              .title('People')
              .child(
                S.list()
                  .title('People Documents')
                  .items([
                    S.documentTypeListItem('teamMember').title('Team Members'),
                    S.documentTypeListItem('volunteerStory').title('Volunteer Stories'),
                  ])
              ),
              
            // Notices Group
            S.listItem()
              .title('Notices')
              .child(
                S.documentTypeListItem('notice').title('Notices & Announcements')
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
