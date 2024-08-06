import { useState, FC } from "react"
import Image from "next/image"
import RightArrow from "@/assets/icons/whitearrowright.svg"
import LeftArrow from "@/assets/icons/whitearrowleft.svg"

interface LodgeInfoGalleryProps {
  images: string[]
}

const LodgeInfoGallery: FC<LodgeInfoGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePreviousClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  return (
    <div className="relative flex items-center justify-center overflow-hidden">
      {images.length > 0 ? (
        <Image
          src={images[currentIndex]}
          alt={`Lodge image ${currentIndex + 1}`}
          width={500}
          height={500}
          objectFit="contain"
          className="rounded-lg"
        />
      ) : (
        <p>No images available</p>
      )}
      <button
        onClick={handlePreviousClick}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform opacity-70 hover:opacity-100"
        aria-label="Previous image"
      >
        <LeftArrow />
      </button>

      <button
        onClick={handleNextClick}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform opacity-70 hover:opacity-100"
        aria-label="Next image"
      >
        <RightArrow />
      </button>
    </div>
  )
}

export default LodgeInfoGallery
