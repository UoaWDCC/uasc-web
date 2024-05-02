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
import { Footer } from "components/generic/Footer/Footer"

const Home = () => {
  return (
    <>
      <div className="">
        <LandingSection />
        <AboutSection />
        <BenefitSection benefits={benefits} />
        <PricingSection
          pricings={Pricings}
          note={pricingNote}
          bannerContent={pricingBannerContent}
        />
      </div>
      <div className="pt-14">
        <Footer />
      </div>
    </>
  )
}

export default Home
