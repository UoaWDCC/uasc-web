import { defineField, Image, SchemaTypeDefinition } from "sanity"

/**
 * All about items ordered by created
 */
export const ABOUT_ITEMS_GROQ_QUERY =
  `*[_type == "about-item"] | order(_createdAt asc)` as const

export type AboutItem = {
  _id: string
  title?: string
  description?: string
  image?: Image
}

export const AboutItemSchema: SchemaTypeDefinition = {
  name: "about-item",
  title: "About Item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string"
    }),
    defineField({
      name: "description",
      type: "string"
    }),
    defineField({
      name: "image",
      type: "image"
    })
  ]
}
