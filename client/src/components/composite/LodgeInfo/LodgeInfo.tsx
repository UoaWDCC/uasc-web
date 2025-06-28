import Button from "@/components/generic/FigmaButtons/FigmaButton"
import LodgeInfoComponent from "./LodgeInfoComponent/LodgeInfoComponent"
import LodgeInfoGallery from "./LodgeInfoGallery/LodgeInfoGallery"
import type { ReactNode } from "react"

export interface ILodgeInfo {
  /**
   * **Pre-formatted** content that should be displayed to the user
   */
  children?: ReactNode
  /**
   * List of image srcs
   */
  imageSrcs?: string[]
  /**
   * Handler to be called once the user clicks the call to action
   */
  handleBookLodgeClick?: () => void
}

/**
 * Component displaying information about the lodge before the user makes a booking
 *
 * Use case - if someone new to the club wants to know what the lodge is, or are unsure about
 * how to prepare/find more information
 */
const LodgeInfo = ({
  children,
  imageSrcs,
  handleBookLodgeClick
}: ILodgeInfo) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex justify-center pt-3">
        <Button variant="default" onClick={handleBookLodgeClick}>
          Skip Information
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <LodgeInfoComponent
            handleBookLodgeClick={() => handleBookLodgeClick?.()}
          >
            {children}
          </LodgeInfoComponent>
        </div>

        <div>
          <LodgeInfoGallery imageSrcs={imageSrcs || []}></LodgeInfoGallery>
        </div>
      </div>
    </div>
  )
}

export default LodgeInfo
