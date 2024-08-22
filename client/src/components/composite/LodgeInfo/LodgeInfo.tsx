import Button from "@/components/generic/FigmaButtons/FigmaButton"
import LodgeInfoComponent from "./LodgeInfoComponent/LodgeInfoComponent"
import LodgeInfoGallery from "./LodgeInfoGallery/LodgeInfoGallery"
import { ReactNode } from "react"

export interface ILodgeInfo {
  /**
   * **Pre-formatted** content that should be displayed to the user
   */
  children?: ReactNode
  /**
   * List of image srcs
   */
  images?: string[]
  /**
   * Handler to be called once the user clicks the call to action
   */
  handleBookLodgeClick?: () => void
}

const LodgeInfo = ({ children, images, handleBookLodgeClick }: ILodgeInfo) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex justify-center pt-3">
        <Button variant="default" onClick={handleBookLodgeClick}>
          Book The Lodge
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <LodgeInfoGallery images={images || []}></LodgeInfoGallery>
        </div>
        <div>
          <LodgeInfoComponent
            handleBookLodgeClick={() => handleBookLodgeClick?.()}
          >
            {children}
          </LodgeInfoComponent>
        </div>
      </div>
    </div>
  )
}

export default LodgeInfo
