import { SvgImport } from "components/utils/types"
// import Button from "components/generic/FigmaButtons"
type confirmationVariants = "default"
interface ISectionProps {
  SvgIcon?: SvgImport
  mainHeader: string
  subHeader: string
  textTop: string
  textBottom: string
  variant?: confirmationVariants
}

type props = ISectionProps

const confirmationSection = ({
  SvgIcon,
  mainHeader,
  subHeader,
  textTop,
  textBottom
}: props) => {
  return (
    <div className="">
      <div className="flex items-center justify-center">
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
        <div>
          
        </div>
        <div>
          
        </div>
      </div>
    </div>
  )
}

export default confirmationSection
