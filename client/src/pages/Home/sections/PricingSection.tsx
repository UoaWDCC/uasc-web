import { Pricing, PricingBannerContent } from "components/utils/types"
import HomeSectionHeading from "./utils/HomeSectionHeading"
import HomeSectionWrapper from "./utils/HomeSectionWrapper"
import PricingCard from "components/generic/PricingCard/PricingCard"
import PricingBanner from "components/generic/PricingBanner/PricingBanner"

interface IPricingSection {
  note?: string
  pricings: Pricing[]
  bannerContent?: PricingBannerContent
}

const PricingSection = ({ note, pricings, bannerContent }: IPricingSection) => (
  <section>
    <HomeSectionWrapper>
      <HomeSectionHeading text="Pricing" />
      <div className="flex flex-col gap-6">
        <h5 className="text-orange mt-9 text-center uppercase lg:w-1/2 lg:text-left">
          {note}
        </h5>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pricings.map((pricing) => {
            const { discountedPrice, originalPrice, extraInfo, title } = pricing
            return (
              <span key={title}>
                <PricingCard
                  variant="home"
                  discountedPriceString={discountedPrice}
                  priceString={originalPrice || ""}
                  extraInfo={extraInfo}
                  title={title}
                />
              </span>
            )
          })}
        </div>
        {bannerContent && (
          <PricingBanner
            headline={bannerContent.headline}
            disclaimer={bannerContent.disclaimer}
            priceInformation={bannerContent.priceInformation}
          />
        )}
      </div>
    </HomeSectionWrapper>
  </section>
)

export default PricingSection
