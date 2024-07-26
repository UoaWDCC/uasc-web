import { SchemaTypeDefinition, defineField } from "sanity"

export const ContactDetailSchema: SchemaTypeDefinition = {
  name: "contact-detail",
  title: "Contact Detail",
  description:
    "Who users should contact for additional queries - Will be displayed on a contact page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      description: "what the contact details are for - i.e bookings",
      type: "string",
      validation: (v) => v.required()
    }),
    defineField({
      name: "description",
      description:
        "Extra information that the users may need to know - i.e For guest bookings",
      type: "text"
    }),
    defineField({
      name: "email",
      type: "email"
    })
  ]
}
