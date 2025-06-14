import { defineField, SchemaTypeDefinition } from "sanity"

export const ShopItemSchema: SchemaTypeDefinition = {
  name: "shop-item",
  title: "Shop Item",
  type: "document",
  fields: [
    defineField({
      name: "itemName",
      title: "Item Name",
      type: "string",
      description: "Example: 'Red Lodge T-Shirt'",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      description: "This is the primary image for the item.",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "secondaryImage",
      title: "Secondary Image",
      description: "This is an optional secondary image for the item.",
      type: "image"
    }),
    defineField({
      name: "googleFormLink",
      title: "Google Form Link",
      type: "url",
      description: "Link to the Google Form for purchasing this item.",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "displayPrice",
      title: "Display Price",
      type: "string",
      description: "Example: '$19.99'",
      validation: (Rule) =>
        Rule.required().custom((price) => {
          if (typeof price === "undefined") {
            return true // Allow undefined values
          }

          // Regex for price formats like $19.99, $19, £10.50, etc.
          const regex = /^\$\s?(\d+|\d{1,3}(,\d{3})*)(\.\d{1,2})?$/
          return regex.test(price)
            ? true
            : "Please enter a valid price format (e.g. $19.99)"
        })
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "A brief description of the item."
    })
  ]
}
