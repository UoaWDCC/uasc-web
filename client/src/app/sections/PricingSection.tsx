import PricingBanner from "@/components/generic/PricingBanner/PricingBanner"
import PricingCard from "@/components/generic/PricingCard/PricingCard"
import { PricingBannerContent } from "@/components/utils/types"
import { MembershipPrices } from "@/services/AppData/AppDataService"
import Link from "next/link"
import HomeSectionHeading from "./utils/HomeSectionHeading"
import HomeSectionWrapper from "./utils/HomeSectionWrapper"

interface IPricingSection {
  note?: string
  pricings: MembershipPrices[]
  bannerContent: PricingBannerContent
}

const PricingSection = ({ note, pricings, bannerContent }: IPricingSection) => (
  <section>
    <HomeSectionWrapper>
      <HomeSectionHeading text="Member Pricing" />
      <div className="flex flex-col gap-6">
        <h5 className="text-orange mt-9 text-center uppercase lg:w-1/2 lg:text-left">
          {note}
        </h5>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pricings?.map((pricing) => {
            const { priceString, originalPrice, extraInfo, title } = pricing
            return (
              <span key={title}>
                <PricingCard
                  variant="home"
                  discountedPriceString={priceString}
                  priceString={originalPrice || ""}
                  extraInfo={extraInfo}
                  title={title}
                />
              </span>
            )
          })}
        </div>
        <Link
          href="/register"
          className="cursor-pointer md:w-60 md:self-center"
        >
          <button
            className="border-dark-blue-100 text-dark-blue-100 hover:bg-dark-blue-100 flex
              w-full flex-col items-center rounded-md bg-white py-3 font-sans text-2xl font-bold
              uppercase enabled:border enabled:hover:text-white disabled:bg-gray-400 md:py-4 md:text-2xl"
          >
            Sign up now!
          </button>
        </Link>
        {bannerContent && (
          <PricingBanner
            headline={bannerContent.headline}
            disclaimer={bannerContent.disclaimer}
            priceInformation={bannerContent.priceInformation}
          />
        )}
        <Link
          href="/bookings"
          className="cursor-pointer md:w-60 md:self-center"
        >
          <button
            className="bg-dark-blue-100 border-dark-blue-100 enabled:hover:text-dark-blue-100 flex w-full
              flex-col items-center rounded-md py-3 font-sans text-2xl font-bold
              text-white hover:bg-white enabled:border disabled:bg-gray-400 md:py-4 md:text-2xl"
          >
            Book the Lodge
          </button>
        </Link>
      </div>
    </HomeSectionWrapper>
  </section>
)

export default PricingSection
