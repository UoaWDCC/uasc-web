import AboutSection from "./sections/AboutSection"
import BenefitSection from "./sections/BenefitSection"
import LandingSection from "./sections/LandingSection"
import PricingSection from "./sections/PricingSection"
import { benefits } from "./sections/utils/Benefits"
import {
  Pricings,
  pricingBannerContent,
  pricingNote
} from "./sections/utils/Pricing"

const Home = () => {
  return (
    <>
      <LandingSection />
      <AboutSection />
      <BenefitSection benefits={benefits} />
      <PricingSection
        pricings={Pricings}
        note={pricingNote}
        bannerContent={pricingBannerContent}
      />
    </>
  )
}

export default Home
