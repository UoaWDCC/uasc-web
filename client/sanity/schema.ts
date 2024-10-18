import { AboutItemSchema } from "@/models/sanity/AboutItem/Schema"
import { ContactDetailSchema } from "@/models/sanity/ContactDetail/Schema"
import { HomePageSchema } from "@/models/sanity/HomePage/Schema"
import { LodgeInfoSchema } from "@/models/sanity/LodgeInfo/Schema"
import { type SchemaTypeDefinition } from "sanity"
import { CommitteeMemberSchema } from "@/models/sanity/CommitteeMembers/Schema"
import { LifeMemberSchema } from "@/models/sanity/LifeMembers/Schema"
import { PoliciesSchema } from "@/models/sanity/Policies/Schema"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    AboutItemSchema,
    HomePageSchema,
    ContactDetailSchema,
    LodgeInfoSchema,
    PoliciesSchema,
    CommitteeMemberSchema,
    LifeMemberSchema
  ]
}
