const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

const token = process.argv[2] || process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error('Error: Please provide your Sanity Write Token as an argument or set SANITY_WRITE_TOKEN env variable.');
  console.error('Usage: node scripts/importToSanity.js <YOUR_SANITY_WRITE_TOKEN>');
  process.exit(1);
}

const client = createClient({
  projectId: 'o5r7P6oq4',
  dataset: 'production',
  token: token,
  useCdn: false,
  apiVersion: '2026-01-01',
});

async function run() {
  try {
    console.log('🚀 Starting import to Sanity project o5r7P6oq4...');

    // 1. Upload logos
    console.log('\n🖼️ Uploading logos...');
    const schoolLogoPath = path.join(__dirname, '../public/khm-logo.webp');
    const nssLogoPath = path.join(__dirname, '../public/nss-logo.svg');

    let schoolLogoAsset = null;
    let nssLogoAsset = null;

    if (fs.existsSync(schoolLogoPath)) {
      schoolLogoAsset = await client.assets.upload('image', fs.createReadStream(schoolLogoPath));
      console.log('✅ Uploaded school logo');
    }
    if (fs.existsSync(nssLogoPath)) {
      nssLogoAsset = await client.assets.upload('image', fs.createReadStream(nssLogoPath));
      console.log('✅ Uploaded NSS logo');
    }

    // 2. Upload assets in src/assets
    console.log('\n📸 Uploading assets in src/assets...');
    const assetNames = [
      'IMG-20260625-WA0029.jpg',
      'IMG-20260626-WA0004.jpg',
      'IMG-20260626-WA0005.jpg',
      'IMG-20260626-WA0006.jpg',
      'IMG-20260626-WA0007.jpg',
      'IMG-20260626-WA0008.jpg',
      'IMG-20260626-WA0009.jpg',
      'IMG-20260626-WA0010.jpg',
      'IMG-20260626-WA0011.jpg',
      'IMG-20260626-WA0012.jpg',
      'IMG-20260626-WA0013.jpg',
      'IMG-20260626-WA0014.jpg',
      'IMG-20260626-WA0015.jpg',
      'IMG-20260626-WA0016.jpg',
      'IMG-20260626-WA0017.jpg',
      'IMG-20260626-WA0018.jpg',
      'IMG-20260626-WA0019.jpg',
      'IMG-20260626-WA0020.jpg',
    ];

    const assetsMap = {};
    for (const name of assetNames) {
      const assetPath = path.join(__dirname, '../src/assets', name);
      if (fs.existsSync(assetPath)) {
        console.log(`Uploading ${name}...`);
        const asset = await client.assets.upload('image', fs.createReadStream(assetPath));
        assetsMap[name] = asset;
        console.log(`✅ Uploaded ${name}`);
      } else {
        console.warn(`⚠️ File not found: ${assetPath}`);
      }
    }

    // 3. Create siteSettings document
    console.log('\n⚙️ Creating siteSettings singleton document...');
    const siteSettingsDoc = {
      _id: 'siteSettings',
      _type: 'siteSettings',
      schoolName: 'KHMHSS Valakkulam',
      unitName: 'National Service Scheme (NSS) Unit 466',
      motto: 'Not Me, But You',
      location: 'Thennala, Malappuram, Kerala – 676508',
      academicYear: '2025–26',
      schoolLogo: schoolLogoAsset ? { _type: 'image', asset: { _ref: schoolLogoAsset._id } } : undefined,
      nssLogo: nssLogoAsset ? { _type: 'image', asset: { _ref: nssLogoAsset._id } } : undefined,
      principal: 'Asif PA',
      programmeOfficer: 'Dr. Broose KV',
      volunteerSecretary: 'Ismail Ansari KF',
      volunteerStrength: 50,
      email: 'khmhsvalakulam@gmail.com',
      phone: '0494 2496753',
      footerDescription: 'A living archive of service, leadership, camps, projects, and memories. Every batch serves and leaves, but their journey stays forever.',
    };
    await client.createOrReplace(siteSettingsDoc);
    console.log('✅ Created siteSettings document');

    // 4. Create batch document
    console.log('\n🎓 Creating batch document...');
    const batchId = 'batch-2025-26';
    const batchDoc = {
      _id: batchId,
      _type: 'batch',
      title: 'Batch 2025-26',
      slug: { _type: 'slug', current: 'batch-2025-26' },
      academicYear: '2025-26',
      status: 'current',
      description: 'The active batch serving the community.',
      leader1Name: 'Ismail Ansari KF',
      leader1Role: 'Volunteer Secretary',
      leader2Name: '(Name Coming Soon)',
      leader2Role: 'Volunteer Secretary',
    };
    await client.createOrReplace(batchDoc);
    console.log('✅ Created batch-2025-26 document');

    // 5. Create team members
    console.log('\n👥 Creating team members...');
    const teamMembers = [
      {
        _id: 'principal-asif-pa',
        _type: 'teamMember',
        name: 'Asif PA',
        role: 'Principal',
        batch: { _type: 'reference', _ref: batchId },
        bio: "School Administrator guiding the NSS unit's school-level initiatives.",
        order: 1,
      },
      {
        _id: 'po-broose-kv',
        _type: 'teamMember',
        name: 'Dr. Broose KV',
        role: 'Programme Officer',
        batch: { _type: 'reference', _ref: batchId },
        bio: "NSS Programme Officer directing the unit's community and social activities.",
        order: 2,
      },
    ];

    for (const member of teamMembers) {
      await client.createOrReplace(member);
      console.log(`✅ Created team member: ${member.name}`);
    }

    // 6. Create projects
    console.log('\n🛠️ Creating projects...');
    const projectDocs = [
      {
        _id: 'project-blood-donation-camp',
        _type: 'project',
        title: 'Blood Donation Camp',
        slug: { _type: 'slug', current: 'blood-donation-camp' },
        date: '2025-11-20',
        coverImage: assetsMap['IMG-20260626-WA0004.jpg'] ? { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0004.jpg']._id } } : undefined,
        description: 'Volunteers supported hospital staff, arranged the registration desks, donor beds, and awareness banners to encourage participation from eligible volunteers and teachers.',
        location: 'School Campus',
        status: 'completed',
        campRelated: false,
        featured: true,
        batch: { _type: 'reference', _ref: batchId },
        category: 'Blood Donation',
        images: [
          assetsMap['IMG-20260626-WA0004.jpg'] ? { _type: 'imageAsset', _key: 'img04', image: { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0004.jpg']._id } }, alt: 'Volunteers at registration', caption: 'Registration counter' } : null,
          assetsMap['IMG-20260626-WA0009.jpg'] ? { _type: 'imageAsset', _key: 'img09', image: { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0009.jpg']._id } }, alt: 'Donor setup', caption: 'Camp setup' } : null,
        ].filter(Boolean),
      },
      {
        _id: 'project-childrens-day-celebration',
        _type: 'project',
        title: "Children's Day Celebration",
        slug: { _type: 'slug', current: 'childrens-day-celebration' },
        date: '2025-11-14',
        coverImage: assetsMap['IMG-20260626-WA0010.jpg'] ? { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0010.jpg']._id } } : undefined,
        description: 'Volunteers visited local primary school kids, hosting interactive activities, teaching simple songs, and sharing treats to build school-community relationships.',
        location: 'AUP School, Valakkulam',
        status: 'completed',
        campRelated: false,
        featured: true,
        batch: { _type: 'reference', _ref: batchId },
        category: 'Education',
        images: [
          assetsMap['IMG-20260626-WA0010.jpg'] ? { _type: 'imageAsset', _key: 'img10', image: { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0010.jpg']._id } }, alt: 'Volunteers with kids', caption: 'Interactive games' } : null,
          assetsMap['IMG-20260626-WA0011.jpg'] ? { _type: 'imageAsset', _key: 'img11', image: { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0011.jpg']._id } }, alt: 'Activity session', caption: 'Volunteers teaching songs' } : null,
          assetsMap['IMG-20260626-WA0012.jpg'] ? { _type: 'imageAsset', _key: 'img12', image: { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0012.jpg']._id } }, alt: 'Group photo with students', caption: 'Valedictory photo' } : null,
        ].filter(Boolean),
      },
      {
        _id: 'project-inter-district-monitoring',
        _type: 'project',
        title: 'Inter-District Monitoring Visit',
        slug: { _type: 'slug', current: 'inter-district-monitoring' },
        date: '2026-02-12',
        coverImage: assetsMap['IMG-20260626-WA0013.jpg'] ? { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0013.jpg']._id } } : undefined,
        description: "The unit presented its records, service books, and program logs for official evaluation by the district coordinator, who reviewed regular activities and special camp accomplishments.",
        location: 'NSS Room, KHMHSS',
        status: 'completed',
        campRelated: false,
        featured: false,
        batch: { _type: 'reference', _ref: batchId },
        category: 'Other',
        images: [
          assetsMap['IMG-20260626-WA0013.jpg'] ? { _type: 'imageAsset', _key: 'img13', image: { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0013.jpg']._id } }, alt: 'Record book review', caption: 'Register audit' } : null,
          assetsMap['IMG-20260626-WA0014.jpg'] ? { _type: 'imageAsset', _key: 'img14', image: { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0014.jpg']._id } }, alt: 'Monitoring evaluation', caption: 'District coordinator review' } : null,
        ].filter(Boolean),
      },
    ];

    for (const project of projectDocs) {
      await client.createOrReplace(project);
      console.log(`✅ Created project: ${project.title}`);
    }

    // 7. Create camp document
    console.log('\n🏕️ Creating camp document...');
    const campId = 'camp-seven-day-special-camp';
    const campDoc = {
      _id: campId,
      _type: 'camp',
      title: 'Seven-Day Special Camp',
      slug: { _type: 'slug', current: 'seven-day-special-camp' },
      year: 2026,
      startDate: '2026-01-02',
      endDate: '2026-01-08',
      location: 'Ward Community Centre',
      theme: 'Service and Self-Sufficiency',
      summary: 'A week-long residential camp for volunteers focusing on community surveys, cleaning, and interactive sessions.',
      description: 'Volunteers stayed in the community, managed daily cooking, cleanup, field tasks, and conducted social surveys to understand local civic needs.',
      programmeOfficer: 'Dr. Broose KV',
      volunteerCount: 50,
      coverImage: assetsMap['IMG-20260626-WA0005.jpg'] ? { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0005.jpg']._id } } : undefined,
      batch: { _type: 'reference', _ref: batchId },
      dayWiseActivities: [
        {
          _key: 'day1',
          dayNumber: 1,
          date: '2026-01-02',
          title: 'Camp Inauguration & Orientation',
          description: 'Official flag hoisting and registration of resident camp volunteers.',
          activities: ['Flag hoisting', 'Orientation session', 'Committee formation'],
          images: [
            assetsMap['IMG-20260626-WA0005.jpg'] ? { _type: 'imageAsset', _key: 'img05', image: { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0005.jpg']._id } }, alt: 'Inauguration group', caption: 'Inauguration ceremony' } : null,
          ].filter(Boolean),
        },
        {
          _key: 'day2',
          dayNumber: 2,
          date: '2026-01-03',
          title: 'Community Survey & Interaction',
          description: 'Volunteers visited local households to compile basic civic needs.',
          activities: ['Household visits', 'Survey data collection'],
          images: [
            assetsMap['IMG-20260626-WA0006.jpg'] ? { _type: 'imageAsset', _key: 'img06', image: { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0006.jpg']._id } }, alt: 'Survey visit', caption: 'Outreach field work' } : null,
          ].filter(Boolean),
        },
        {
          _key: 'day3',
          dayNumber: 3,
          date: '2026-01-04',
          title: 'Local Cleaning Drive',
          description: 'Cleaning and clearing public pathways and school surrounds.',
          activities: ['Pathway cleanup', 'Segregation of collected waste'],
          images: [
            assetsMap['IMG-20260626-WA0007.jpg'] ? { _type: 'imageAsset', _key: 'img07', image: { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0007.jpg']._id } }, alt: 'Volunteers cleaning', caption: 'Physical labor session' } : null,
          ].filter(Boolean),
        },
        {
          _key: 'day4',
          dayNumber: 4,
          date: '2026-01-05',
          title: 'Hygiene & Health Session',
          description: 'Conducted health awareness interaction for residents.',
          activities: ['Health awareness talks'],
        },
        {
          _key: 'day5',
          dayNumber: 5,
          date: '2026-01-06',
          title: 'Environmental Sapling Plantation',
          description: 'Planting native trees in public spaces and campus surrounds.',
          activities: ['Digging and sapling plantation'],
          images: [
            assetsMap['IMG-20260626-WA0008.jpg'] ? { _type: 'imageAsset', _key: 'img08', image: { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0008.jpg']._id } }, alt: 'Sapling planting', caption: 'Green campaign planting' } : null,
          ].filter(Boolean),
        },
        {
          _key: 'day6',
          dayNumber: 6,
          date: '2026-01-07',
          title: 'Camp Fire & Cultural Session',
          description: 'Volunteers hosted simple cultural activities and folk songs by the fire.',
          activities: ['Folk songs', 'Team reflections'],
        },
        {
          _key: 'day7',
          dayNumber: 7,
          date: '2026-01-08',
          title: 'Valedictory & Review',
          description: 'Concluding session with feedback collection and cleaning of the camp facility.',
          activities: ['Feedback collection', 'Camp facility cleanup'],
        },
      ],
      featured: true,
    };
    await client.createOrReplace(campDoc);
    console.log('✅ Created camp document');

    // 8. Create gallery albums
    console.log('\n🖼️ Creating gallery albums...');
    const galleryAlbumDocs = [
      {
        _id: 'album-blood-donation-camp',
        _type: 'galleryAlbum',
        title: 'Blood Donation Camp',
        slug: { _type: 'slug', current: 'blood-donation-camp-album' },
        date: '2025-11-20',
        year: 2025,
        type: 'Project Album',
        description: 'Activity photos from the blood donation drive.',
        coverImage: assetsMap['IMG-20260626-WA0004.jpg'] ? { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0004.jpg']._id } } : undefined,
        batch: { _type: 'reference', _ref: batchId },
        images: [
          assetsMap['IMG-20260626-WA0004.jpg'] ? { _type: 'imageAsset', _key: 'img04', image: { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0004.jpg']._id } }, alt: 'Volunteers at registration table', caption: 'Registration counter' } : null,
          assetsMap['IMG-20260626-WA0009.jpg'] ? { _type: 'imageAsset', _key: 'img09', image: { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0009.jpg']._id } }, alt: 'Donor room setup', caption: 'Camp setup' } : null,
        ].filter(Boolean),
      },
      {
        _id: 'album-childrens-day',
        _type: 'galleryAlbum',
        title: "Children's Day Celebration",
        slug: { _type: 'slug', current: 'childrens-day-album' },
        date: '2025-11-14',
        year: 2025,
        type: 'Project Album',
        description: 'Photos from our primary school interactive program.',
        coverImage: assetsMap['IMG-20260626-WA0010.jpg'] ? { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0010.jpg']._id } } : undefined,
        batch: { _type: 'reference', _ref: batchId },
        images: [
          assetsMap['IMG-20260626-WA0010.jpg'] ? { _type: 'imageAsset', _key: 'img10', image: { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0010.jpg']._id } }, alt: 'Volunteers playing with children', caption: 'Interactive games' } : null,
          assetsMap['IMG-20260626-WA0011.jpg'] ? { _type: 'imageAsset', _key: 'img11', image: { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0011.jpg']._id } }, alt: 'Singing session', caption: 'Volunteers teaching songs' } : null,
          assetsMap['IMG-20260626-WA0012.jpg'] ? { _type: 'imageAsset', _key: 'img12', image: { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0012.jpg']._id } }, alt: 'Group photo with primary students', caption: 'Valedictory photo' } : null,
        ].filter(Boolean),
      },
      {
        _id: 'album-special-camp',
        _type: 'galleryAlbum',
        title: 'Special Camp',
        slug: { _type: 'slug', current: 'special-camp-album' },
        date: '2026-01-08',
        year: 2026,
        type: 'Camp Album',
        description: 'Captures from the seven-day residential special camp.',
        coverImage: assetsMap['IMG-20260626-WA0005.jpg'] ? { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0005.jpg']._id } } : undefined,
        batch: { _type: 'reference', _ref: batchId },
        images: [
          assetsMap['IMG-20260626-WA0005.jpg'] ? { _type: 'imageAsset', _key: 'img05', image: { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0005.jpg']._id } }, alt: 'Inauguration ceremony', caption: 'Inauguration gathering' } : null,
          assetsMap['IMG-20260626-WA0006.jpg'] ? { _type: 'imageAsset', _key: 'img06', image: { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0006.jpg']._id } }, alt: 'Volunteers heading out', caption: 'Outreach field work' } : null,
          assetsMap['IMG-20260626-WA0007.jpg'] ? { _type: 'imageAsset', _key: 'img07', image: { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0007.jpg']._id } }, alt: 'Volunteers cleaning paths', caption: 'Physical labor session' } : null,
          assetsMap['IMG-20260626-WA0008.jpg'] ? { _type: 'imageAsset', _key: 'img08', image: { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0008.jpg']._id } }, alt: 'Sapling planting', caption: 'Green campaign planting' } : null,
        ].filter(Boolean),
      },
      {
        _id: 'album-monitoring-visit',
        _type: 'galleryAlbum',
        title: 'Monitoring Visit',
        slug: { _type: 'slug', current: 'monitoring-visit-album' },
        date: '2026-02-12',
        year: 2026,
        type: 'Project Album',
        description: 'Documentation and record evaluation by district coordinator.',
        coverImage: assetsMap['IMG-20260626-WA0013.jpg'] ? { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0013.jpg']._id } } : undefined,
        batch: { _type: 'reference', _ref: batchId },
        images: [
          assetsMap['IMG-20260626-WA0013.jpg'] ? { _type: 'imageAsset', _key: 'img13', image: { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0013.jpg']._id } }, alt: 'Reviewing camp logs', caption: 'Register audit' } : null,
          assetsMap['IMG-20260626-WA0014.jpg'] ? { _type: 'imageAsset', _key: 'img14', image: { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0014.jpg']._id } }, alt: 'Coordinator evaluation', caption: 'District coordinator review' } : null,
        ].filter(Boolean),
      },
      {
        _id: 'album-unit-life',
        _type: 'galleryAlbum',
        title: 'Unit Life',
        slug: { _type: 'slug', current: 'unit-life-album' },
        date: '2026-02-15',
        year: 2026,
        type: 'Other',
        description: 'Regular activities, meetings, and volunteer life.',
        coverImage: assetsMap['IMG-20260626-WA0015.jpg'] ? { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0015.jpg']._id } } : undefined,
        batch: { _type: 'reference', _ref: batchId },
        images: [
          assetsMap['IMG-20260626-WA0015.jpg'] ? { _type: 'imageAsset', _key: 'img15', image: { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0015.jpg']._id } }, alt: 'Volunteers gathering', caption: 'Unit meeting' } : null,
          assetsMap['IMG-20260626-WA0016.jpg'] ? { _type: 'imageAsset', _key: 'img16', image: { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0016.jpg']._id } }, alt: 'Group discussion', caption: 'Committee session' } : null,
          assetsMap['IMG-20260626-WA0017.jpg'] ? { _type: 'imageAsset', _key: 'img17', image: { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0017.jpg']._id } }, alt: 'Campus regular activity', caption: 'Campus cleanup work' } : null,
          assetsMap['IMG-20260626-WA0018.jpg'] ? { _type: 'imageAsset', _key: 'img18', image: { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0018.jpg']._id } }, alt: 'Volunteers interacting', caption: 'Volunteer team life' } : null,
        ].filter(Boolean),
      },
    ];

    for (const album of galleryAlbumDocs) {
      await client.createOrReplace(album);
      console.log(`✅ Created gallery album: ${album.title}`);
    }

    // 9. Create video clips
    console.log('\n📹 Creating video clips...');
    const videoDocs = [
      {
        _id: 'video-nss-orientation',
        _type: 'videoClip',
        title: 'NSS Orientation Program - Activity Video',
        slug: { _type: 'slug', current: 'nss-orientation-video' },
        type: 'Project Clip',
        year: 2025,
        videoUrl: 'https://www.youtube.com/watch?v=ORIENTATION_PLACEHOLDER', // Placeholder for actual link
        thumbnail: assetsMap['IMG-20260625-WA0029.jpg'] ? { _type: 'image', asset: { _ref: assetsMap['IMG-20260625-WA0029.jpg']._id } } : undefined,
        duration: '1:42',
        description: 'Orientation program welcoming the active batch of volunteers.',
        featured: true,
        batch: { _type: 'reference', _ref: batchId },
      },
      {
        _id: 'video-special-camp-work',
        _type: 'videoClip',
        title: 'Special Camp - Activity Video',
        slug: { _type: 'slug', current: 'special-camp-work-video' },
        type: 'Camp Clip',
        year: 2026,
        videoUrl: 'https://www.youtube.com/watch?v=CAMP_WORK_PLACEHOLDER',
        thumbnail: assetsMap['IMG-20260626-WA0004.jpg'] ? { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0004.jpg']._id } } : undefined,
        duration: '0:35',
        description: 'Volunteer field work and daily camp operations recap.',
        featured: true,
        batch: { _type: 'reference', _ref: batchId },
        relatedCamp: { _type: 'reference', _ref: campId },
      },
      {
        _id: 'video-community-service-cleaning',
        _type: 'videoClip',
        title: 'Community Service Cleaning - Activity Video',
        slug: { _type: 'slug', current: 'community-service-cleaning-video' },
        type: 'Camp Clip',
        year: 2026,
        videoUrl: 'https://www.youtube.com/watch?v=CLEANING_PLACEHOLDER',
        thumbnail: assetsMap['IMG-20260626-WA0005.jpg'] ? { _type: 'image', asset: { _ref: assetsMap['IMG-20260626-WA0005.jpg']._id } } : undefined,
        duration: '0:45',
        description: 'Volunteers clearing public spaces and paths during special camp.',
        featured: true,
        batch: { _type: 'reference', _ref: batchId },
        relatedCamp: { _type: 'reference', _ref: campId },
      },
    ];

    for (const video of videoDocs) {
      await client.createOrReplace(video);
      console.log(`✅ Created video: ${video.title}`);
    }

    // 10. Create donation info
    console.log('\n💳 Creating donation config document...');
    const donationDoc = {
      _id: 'donation',
      _type: 'donation',
      enabled: true,
      upiId: 'nsskhmhss@okaxis',
      bankAccount: {
        name: 'NSS Unit 466 KHMHSS',
        account: '123456789012',
        ifsc: 'SBIN0001234',
        bank: 'State Bank of India',
        branch: 'Valakkulam',
      },
    };
    await client.createOrReplace(donationDoc);
    console.log('✅ Created donation document');

    // 11. Create social links
    console.log('\n🔗 Creating socialLinks config document...');
    const socialLinksDoc = {
      _id: 'socialLinks',
      _type: 'socialLinks',
      facebook: 'https://facebook.com/nssvalakkulam',
      instagram: 'https://instagram.com/nssvalakkulam',
      youtube: 'https://youtube.com/@nssvalakkulam',
      twitter: 'https://twitter.com/nssvalakkulam',
    };
    await client.createOrReplace(socialLinksDoc);
    console.log('✅ Created socialLinks document');

    console.log('\n🎉 ALL MOCK DATA AND IMAGES UPLOADED TO SANITY SUCCESSFULLY!');
  } catch (err) {
    console.error('\n❌ Import failed:', err);
  }
}

run();
