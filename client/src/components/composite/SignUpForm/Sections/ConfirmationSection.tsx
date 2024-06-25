import { SvgImport } from "components/utils/types"
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { oneLevelUp } from "../utils/Utils"
import { PERSONAL_ROUTE_1 } from "../utils/RouteNames"
type confirmationVariants = "default"

export interface ISectionProps {
  SvgIcon?: SvgImport
  subHeader: string
  textTop: string
  textBottom: string
  variant?: confirmationVariants
}

type props = ISectionProps

const ConfirmationSection = ({
  SvgIcon,
  subHeader,
  textTop,
  textBottom
}: props) => {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const navigate = useNavigate()
  useEffect(() => {
    if (!sessionId) {
      navigate(oneLevelUp(PERSONAL_ROUTE_1))
    }
  }, [])
  return (
    <div className="flex max-w-[600px] items-center gap-4 sm:justify-center">
      <div className="flex flex-col gap-1">
        <h3>{subHeader}</h3>
        <p>{textTop}</p>
        <p>{textBottom}</p>
      </div>
      <div className="ml-auto hidden sm:block">
        {SvgIcon && (
          <SvgIcon
            width="255px"
            height="255px"
            className="fill-light-blue-100"
          />
        )}
      </div>
    </div>
  )
}

export default ConfirmationSection
