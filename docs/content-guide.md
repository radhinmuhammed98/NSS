# NSS Digital Legacy — Content Guide

This guide explains the content structures and formatting requirements for the National Service Scheme (NSS) Digital Legacy platform. Follow these specifications when preparing or editing content.

---

## 📅 Batches

A Batch represents an academic year of the NSS unit (e.g., 2025–26). All activities, gallery albums, team members, and reports are linked to a specific batch.

### Required Fields
*   **Title**: Unique display title (e.g. `Batch 2025–26`).
*   **Year Range**: Standard year range format (e.g. `2025–26`).
*   **Start Year**: Numeric year (e.g. `2025`). Used for sorting (newest first).
*   **Theme**: The main slogan/motto of this batch (e.g. `Seeds of Change`).
*   **Description**: A detailed summary of the batch's objectives and focus.
*   **Cover Image**: A high-quality wide photograph representing the batch.
*   **Programme Officer**: Name of the supervising faculty member.
*   **Volunteer Secretary**: Name of the student leader.
*   **Volunteer Leaders**: Names of other key leaders/coordinators.
*   **Volunteer Count**: Total number of registered volunteers.
*   **Impact Metrics**: A list of key numeric stats achieved by the batch.
*   **Featured**: Mark `true` if this is the active/current batch of the unit (only one batch should be marked featured at a time).

---

## 🛠️ Projects

Projects are campaigns, awareness programmes, and service initiatives conducted by the unit.

### Required Fields
*   **Title**: Clear, descriptive name (e.g. `Anti-Drug Awareness Cycle Rally`).
*   **Date**: The exact date the project was executed (YYYY-MM-DD).
*   **Year**: Numeric year.
*   **Batch**: Reference to the corresponding academic year batch.
*   **Category**: Reference to a Project Category (e.g. Environment, Health).
*   **Location**: Venue or community area.
*   **Status**: `completed`, `ongoing`, or `planned`.
*   **Summary**: A short 1-2 sentence preview for cards.
*   **Description**: Detailed write-up explaining why the project was undertaken and what it achieved.
*   **Problem Addressed**: Explanation of the community problem/need.
*   **What NSS Did**: Details of actions taken by the volunteers.
*   **Cover Image**: Main photo for the project page and card.
*   **Images**: Optional list of additional photos from the activity with captions and credits.
*   **Impact Metrics**: Key statistics achieved (e.g. `200+ trees planted`, `150 participants`).
*   **Organizers**: Names of student coordinators.
*   **Camp Related**: Check if the project was executed as part of a Seven-Day Special Camp.
*   **Related Camp**: Reference to the special camp (if camp-related).

---

## 🏕️ Camps

Camps are the Seven-Day Special Camps conducted annually by the NSS unit.

### Required Fields
*   **Title**: E.g. `Seven-Day Special Camp 2026`.
*   **Year**: Numeric year.
*   **Batch**: Reference to the corresponding batch.
*   **Location**: Host village or ward name.
*   **Theme**: The special camp theme (e.g. `Healthy Youth for Healthy India`).
*   **Start Date** & **End Date**: Seven-day date range.
*   **Summary**: 1-2 sentence card summary.
*   **Description**: In-depth description of the camp's scope.
*   **Programme Officer**: PO name.
*   **Camp Leaders**: Student leaders.
*   **Volunteer Count**: Number of campers.
*   **Cover Image**: Main camp group photo.
*   **Day-Wise Activities**: 7 entries containing:
    *   *Day Number*: 1 to 7.
    *   *Date*: YYYY-MM-DD.
    *   *Title*: E.g., `Day 1: Inaugural Session & Survey`.
    *   *Description*: Summary of that day's events.
    *   *Activities*: List of tasks completed.
    *   *Guests*: Visiting dignitaries/speakers.
    *   *Images*: Photos from that specific day.
*   **Projects**: References to projects executed during the camp.
*   **Impact Metrics**: Camp-wide statistics (e.g., `1 pond restored`, `50 surveys completed`).

---

## 🖼️ Gallery Albums

Used to group event photos into logical albums.

### Required Fields
*   **Title**: E.g., `World Environment Day Celebration`.
*   **Date**: Event date.
*   **Year**: Numeric year.
*   **Batch**: Reference to the corresponding batch.
*   **Album Type**: Category classification (e.g., Campaign, Camp, Celebration).
*   **Description**: Short summary.
*   **Cover Image**: Album thumbnail.
*   **Images**: Array of photos containing image files, alt texts, captions, and photographer credits.

---

## 🎥 Video Clips

Short video clips documenting events, camps, and campaigns.

### Required Fields
*   **Title**: Video title.
*   **Type**: e.g., Camp Highlights, Documentary.
*   **Year**: Numeric year.
*   **Batch**: Reference to the batch.
*   **URL**: Direct link to the hosted MP4 file. Do not use standard YouTube page URLs; it must be a direct MP4 link (or supported HTML5 video stream URL) for the native video modal player.
*   **Thumbnail**: Uploaded cover image for the video preview card.
*   **Duration**: E.g. `2:15`, `0:45`.
*   **Description**: Short caption text.

---

## 📄 Reports

Official documents (annual reports, audits, camp reports) preserved for reference.

### Required Fields
*   **Title**: e.g. `NSS Annual Activity Report 2025–26`.
*   **Type**: e.g. Annual Report, Audit Report.
*   **Date**: Date published.
*   **Year**: Publication year.
*   **Batch**: Reference to the batch.
*   **File Resource**: Either upload a PDF file to Sanity directly OR specify an external URL.
*   **Description**: Quick details on what the document covers.

---

## 🏆 Highlights

Unit milestones, major awards, and key pride items.

### Required Fields
*   **Title**: E.g. `Best NSS Unit Award`.
*   **Type**: e.g. Award, Milestone.
*   **Date** & **Year**: Achievement date.
*   **Batch**: Reference to the batch.
*   **Image**: Highlight display photo.
*   **Description**: Summary of the honor/milestone.
*   **Featured**: Mark true to highlight this on the Home page.
*   **Priority Weight**: Numeric order (e.g. `0` is highest priority, showing first).

---

## 👥 Team Members

Roster of leaders and officers.

### Required Fields
*   **Name**: Display name.
*   **Role**: e.g. Programme Officer, Volunteer Secretary.
*   **Batch**: Reference to the batch they belong to.
*   **Photo**: Portrait image.
*   **Bio**: Brief sentence.
*   **Display Order**: Numeric ordering (e.g. PO = 1, Secretary = 2, Leaders = 3+).

---

## 💬 Volunteer Stories

Reflections and first-hand testimonies from volunteers.

### Required Fields
*   **Name**: Volunteer name.
*   **Batch**: Reference to their batch.
*   **Photo**: Volunteer photo.
*   **Quote**: Pull quote displayed prominently.
*   **Title**: Title of their testimonial.
*   **Story**: Full text.
