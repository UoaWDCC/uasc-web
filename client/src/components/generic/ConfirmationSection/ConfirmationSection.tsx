import { SvgImport } from "components/utils/types"
import Button from "../FigmaButtons/FigmaButton"
type confirmationVariants = "default"

export interface ISectionProps {
  SvgIcon?: SvgImport
  mainHeader: string
  subHeader: string
  textTop: string
  textBottom: string
  buttonTextLeft: string
  buttonTextRight: string
  variant?: confirmationVariants
  onClickLeft?: () => void
  onClickRight?: () => void
}

type props = ISectionProps

export const confirmationSection = ({
  SvgIcon,
  mainHeader,
  subHeader,
  textTop,
  textBottom,
  buttonTextLeft,
  buttonTextRight,
  onClickLeft,
  onClickRight
}: props) => {
  return (
    <div className="">
      <div className="flex flex-row items-center justify-center">
        <div className="max-w-[204px]">
          <h2 className="font-style: text-dark-blue-100 pb-[87px] italic">
            {mainHeader}
          </h2>
          <h3>{subHeader}</h3>
          <p className="pb-[50px]">{textTop}</p>
          <p>{textBottom}</p>
        </div>
        <div className="pl-[71px]">
          {SvgIcon && (
            <SvgIcon
              width="255px"
              height="255px"
              className="fill-light-blue-100"
            />
          )}
        </div>
      </div>
      <div className="flex flex-row items-center justify-center space-x-[204px] pt-[131px] ">
        <div className="">
          <Button data-testid="leftButton" onClick={() => onClickLeft?.()}>
            {buttonTextLeft}
          </Button>
        </div>
        <div>
          <Button data-testid="rightButton" onClick={() => onClickRight?.()}>
            {buttonTextRight}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default confirmationSection
