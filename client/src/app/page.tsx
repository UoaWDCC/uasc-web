import AppDataService, { Prices } from "@/services/AppData/AppDataService"
import HomeComponent from "./HomeComponent"
import { sanityQuery } from "../../sanity/lib/utils"
import { HOME_PAGE_GROQ_QUERY, HomePage } from "@/models/sanity/HomePage/Utils"

const Home = async () => {
  let pricingData: Prices[]
  try {
    pricingData = await AppDataService.getMembershipPricingDetails()
  } catch (e) {
    pricingData = []
  }

  const [content] = await sanityQuery<HomePage[]>(HOME_PAGE_GROQ_QUERY)
  console.log(content)

  return (
    <>
      <HomeComponent pricingData={pricingData} content={content} />
    </>
  )
}

export default Home
