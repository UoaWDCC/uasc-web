import type { Metadata } from "next"
import FAQ from "@/components/composite/FAQ/FAQ"
import {
  FAQ_CATEGORIES_GROQ_QUERY,
  type FAQCategory
} from "@/models/sanity/FAQCategory/Utils"
import { sanityQuery } from "../../../../sanity/lib/utils"

export const metadata: Metadata = {
  title: "FAQ - UASC",
  description:
    "Frequently asked questions about UASC, the lodge, bookings, and membership"
}

const FAQPage = async () => {
  const faqCategories = await sanityQuery<FAQCategory[]>(
    FAQ_CATEGORIES_GROQ_QUERY
  )

  return <FAQ categories={faqCategories} />
}

export default FAQPage
