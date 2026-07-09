import { defineField } from 'sanity'

export const today = () => new Date().toISOString().split('T')[0]

export const currentYear = () => new Date().getFullYear()

export const academicYearFromDate = () => {
  const now = new Date()
  const startYear = now.getMonth() >= 5 ? now.getFullYear() : now.getFullYear() - 1
  return `${startYear}-${String(startYear + 1).slice(2)}`
}

export const projectCategories = [
  { title: 'Environment', value: 'Environment' },
  { title: 'Health', value: 'Health' },
  { title: 'Education', value: 'Education' },
  { title: 'Anti-Drug Awareness', value: 'Anti-Drug Awareness' },
  { title: 'Road Safety', value: 'Road Safety' },
  { title: 'Blood Donation', value: 'Blood Donation' },
  { title: 'Palliative Care', value: 'Palliative Care' },
  { title: 'Community Cleaning', value: 'Community Cleaning' },
  { title: 'Disaster Relief', value: 'Disaster Relief' },
  { title: 'Digital Literacy', value: 'Digital Literacy' },
  { title: 'School Development', value: 'School Development' },
  { title: 'Charity', value: 'Charity' },
  { title: 'Social Survey', value: 'Social Survey' },
  { title: 'Women Empowerment', value: 'Women Empowerment' },
  { title: 'Special Camp Activity', value: 'Special Camp Activity' },
  { title: 'Other', value: 'Other' },
]

export const impactMetricLabels = [
  { title: 'Volunteers', value: 'Volunteers' },
  { title: 'Beneficiaries', value: 'Beneficiaries' },
  { title: 'Service Hours', value: 'Service Hours' },
  { title: 'Trees Planted', value: 'Trees Planted' },
  { title: 'Blood Donors', value: 'Blood Donors' },
  { title: 'Homes Visited', value: 'Homes Visited' },
  { title: 'Students Reached', value: 'Students Reached' },
  { title: 'Waste Collected', value: 'Waste Collected' },
  { title: 'Sessions Conducted', value: 'Sessions Conducted' },
  { title: 'Other', value: 'Other' },
]

export const galleryAlbumTypes = [
  { title: 'Project Photos', value: 'Project Photos' },
  { title: 'Special Camp', value: 'Special Camp' },
  { title: 'School Event', value: 'School Event' },
  { title: 'Awareness Campaign', value: 'Awareness Campaign' },
  { title: 'Volunteer Memory', value: 'Volunteer Memory' },
  { title: 'Award / Recognition', value: 'Award / Recognition' },
  { title: 'Other', value: 'Other' },
]

export const milestoneTypes = [
  { title: 'Unit Founded', value: 'Unit Founded' },
  { title: 'Award / Recognition', value: 'Award / Recognition' },
  { title: 'Website Launch', value: 'Website Launch' },
  { title: 'Special Camp Achievement', value: 'Special Camp Achievement' },
  { title: 'Major Project', value: 'Major Project' },
  { title: 'Community Milestone', value: 'Community Milestone' },
  { title: 'Other', value: 'Other' },
]

export const teamRoles = [
  { title: 'Programme Officer', value: 'Programme Officer' },
  { title: 'Assistant Programme Officer', value: 'Assistant Programme Officer' },
  { title: 'Volunteer Secretary', value: 'Volunteer Secretary' },
  { title: 'Camp Leader', value: 'Camp Leader' },
  { title: 'Volunteer', value: 'Volunteer' },
  { title: 'Advisor', value: 'Advisor' },
  { title: 'Alumni Volunteer', value: 'Alumni Volunteer' },
]

export const servicePillarIcons = [
  { title: 'Community / People', value: 'groups' },
  { title: 'Health / Care', value: 'volunteer_activism' },
  { title: 'Education', value: 'school' },
  { title: 'Environment', value: 'eco' },
  { title: 'Safety', value: 'health_and_safety' },
  { title: 'Awareness', value: 'campaign' },
  { title: 'Leadership', value: 'emoji_events' },
]

export const videoTypes = [
  { title: 'Annual Camp', value: 'Annual Camp' },
  { title: 'Project Documentation', value: 'Project Documentation' },
  { title: 'Volunteer Memory', value: 'Volunteer Memory' },
  { title: 'Awareness Campaign', value: 'Awareness Campaign' },
  { title: 'Event Highlight', value: 'Event Highlight' },
  { title: 'Report / Recap', value: 'Report / Recap' },
  { title: 'Other', value: 'Other' },
]

export const reportTypes = [
  { title: 'Annual Report', value: 'Annual Report' },
  { title: 'Project Report', value: 'Project Report' },
  { title: 'Camp Report', value: 'Camp Report' },
  { title: 'Financial Report', value: 'Financial Report' },
  { title: 'Activity Summary', value: 'Activity Summary' },
  { title: 'Other', value: 'Other' },
]

export const noticeTypes = [
  { title: 'Announcement', value: 'Announcement' },
  { title: 'Event', value: 'Event' },
  { title: 'Reminder', value: 'Reminder' },
  { title: 'Result / Achievement', value: 'Result / Achievement' },
  { title: 'Circular', value: 'Circular' },
  { title: 'Other', value: 'Other' },
]

export const commonImageFields = [
  defineField({
    name: 'alt',
    title: 'Alternative Text',
    type: 'string',
    description: 'Short description for accessibility. Use the title/name if unsure.',
  }),
]
