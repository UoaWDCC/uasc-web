import { type SchemaTypeDefinition, defineField } from "sanity"

export const PoliciesSchema: SchemaTypeDefinition = {
  name: "policies",
  title: "Policies",
  description: "Display the policies of the lodge when the user is booking",
  type: "document",
  fields: [
    defineField({
      name: "order",
      description:
        "The order in which the policy should be displayed to the user",
      type: "number"
    }),
    defineField({
      name: "title",
      description: "The title of the policy",
      type: "string"
    }),
    defineField({
      name: "information",
      description:
        "A list of policies to display to the user (Behaviour, Cancellation and Lodge Bookings.)",
      type: "array",
      of: [{ type: "block" }]
    })
  ]
}
