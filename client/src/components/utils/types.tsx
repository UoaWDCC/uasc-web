/**
 * This is the type of elements that are exported with the `import Icon from 'path/icon.svg?react` syntax
 */
export type SvgImport = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & { title?: string | undefined }
>

/**
 * For use with `MemberBenefitCards`
 */
export type Benefit = {
  text: string
  icon?: SvgImport
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
