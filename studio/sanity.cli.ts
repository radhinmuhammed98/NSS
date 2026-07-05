import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'o5r7P6oq4',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production'
  },
  studioHost: 'khmhss-nss-466'
})
