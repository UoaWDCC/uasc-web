import { useState, FC } from "react"
import Image from "next/image"

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="62"
          viewBox="0 0 21 62"
          fill="none"
        >
          <path
            d="M20.197 60.6353C20.7111 59.7612 21 58.5758 21 57.3399C21 56.1039 20.7111 54.9185 20.197 54.0444L6.62041 30.9719L20.197 7.89927C20.6966 7.02017 20.973 5.84276 20.9668 4.62062C20.9605 3.39849 20.6721 2.22942 20.1636 1.36521C19.655 0.500999 18.9671 0.0107994 18.248 0.000179291C17.5288 -0.0104408 16.836 0.459373 16.3187 1.30844L0.803038 27.6764C0.288853 28.5505 0 29.7359 0 30.9719C0 32.2078 0.288853 33.3932 0.803038 34.2673L16.3187 60.6353C16.833 61.5091 17.5305 62 18.2578 62C18.9851 62 19.6826 61.5091 20.197 60.6353Z"
            fill="white"
          />
        </svg>
      </button>
      <button
        onClick={handleNextClick}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform opacity-70 hover:opacity-100"
        aria-label="Next image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="62"
          viewBox="0 0 21 62"
          fill="none"
        >
          <path
            d="M0.803038 60.6353C0.288853 59.7612 0 58.5758 0 57.3399C0 56.1039 0.288853 54.9185 0.803038 54.0444L14.3796 30.9719L0.803038 7.89927C0.303425 7.02017 0.0269718 5.84276 0.0332203 4.62062C0.0394707 3.39849 0.327921 2.22942 0.836447 1.36521C1.34497 0.500999 2.03289 0.0107994 2.75203 0.000179291C3.47116 -0.0104408 4.16399 0.459373 4.68127 1.30844L20.197 27.6764C20.7111 28.5505 21 29.7359 21 30.9719C21 32.2078 20.7111 33.3932 20.197 34.2673L4.68127 60.6353C4.16693 61.5091 3.46943 62 2.74216 62C2.01488 62 1.31738 61.5091 0.803038 60.6353Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  )
}

export default LodgeInfoGallery
