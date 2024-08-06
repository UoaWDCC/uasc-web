import LodgeInfoComponent from "./LodgeInfoComponent/LodgeInfoComponent"
import LodgeInfoGallery from "./LodgeInfoGallery/LodgeInfoGallery"
import { ReactNode } from "react"

interface ILodgeInfo {
  children?: ReactNode
  /**
   * List of image srcs
   */
  images: string[]
  handleBookLodgeClick: () => void
}

const LodgeInfo = ({ children, images, handleBookLodgeClick }: ILodgeInfo) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <LodgeInfoGallery images={images}></LodgeInfoGallery>
      </div>
      <div>
        <LodgeInfoComponent handleBookLodgeClick={handleBookLodgeClick}>
          {children}
        </LodgeInfoComponent>
      </div>
    </div>
  )
}

export default LodgeInfo
