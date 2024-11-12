import { Pricing } from "@/components/utils/types"

export const pricingNote =
  "*We have a discounted membership price on offer until Sunday 17th March so lock in now for a year of awesome memories!"

export const pricingBannerMessages = {
  headline: "Great nightly rates" as const,
  priceInformation: (normalPrice: number) =>
    `$${normalPrice} per night*` as const,
  disclaimer: (moreExpensivePrice: number) =>
    `*$${moreExpensivePrice} when booking a single Friday or Saturday` as const
} as const

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
