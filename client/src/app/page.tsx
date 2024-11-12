import AppDataService, {
  MembershipPrices
} from "@/services/AppData/AppDataService"
import HomeComponent from "./HomeComponent"
import { sanityQuery } from "../../sanity/lib/utils"
import { HOME_PAGE_GROQ_QUERY, HomePage } from "@/models/sanity/HomePage/Utils"

const Home = async () => {
  let pricingData: MembershipPrices[]
  try {
    pricingData = await AppDataService.getMembershipPricingDetails()
  } catch (e) {
    pricingData = []
  }

  const lodgePricing = await AppDataService.getLodgePrices()

  const [content] = await sanityQuery<HomePage[]>(HOME_PAGE_GROQ_QUERY)

  return (
    <>
      <HomeComponent
        membershipPricingData={pricingData}
        content={content}
        lodgePricing={lodgePricing}
      />
    </>
  )
}

export default Home
