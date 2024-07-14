import { AboutItemSchema } from "@/models/sanity/AboutItem/Schema"
import { HomePageSchema } from "@/models/sanity/HomePage/Schema"
import { type SchemaTypeDefinition } from "sanity"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [AboutItemSchema, HomePageSchema]
}
