import type { IPricingBanner } from "@/components/generic/PricingBanner/PricingBanner"
import type { FC, SVGProps } from "react"

/**
 * This is the type of elements that are exported with the `import Icon from 'path/icon.svg ` syntax
 */
export type SvgImport = FC<SVGProps<SVGElement>>

/**
 * For use with `MemberBenefitCards`
 */
export type Benefit = {
  text: string
  image?: string
}

/**
 * For use with the pricing cards that have the `home` variant
 */
export type MembershipPricing = {
  title: string
  originalPrice?: string
  discountedPrice: string
  extraInfo?: string
}

export type PricingBannerContent = IPricingBanner
