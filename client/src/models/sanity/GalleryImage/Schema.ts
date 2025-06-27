import { type SchemaTypeDefinition, defineField } from "sanity"

export const GalleryImageSchema: SchemaTypeDefinition = {
  name: "gallery-image",
  title: "Gallery Image",
  description: "An image that will be displayed in the gallery",
  type: "document",
  fields: [
    defineField({
      name: "title",
      description: "The title of the image",
      type: "string",
      validation: (v) => v.required()
    }),
    defineField({
      name: "description",
      description: "A description of the image",
      type: "text",
      validation: (v) => v.required()
    }),
    defineField({
      name: "image",
      description: "The image to be displayed",
      type: "image",
      validation: (v) => v.required()
    }),
    defineField({
      name: "year",
      description: "The year the image was taken",
      type: "number",
      validation: (v) => v.required()
    }),
    defineField({
      name: "event",
      description: "The event the image was taken at",
      type: "string"
    }),
    defineField({
      name: "location",
      description: "The location the image was taken at",
      type: "string"
    })
  ]
}
