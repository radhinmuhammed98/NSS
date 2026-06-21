# NSS Digital Legacy — Editor Guide

This guide is for the NSS Programme Officer, Volunteer Secretaries, and designated editors who manage the content of the NSS Digital Legacy website using Sanity Studio.

---

## 🚀 Accessing Sanity Studio

Sanity Studio is the content management interface.
1. Run the Studio locally during development using `npm run dev` inside the `studio/` folder.
2. The Studio is available at `http://localhost:3333` (or the configured deploy URL).
3. Log in using your Sanity editor credentials.

---

## 📁 Studio Navigation & Content Categories

The Studio sidebar is organized into clean categories to make editing intuitive:

1.  **Configuration**:
    *   *Website Configuration* (`siteSettings`): Singleton document containing the name of the school, unit, default motto, mission, vision, history, and contact email.
    *   **Note**: There is only one configuration document. You cannot delete it or create a new one. Simply edit the fields and click **Publish**.
2.  **Legacy**:
    *   *Batches*: Create batches representing academic years.
    *   *Journey Timeline*: Add historical milestones of the unit (e.g. awards, foundation).
3.  **Activities**:
    *   *Projects*: Document awareness campaigns, clean-ups, and events.
    *   *Camps*: Document Seven-Day Special Camps, including day-wise reports.
    *   *Project Categories*: Define category folders (e.g. Environment, Health).
4.  **Media**:
    *   *Gallery Albums*: Manage photo galleries.
    *   *Video Clips*: Manage short video clips (direct MP4 links + thumbnails).
    *   *Reports*: Upload PDF reports or link to external documents.
    *   *Highlights*: Manage major highlights/featured achievements.
5.  **People**:
    *   *Team Members*: List of leaders and Programme Officers.
    *   *Volunteer Stories*: Testimonies and quotes from volunteers.
6.  **Notices**:
    *   *Notices & Announcements*: Add announcements, circles, or meetings to the Notices page.

---

## ✍️ Creating Content: Step-by-Step Workflow

When starting a new academic year or logging a new event, follow this recommended sequence to maintain reference links correctly:

### Yearly Setup (At start of academic year)
1.  Go to **Legacy** → **Batches** → Click **Create New**.
2.  Fill in the year range (e.g. `2026–27`), theme, PO/Secretary names, and a cover image. Click **Publish**.
3.  Go to **Configuration** → **Website Configuration**. Update the *Current Academic Year*, *Programme Officer*, and *Volunteer Secretary* fields. Click **Publish**.
4.  Go to **People** → **Team Members**. Create cards for the new committee and PO, linking each to the newly created batch.

### Documenting a Project/Event (After an activity)
1.  *Optional*: If the event has a new category, add it in **Activities** → **Project Categories** first.
2.  Go to **Activities** → **Projects** → Click **Create New**.
3.  Fill in the title, slug, date, category, and batch reference.
4.  Write a summary and the detailed descriptions (problem, actions taken, outcomes).
5.  Upload the cover image and add additional photos to the gallery field.
6.  Click **Publish**.

### Adding a Seven-Day Special Camp
1.  Go to **Activities** → **Camps** → Click **Create New**.
2.  Fill in the details (theme, location, batch link, PO, student leaders).
3.  Under **Day-Wise Schedule**, add 7 entries. Detail each day's inaugurals, guest names, specific activities, and day photos.
4.  Under **Related Projects**, link the projects that were executed during the camp.
5.  Click **Publish**.

---

## 🖼️ Media & Asset Guidelines

To ensure the website remains fast and responsive:
*   **Image Compression**: Compress all images before uploading. Prefer `.webp` or `.jpg` formats. Keep individual image files under **800 KB**.
*   **Video Direct Links**: Do not link YouTube *page* URLs. The frontend video player requires a direct link to the raw video file (e.g. `.mp4` URL). You can host the MP4 file on a cloud service (Dropbox direct link, Google Cloud Storage, or Vercel Blob) and paste the URL.
*   **PDF Reports**: Keep PDF uploads under **5 MB**. If the file is larger, compress it or host it externally and provide the *External PDF URL* instead.

---

## 🛡️ Validation & Safeguards

The Studio has built-in validation rules:
*   Slugs must be generated and unique.
*   Required fields (like title, date, batch links) will show a red warning if left blank, preventing publication.
*   For **Reports**, you must either upload a *Sanity PDF File* or paste an *External PDF URL*.
