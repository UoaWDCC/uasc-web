import { Pricing } from "@/components/utils/types"

export const pricingNote =
  "*We have a discounted membership price on offer until Sunday 17th March so lock in now for a year of awesome memories!"

/**
 * An object containing messages for the pricing banner.
 */
export const pricingBannerMessages = {
  /**
   * The headline message for the pricing banner.
   */
  headline: "Great nightly rates" as const,

  /**
   * A function that returns a formatted price information string.
   *
   * @param {number} normalPrice - The normal price per night.
   * @returns {string} The formatted price information string.
   */
  priceInformation: (normalPrice: number) =>
    `$${normalPrice} per night*` as const,

  /**
   * A function that returns a formatted disclaimer message.
   *
   * @param {number} moreExpensivePrice - The price when booking a single Friday or Saturday.
   * @returns {string} The formatted disclaimer message.
   */
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
