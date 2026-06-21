import { defineType, defineField } from "sanity";

export default defineType({
  name: "videoClip",
  title: "Video Clip",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Video Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Video Type / Category",
      type: "string",
      description: "e.g., Documentary, Awareness, Camp, Project",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "batch",
      title: "Batch",
      type: "reference",
      to: [{ type: "batch" }],
      description: "Optional batch association",
    }),
    defineField({
      name: "relatedProject",
      title: "Related Project",
      type: "reference",
      to: [{ type: "project" }],
      description: "Optional project association",
    }),
    defineField({
      name: "relatedCamp",
      title: "Related Camp",
      type: "reference",
      to: [{ type: "camp" }],
      description: "Optional camp association",
    }),
    defineField({
      name: "url",
      title: "Video URL (Direct MP4)",
      type: "url",
      description: "Direct link to the MP4 file (external host)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: "e.g. 1:45, 0:30",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured Video",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      duration: "duration",
      media: "thumbnail",
    },
    prepare({ title, duration, media }) {
      return {
        title,
        subtitle: duration ? `Duration: ${duration}` : "",
        media,
      };
    },
  },
});
