import { defineType, defineField } from "sanity";

export default defineType({
  name: "highlight",
  title: "Highlight",
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
      title: "Highlight Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Highlight Type",
      type: "string",
      description: "e.g., Award, Milestone, Achievement, Event",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
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
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Highlight Photo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Is Featured Highlight",
      type: "boolean",
      description: "Mark this true if this is a primary highlight of the unit.",
      initialValue: false,
    }),
    defineField({
      name: "priority",
      title: "Priority Weight",
      type: "number",
      description: "Used for sorting featured highlights (smaller number = higher priority/first)",
      initialValue: 10,
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      title: "title",
      type: "type",
      media: "image",
    },
    prepare({ title, type, media }) {
      return {
        title,
        subtitle: type || "",
        media,
      };
    },
  },
});
