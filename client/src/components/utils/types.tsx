/**
 * This is the type of elements that are exported with the `import Icon from 'path/icon.svg?react` syntax
 */
export type SvgImport = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & { title?: string | undefined }
>

/**
 * For use with `MemberBenefitCards`
 */
export type Benefits = {
  text: string
  icon?: SvgImport
}
