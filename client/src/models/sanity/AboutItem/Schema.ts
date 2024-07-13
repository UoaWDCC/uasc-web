import { defineField, SchemaTypeDefinition } from "sanity"

export const AboutItemSchema: SchemaTypeDefinition = {
  name: "about-item",
  title: "About Item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Valid) => Valid.required()
    }),
    defineField({
      name: "description",
      type: "text",
      validation: (Valid) => Valid.required()
    }),
    defineField({
      name: "image",
      type: "image",
      validation: (Valid) => Valid.required()
    })
  ]
}
