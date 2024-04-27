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

export const confirmationSection = ({
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
    <div className="">
      <div className="flex flex-row items-center justify-center">
        <div className="max-w-[204px]">
          <h3 className="">
            {subHeader}
            <p className="pb-[50px]">{textTop}</p>
            <p>{textBottom}</p>
          </h3>
        </div>
        <div className="pl-[175px] max-sm:hidden">
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
