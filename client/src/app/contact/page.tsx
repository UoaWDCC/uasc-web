import Contact from "@/components/composite/Contact/Contact"
import { sanityQuery } from "../../../sanity/lib/utils"
import {
  CONTACT_DETAIL_GROQ_QUERY,
  type ContactDetailItem
} from "@/models/sanity/ContactDetail/Utils"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact UASC",
  description: "Information about how to reach UASC"
}

const Page = async () => {
  const contactDetails = await sanityQuery<ContactDetailItem[]>(
    CONTACT_DETAIL_GROQ_QUERY
  )
  return <Contact items={contactDetails} />
}

export default Page
