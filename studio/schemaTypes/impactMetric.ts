import { defineType, defineField } from "sanity";

export default defineType({
  name: "impactMetric",
  title: "Impact Metric",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: "e.g., 500+ kg, 120 Hours, 50+",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon Name (Lucide)",
      type: "string",
      description: 'Optional Lucide icon name, e.g. "Trash", "Heart", "Trees"',
    }),
  ],
});
