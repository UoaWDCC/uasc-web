import { SchemaTypeDefinition, defineField } from "sanity"

export const LodgeInfoSchema: SchemaTypeDefinition = {
  name: "lodge-information",
  title: "Lodge Information",
  description: "What to display to the user before they enter the booking view",
  type: "document",
  fields: [
    defineField({
      name: "information",
      description: "An overview of what the user gets out of booking the lodge",
      type: "array",
      of: [{ type: "block" }]
    }),
    defineField({
      name: "images",
      description: "Images used to promote the lodge",
      type: "array",
      of: [{ type: "image" }]
    })
  ]
}
