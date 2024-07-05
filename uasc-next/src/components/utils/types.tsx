import { IPricingBanner } from "@/components/generic/PricingBanner/PricingBanner"

/**
 * This is the type of elements that are exported with the `import Icon from 'path/icon.svg ` syntax
 */
export type SvgImport = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & { title?: string | undefined }
>

/**
 * For use with `MemberBenefitCards`
 */
export type Benefit = {
  text: string
  icon?: string
}

/**
 * For use with the pricing cards that have the `home` variant
 */
export type Pricing = {
  title: string
  originalPrice?: string
  discountedPrice: string
  extraInfo?: string
}

export type PricingBannerContent = IPricingBanner
