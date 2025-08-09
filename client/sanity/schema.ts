import type { SchemaTypeDefinition } from "sanity"
import { AboutItemSchema } from "@/models/sanity/AboutItem/Schema"
import { CommitteeMemberSchema } from "@/models/sanity/CommitteeMembers/Schema"
import { ContactDetailSchema } from "@/models/sanity/ContactDetail/Schema"
import { FAQItemSchema } from "@/models/sanity/FAQItem/Schema"
import { HomePageSchema } from "@/models/sanity/HomePage/Schema"
import { LifeMemberSchema } from "@/models/sanity/LifeMembers/Schema"
import { LodgeInfoSchema } from "@/models/sanity/LodgeInfo/Schema"
import { PoliciesSchema } from "@/models/sanity/Policies/Schema"
import { ShopItemSchema } from "@/models/sanity/ShopItem/Schema"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    AboutItemSchema,
    HomePageSchema,
    ContactDetailSchema,
    LodgeInfoSchema,
    PoliciesSchema,
    CommitteeMemberSchema,
    LifeMemberSchema,
    ShopItemSchema,
    FAQItemSchema
  ]
}
