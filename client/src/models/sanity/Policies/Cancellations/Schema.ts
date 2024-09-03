import { SchemaTypeDefinition, defineField } from "sanity"

export const CancellationsSchema: SchemaTypeDefinition = {
  name: "cancellations",
  title: "Cancellations",
  description: "Policies for the user to agree to before booking",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: "e.g Cancellation Policy",
      validation: (v) => v.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description:
        "e.g. The club’s cancellation rules are set out below. UASC is a non-profit student club that survives on a limited income, and by cancelling at the last minute, we may be unable to find someone else to fill the gaps. Please keep this in mind when making a booking.\nAll cancellations must be formally communicated via email to the Bookings Officer at bookings@uasc.co.nz in accordance with the specified timelines and procedures.",
      validation: (v) => v.required()
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      description: "e.g. Member Cancellations",
      validation: (v) => v.required()
    }),
    defineField({
      name: "list",
      title: "List",
      type: "array",
      of: [
        {
          type: "object",
          name: "listItem",
          title: "List Item",
          fields: [
            {
              name: "description",
              title: "Description",
              type: "text",
              validation: (v) => v.required()
            }
          ]
        }
      ]
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      description: "e.g. Guest Cancellations",
      validation: (v) => v.required()
    }),
    defineField({
      name: "list",
      title: "List",
      type: "array",
      of: [
        {
          type: "object",
          name: "listItem",
          title: "List Item",
          fields: [
            {
              name: "description",
              title: "Description",
              type: "text",
              validation: (v) => v.required()
            }
          ]
        }
      ]
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      description: "e.g. Further Information",
      validation: (v) => v.required()
    }),
    defineField({
      name: "list",
      title: "List",
      type: "array",
      of: [
        {
          type: "object",
          name: "listItem",
          title: "List Item",
          fields: [
            {
              name: "description",
              title: "Description",
              type: "text",
              validation: (v) => v.required()
            }
          ]
        }
      ]
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      description: "e.g. Road and Weather Conditions",
      validation: (v) => v.required()
    }),
    defineField({
      name: "list",
      title: "List",
      type: "array",
      of: [
        {
          type: "object",
          name: "listItem",
          title: "List Item",
          fields: [
            {
              name: "description",
              title: "Description",
              type: "text",
              validation: (v) => v.required()
            }
          ]
        }
      ]
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description:
        "e.g. For further enquiries or assistance, please direct your correspondence to bookings@uasc.co.nz.\nAny other circumstances or issues that are not covered here will be dealt with at the discretion of the UASC Committee. All decisions made by the committee are final.\nIf you are unsatisfied with any of the above or want to dispute any booking and/or cancellation, please contact the Bookings Officer.",
      validation: (v) => v.required()
    })
  ]
}
