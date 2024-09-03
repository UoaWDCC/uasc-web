import { SchemaTypeDefinition, defineField } from "sanity"

export const BehaviourSchema: SchemaTypeDefinition = {
  name: "behaviour",
  title: "Behaviour",
  description: "Policies for the user to agree to before booking",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: "e.g Behaviour Policy",
      validation: (v) => v.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description:
        "e.g. It is important that all members and guests conduct themselves in a responsible manner while at the UASC lodge, any associated lodges and UASC events. They must show the utmost respect for their own safety, the safety and well-being of other guests, and for the lodge or venue itself. By staying at or visiting the lodge, or attending any UASC affiliated events you are agreeing to the following rules. If you do not adhere to these rules, you may face suspension of your membership or in extreme cases, expulsion from the club.",
      validation: (v) => v.required()
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      description: "e.g. Lodge Rules",
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
      description: "e.g. Drinking and Partying Rules:",
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
      description: "e.g. Staying in Other Lodges while Affiliated with UASC:",
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
      description: "e.g. Grounds for Suspension or Expulsion of Membership:",
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
    })
  ]
}
