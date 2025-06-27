import { type SchemaTypeDefinition, defineField } from "sanity"

export const CommitteeMemberSchema: SchemaTypeDefinition = {
  name: "committee-member",
  title: "Committee Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "alt",
      title: "Alt",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image"
    })
  ]
}
