import { Pricing, PricingBannerContent } from "components/utils/types"

export const pricingNote =
  "*We have a discounted membership price on offer until Sunday 17th March so lock in now for a year of awesome memories!"

export const pricingBannerContent: PricingBannerContent = {
  headline: "Great nightly rates",
  priceInformation: "$60 per night*",
  disclaimer: "*$50 when booking a single saturday"
}

export const Pricings: Pricing[] = [
  {
    title: "UoA Student",
    discountedPrice: "$45",
    originalPrice: "$65",
    extraInfo: "Save $20"
  },
  {
    title: "UoA Student",
    discountedPrice: "$45",
    originalPrice: "$65",
    extraInfo: "Save $20"
  },
  {
    title: "UoA Student",
    discountedPrice: "$45",
    originalPrice: "$65",
    extraInfo: "Save $20"
  },
  {
    title: "UoA Student",
    discountedPrice: "$45",
    originalPrice: "$65",
    extraInfo: "Save $20"
  }
]
