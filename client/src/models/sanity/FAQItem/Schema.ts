import { type SchemaTypeDefinition, defineField } from "sanity"

export const FAQItemSchema: SchemaTypeDefinition = {
  name: "faq-item",
  title: "FAQ Item",
  description: "Frequently Asked Questions - Will be displayed on the FAQ page",
  type: "document",
  fields: [
    defineField({
      name: "question",
      description: "The question being asked",
      type: "string",
      validation: (v) => v.required()
    }),
    defineField({
      name: "answer",
      description: "The answer to the question",
      type: "text",
      validation: (v) => v.required()
    }),
    defineField({
      name: "order",
      description:
        "Order in which the FAQ item should appear (lower numbers appear first)",
      type: "number",
      validation: (v) => v.required().min(0)
    }),
    defineField({
      name: "category",
      description: "Category for grouping related FAQ items",
      type: "string"
    })
  ]
}
