import {
  HOME_PAGE_GROQ_QUERY,
  type HomePage
} from "@/models/sanity/HomePage/Utils"
import AppDataService, {
  type MembershipPrices
} from "@/services/AppData/AppDataService"
import { sanityQuery } from "../../sanity/lib/utils"
import HomeComponent from "./HomeComponent"

const Home = async () => {
  let pricingData: MembershipPrices[]
  try {
    pricingData = await AppDataService.getMembershipPricingDetails()
  } catch {
    pricingData = []
  }

  const lodgePricing = await AppDataService.getLodgePrices()

  const [content] = await sanityQuery<HomePage[]>(HOME_PAGE_GROQ_QUERY)

  return (
    <HomeComponent
      membershipPricingData={pricingData}
      content={content}
      lodgePricing={lodgePricing}
    />
  )
}

export default Home
