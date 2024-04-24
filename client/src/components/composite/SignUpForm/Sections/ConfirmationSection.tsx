import { SvgImport } from "components/utils/types"
type confirmationVariants = "default"

export interface ISectionProps {
  SvgIcon?: SvgImport
  subHeader: string
  textTop: string
  textBottom: string
  variant?: confirmationVariants
}

type props = ISectionProps

export const confirmationSection = ({
  SvgIcon,
  subHeader,
  textTop,
  textBottom
}: props) => {
  return (
    <div className="">
      <div className="flex flex-row items-center justify-center">
        <div className="max-w-[204px]">
          <h3>{subHeader}</h3>
          <p className="pb-[50px]">{textTop}</p>
          <p>{textBottom}</p>
        </div>
        <div className="pl-[71px] max-sm:hidden">
          {SvgIcon && (
            <SvgIcon
              width="255px"
              height="255px"
              className="fill-light-blue-100"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default confirmationSection
