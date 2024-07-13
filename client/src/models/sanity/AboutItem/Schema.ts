import { defineField, SchemaTypeDefinition } from "sanity"

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
