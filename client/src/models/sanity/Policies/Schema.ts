import { SchemaTypeDefinition, defineField } from "sanity"

export const PoliciesSchema: SchemaTypeDefinition = {
  name: "policies",
  title: "Policies",
  description: "Display the policies of the lodge when the user is booking",
  type: "document",
  fields: [
    defineField({
      name: "information",
      description:
        "A list of policies to display to the user (Behaviour, Cancellation and Lodge Bookings.)",
      type: "array",
      of: [{ type: "block" }]
    })
  ]
}
