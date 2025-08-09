import type { Metadata } from "next"
import FAQ from "@/components/composite/FAQ/FAQ"
import {
  FAQ_ITEMS_GROQ_QUERY,
  type FAQItem
} from "@/models/sanity/FAQItem/Utils"
import { sanityQuery } from "../../../../sanity/lib/utils"

export const metadata: Metadata = {
  title: "FAQ - UASC",
  description:
    "Frequently asked questions about UASC, the lodge, bookings, and membership"
}

const FAQPage = async () => {
  const faqItems = await sanityQuery<FAQItem[]>(FAQ_ITEMS_GROQ_QUERY)

  return <FAQ items={faqItems} />
}

export default FAQPage
