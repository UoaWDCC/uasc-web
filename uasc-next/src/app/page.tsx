import AppDataService, { Prices } from "@/services/AppData/AppDataService"
import AboutSection from "./sections/AboutSection"
import BenefitSection from "./sections/BenefitSection"
import LandingSection from "./sections/LandingSection"
import PricingSection from "./sections/PricingSection"
import { benefits } from "./sections/utils/Benefits"
import { pricingBannerContent } from "./sections/utils/Pricing"
import { Footer } from "@/components/generic/Footer/Footer"
import HomeComponent from "./HomeComponent"

const Home = async () => {
  let data: Prices[]
  try {
    data = await AppDataService.getMembershipPricingDetails()
  } catch (e) {
    data = []
  }
  return (
    <>
      <HomeComponent data={data} />
    </>
  )
}

export default Home
