import { defineField, SchemaTypeDefinition } from "sanity"

export const LifeMemberSchema: SchemaTypeDefinition = {
  name: "life-member",
  title: "Life Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required()
    })
  ]
}
