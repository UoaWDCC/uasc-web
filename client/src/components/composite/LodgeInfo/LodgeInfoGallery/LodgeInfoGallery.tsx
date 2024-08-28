import Image from "next/image"

interface ILodgeInfoGallery {
  /**
   * A list of srcs for all the images in the gallery.
   *
   * This should be pre-sorted
   *
   * @example
   * ['https://image-url-1.com', 'https://image-url-2.com', 'https://image-url-3.com']
   */
  imageUrls: string[]
}

/**
 * Simple photo gallery that displays images in a single row (can be scrolled horizontally)
 */
const LodgeInfoGallery = ({ imageUrls = [] }: ILodgeInfoGallery) => {
  return (
    <>
      <div className="flex space-x-4 overflow-x-auto p-2">
        {imageUrls.map((url, index) => (
          <div key={index} className="flex-shrink-0">
            <Image
              src={url}
              alt={`Photo ${index + 1}`}
              width={400}
              height={400}
              className="rounded-sm shadow-lg"
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default LodgeInfoGallery
