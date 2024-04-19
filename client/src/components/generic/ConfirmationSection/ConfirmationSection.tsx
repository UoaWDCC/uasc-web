import { SvgImport } from "components/utils/types"
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
      <h1>{mainHeader}</h1>
      <h3>{subHeader}</h3>
      <p>{textTop}</p>
      <p>{textBottom}</p>
      <span>{SvgIcon && <SvgIcon className="" />}</span>
    </div>
  )
}

export default confirmationSection
