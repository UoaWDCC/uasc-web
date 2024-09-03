import { SchemaTypeDefinition, defineField } from "sanity"

export const LodgeBookingsSchema: SchemaTypeDefinition = {
  name: "lodge-bookings",
  title: "Lodge Bookings",
  description: "Policies for the user to agree to before booking",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: "e.g Lodge Booking Policies",
      validation: (v) => v.required()
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      description: "e.g. Making your Booking",
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
      description: "e.g. Booking Information for Members",
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
      description: "e.g. Booking Information for Guests",
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
            },
            {
              name: "sublist",
              title: "Sublist",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "sublistItem",
                  title: "Sublist Item",
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
            }
          ]
        }
      ]
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      description: "e.g. General Rules",
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
    })
  ]
}
