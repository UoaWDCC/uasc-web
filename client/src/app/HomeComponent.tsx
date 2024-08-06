import { Footer } from "@/components/generic/Footer/Footer"
import { HomePage } from "@/models/sanity/HomePage/Utils"
import { Prices } from "@/services/AppData/AppDataService"
import AboutSection from "./sections/AboutSection"
import BenefitSection from "./sections/BenefitSection"
import LandingSection from "./sections/LandingSection"
import PricingSection from "./sections/PricingSection"
import { benefits } from "./sections/utils/Benefits"
import { pricingBannerContent } from "./sections/utils/Pricing"

export type HomeProps = {
  pricingData: Prices[]
  content?: HomePage
}

/**
 * @deprecated do not use, use `WrappedHomeComponent` instead
 */
const HomeComponent = ({ pricingData, content }: HomeProps) => {
  return (
    <>
      <div>
        <LandingSection />
        <AboutSection
          title={content?.introduction.title}
          subheading={content?.introduction.subheading}
          description={content?.introduction.description}
        />
        <BenefitSection
          benefits={
            content?.benefitCards?.map((benefit) => {
              return { text: benefit.description, image: benefit.imageUrl }
            }) || benefits
          }
        />
        <PricingSection
          note={content?.pricing?.discount}
          pricings={pricingData}
          bannerContent={pricingBannerContent}
        />
      </div>
      <div className="pt-14">
        <Footer />
      </div>
    </>
  )
}

export default HomeComponent
