import { defineType, defineField } from "sanity";

export default defineType({
  name: "batch",
  title: "Batch",
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
      title: "Batch Title",
      type: "string",
      placeholder: "e.g. Batch 2025–26",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "yearRange",
      title: "Year Range",
      type: "string",
      placeholder: "e.g. 2025–26",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Start Year",
      type: "number",
      description: "Used for sorting (e.g., 2025)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "theme",
      title: "Batch Theme/Motto",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "programmeOfficer",
      title: "Programme Officer",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "volunteerSecretary",
      title: "Volunteer Secretary",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "leaders",
      title: "Volunteer Leaders",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "volunteerCount",
      title: "Volunteer Count",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "impactMetrics",
      title: "Batch Impact Metrics",
      type: "array",
      of: [{ type: "impactMetric" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured / Current Batch",
      type: "boolean",
      description: "Mark this true if this is the active/current batch of the unit.",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "yearRange",
      media: "coverImage",
    },
  },
});
