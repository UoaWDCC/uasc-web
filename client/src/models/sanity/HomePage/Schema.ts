import { SchemaTypeDefinition, defineField } from "sanity"

export const HomePageSchema: SchemaTypeDefinition = {
  name: "home-page",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "landing",
      title: "Landing Section",
      type: "document",
      description:
        "the first section on the page, which the users see when visiting the site",
      fields: [
        defineField({
          name: "headline",
          type: "text",
          description:
            "e.g The largest sports club on campus, and the cheapest membership on Mt Ruapehu!",
          validation: (v) => v.required()
        })
      ]
    }),
    defineField({
      name: "introduction",
      title: "Introduction Section",
      type: "document",
      description: "the section that introduces the club",
      fields: [
        defineField({
          name: "title",
          type: "string",
          description: "e.g Get ready for the best year of your life!",
          validation: (v) => v.required()
        }),
        defineField({
          name: "subheading",
          title: "Subheading",
          type: "text",
          description: `e.g The University of Auckland Snowsports Club is back again for another banging year, and it's time to lock in your membership for 2024!`,
          validation: (v) => v.required()
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          description: `e.g Whether you're new to the club or an old fart coming back for more, we can't wait to see your pretty face for a year of sending and shredding on and off the slopes!`,
          validation: (v) => v.required()
        })
      ]
    }),

    defineField({
      name: "benefits",
      title: "Member benefit sections",
      type: "document",
      description: "Cards explaining why visitors should join UASC",
      fields: [
        defineField({
          type: "array",
          name: "benefits",
          description: "Benefits",
          of: [
            defineField({
              type: "document",
              name: "benefit",
              fields: [
                defineField({
                  name: "description",
                  title: "Benefit Name",
                  description:
                    "e.g Book our cozy ski lodge on the Whakapapa skifield!",
                  type: "text",
                  validation: (v) => v.required()
                }),
                defineField({
                  name: "image",
                  title: "Benefit image",
                  type: "image"
                })
              ]
            })
          ]
        })
      ]
    }),
    defineField({
      name: "pricing",
      title: "Pricing Section",
      type: "document",
      description:
        "Extra information about the pricing - All actual prices should be changed through stripe",
      fields: [
        defineField({
          name: "discount",
          title: "Discount Text",
          description: "e.g O-Week sale until 19th June!",
          type: "text"
        })
      ]
    })
  ]
}
