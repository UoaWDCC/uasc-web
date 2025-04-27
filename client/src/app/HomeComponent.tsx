import { Footer } from "@/components/generic/Footer/Footer"
import { HomePage } from "@/models/sanity/HomePage/Utils"
import {
  LodgePricingProps,
  MembershipPrices
} from "@/services/AppData/AppDataService"
import AboutSection from "./sections/AboutSection"
import BenefitSection from "./sections/BenefitSection"
import LandingSection from "./sections/LandingSection"
import PricingSection from "./sections/PricingSection"
import { benefits } from "./sections/utils/Benefits"
import { lodgeBookingPricingBannerMessages } from "./sections/utils/Pricing"

export type HomeProps = {
  /**
   * Fetched prices for how much each type of membership costs
   */
  membershipPricingData: MembershipPrices[]
  /**
   * Fetched prices showing how much it costs to book the lodge
   */
  lodgePricing: LodgePricingProps
  content?: HomePage
}

/**
 * @deprecated do not use, use `WrappedHomeComponent` instead
 */
const HomeComponent = ({
  membershipPricingData,
  lodgePricing,
  content
}: HomeProps) => {
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
          pricings={membershipPricingData}
          bannerContent={{
            headline: lodgeBookingPricingBannerMessages.headline,
            priceInformation:
              lodgeBookingPricingBannerMessages.priceInformation(
                lodgePricing.normal
              ),
            disclaimer: lodgeBookingPricingBannerMessages.disclaimer(
              lodgePricing.moreExpensive
            )
          }}
        />
      </div>
      <div className="pt-14">
        <Footer />
      </div>
    </>
  )
}

export default HomeComponent
