import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '2atqkk07',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production'
  },
  studioHost: 'khmhss-nss-466',
  deployment: {
    appId: 'z0gtbw013gf0cs3yfe2yv3k4',
  }
})
