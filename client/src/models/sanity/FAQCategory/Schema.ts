import {
  orderRankField,
  orderRankOrdering
} from "@sanity/orderable-document-list"
import { type SchemaTypeDefinition, defineField } from "sanity"

export const FAQCategorySchema: SchemaTypeDefinition = {
  name: "faq-category",
  title: "FAQ Category",
  description:
    "Categories for organizing FAQ items - each category can contain multiple FAQ items",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "faq-category" }),
    defineField({
      name: "name",
      title: "Category Name",
      description:
        "Name of the FAQ category (e.g., 'Membership', 'Events', 'General', 'Payment')",
      type: "string",
      validation: (v) => v.required().min(1).max(50)
    }),
    defineField({
      name: "description",
      title: "Category Description",
      description:
        "Optional description to help admins understand what types of questions belong in this category",
      type: "text",
      rows: 2
    }),
    defineField({
      name: "faqItems",
      title: "FAQ Items",
      description:
        "The frequently asked questions and answers for this category",
      type: "array",
      of: [
        {
          type: "object",
          name: "faqItem",
          title: "FAQ Item",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              description:
                "The question being asked (e.g., 'What are the club membership fees?', 'When do events typically start?')",
              type: "string",
              validation: (v) => v.required()
            }),
            defineField({
              name: "answer",
              title: "Answer",
              description:
                "The answer to the question - provide clear, detailed information that fully addresses the question",
              type: "text",
              validation: (v) => v.required()
            })
          ],
          preview: {
            select: {
              title: "question",
              subtitle: "answer"
            },
            prepare(selection) {
              const { title, subtitle } = selection
              return {
                title: title,
                subtitle: `${subtitle?.substring(0, 100)}${subtitle?.length > 100 ? "..." : ""}`
              }
            }
          }
        }
      ],
      options: {
        sortable: true
      }
    })
  ]
}
