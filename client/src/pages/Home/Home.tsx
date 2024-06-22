import AboutSection from "./sections/AboutSection"
import BenefitSection from "./sections/BenefitSection"
import LandingSection from "./sections/LandingSection"
import PricingSection from "./sections/PricingSection"
import { benefits } from "./sections/utils/Benefits"
import { pricingBannerContent, pricingNote } from "./sections/utils/Pricing"
import { Footer } from "components/generic/Footer/Footer"
import { Prices } from "services/AppData/AppDataService"

export type HomeProps = {
  data: Prices[]
}

/**
 * @deprecated do not use, use `WrappedHomeComponent` instead
 */
const Home = ({ data }: HomeProps) => {
  return (
    <>
      <div className="">
        <LandingSection />
        <AboutSection />
        <BenefitSection benefits={benefits} />
        <PricingSection
          pricings={data}
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
