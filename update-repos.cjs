const fs = require('fs');

let content = fs.readFileSync('src/lib/content/sanityRepository.ts', 'utf8');

content = content.replace(/import type \{[\s\S]*?\} from "@\/types";/, 
`import type {
  SiteSettings,
  HomePage,
  AboutPage,
  Project,
  Camp,
  GalleryAlbum,
  VideoClip,
  Report,
  Highlight,
  TimelineItem,
  TeamMember,
  VolunteerStory,
  Notice,
  Donation,
  SocialLinks,
} from "@/types";`);

content = content.replace(/  async getBatches\(\)[\s\S]*?\}\n/, '');
content = content.replace(/  async getBatchBySlug\([\s\S]*?\}\n/, '');
content = content.replace(/  async getProjectsByBatch\([\s\S]*?\}\n/, '');
content = content.replace(/  async getCampsByBatch\([\s\S]*?\}\n/, '');
content = content.replace(/  async getAlbumsByBatch\([\s\S]*?\}\n/, '');
content = content.replace(/  async getVideosByBatch\([\s\S]*?\}\n/, '');
content = content.replace(/  async getReportsByBatch\([\s\S]*?\}\n/, '');
content = content.replace(/  async getHighlightsByBatch\([\s\S]*?\}\n/, '');
content = content.replace(/  async getTeamByBatch\([\s\S]*?\}\n/, '');
content = content.replace(/  async getStoriesByBatch\([\s\S]*?\}\n/, '');

// Add getHomePage and getAboutPage
const getSiteSettingsIndex = content.indexOf('  async getSiteSettings()');
const insertString = `  async getHomePage(): Promise<HomePage> {
    const raw = await this.client().fetch(queries.HOME_QUERY);
    if (!raw) throw new Error("No Home Page document found in Sanity.");
    return mappers.mapHomePage(raw);
  }

  async getAboutPage(): Promise<AboutPage> {
    const raw = await this.client().fetch(queries.ABOUT_QUERY);
    if (!raw) throw new Error("No About Page document found in Sanity.");
    return mappers.mapAboutPage(raw);
  }

`;
content = content.slice(0, getSiteSettingsIndex) + insertString + content.slice(getSiteSettingsIndex);

fs.writeFileSync('src/lib/content/sanityRepository.ts', content);

let indexContent = fs.readFileSync('src/lib/data/index.ts', 'utf8');
indexContent = indexContent.replace(/import type \{[\s\S]*?\} from "@\/types";/, 
`import type {
  SiteSettings,
  HomePage,
  AboutPage,
  Project,
  Camp,
  GalleryAlbum,
  VideoClip,
  Report,
  Highlight,
  TimelineItem,
  TeamMember,
  VolunteerStory,
  Notice,
  Donation,
  SocialLinks,
} from "@/types";`);

indexContent = indexContent.replace(/export const getCurrentBatch[\s\S]*?\};\n/, '');
indexContent = indexContent.replace(/export const getBatches[\s\S]*?;/g, '');
indexContent = indexContent.replace(/export const getBatchBySlug[\s\S]*?;/g, '');
indexContent = indexContent.replace(/export const getBatchTitle = \(slug\?: string\): string =>\n  getBatchTitleSync\(slug\);\n/g, '');
indexContent = indexContent.replace(/export const getProjectsByBatch[\s\S]*?;/g, '');
indexContent = indexContent.replace(/export const getCampsByBatch[\s\S]*?;/g, '');
indexContent = indexContent.replace(/export const getAlbumsByBatch[\s\S]*?;/g, '');
indexContent = indexContent.replace(/export const getVideosByBatch[\s\S]*?;/g, '');
indexContent = indexContent.replace(/export const getReportsByBatch[\s\S]*?;/g, '');
indexContent = indexContent.replace(/export const getHighlightsByBatch[\s\S]*?;/g, '');
indexContent = indexContent.replace(/export const getTeamByBatch[\s\S]*?;/g, '');
indexContent = indexContent.replace(/export const getStoriesByBatch[\s\S]*?;/g, '');

const insertDataString = `export const getHomePage = (): Promise<HomePage> =>
  contentRepository.getHomePage();

export const getAboutPage = (): Promise<AboutPage> =>
  contentRepository.getAboutPage();

`;
const dataIndex = indexContent.indexOf('export const getSiteSettings');
indexContent = indexContent.slice(0, dataIndex) + insertDataString + indexContent.slice(dataIndex);

indexContent = indexContent.replace(/import \{ contentRepository, getBatchTitleSync, getSiteSettingsSync, getSocialLinksSync \} from "@\/lib\/content";/, `import { contentRepository, getSiteSettingsSync, getSocialLinksSync } from "@/lib/content";`);

fs.writeFileSync('src/lib/data/index.ts', indexContent);

let contentIndexContent = fs.readFileSync('src/lib/content/index.ts', 'utf8');
contentIndexContent = contentIndexContent.replace(/export \* from '\.\/mockRepository';\n/, '');
contentIndexContent = contentIndexContent.replace(/export function getBatchTitleSync[\s\S]*?\}\n/, '');
fs.writeFileSync('src/lib/content/index.ts', contentIndexContent);
