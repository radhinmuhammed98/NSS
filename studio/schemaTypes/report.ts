import { defineType, defineField } from "sanity";

export default defineType({
  name: "report",
  title: "Report",
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
      title: "Report Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Report Type",
      type: "string",
      description: "e.g., Annual Report, Audit Report, Camp Report",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Report Date",
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
      name: "pdfFile",
      title: "Sanity PDF File",
      type: "file",
      description: "Upload the PDF report directly to Sanity",
      options: {
        accept: ".pdf",
      },
    }),
    defineField({
      name: "externalUrl",
      title: "External PDF URL",
      type: "url",
      description: "Link to a PDF hosted externally (if not uploaded above)",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isPublic",
      title: "Is Publicly Accessible",
      type: "boolean",
      initialValue: true,
    }),
  ],
  validation: (Rule) =>
    Rule.custom((fields) => {
      if (!fields?.pdfFile && !fields?.externalUrl) {
        return "Either a Sanity PDF File must be uploaded or an External PDF URL must be provided.";
      }
      return true;
    }),
  preview: {
    select: {
      title: "title",
      type: "type",
      year: "year",
    },
    prepare({ title, type, year }) {
      return {
        title,
        subtitle: `${type || ""} (${year || ""})`,
      };
    },
  },
});
