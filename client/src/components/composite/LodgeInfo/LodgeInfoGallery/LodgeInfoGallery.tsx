import Image from "next/image"

interface ILodgeInfoGallery {
  /**
   * A list of srcs for all the images in the gallery.
   *
   * This should be **pre-sorted** and **unique**
   *
   * @example
   * ['https://image-url-1.com', 'https://image-url-2.com', 'https://image-url-3.com']
   */
  imageSrcs: string[]
}

/**
 * Simple photo gallery that displays images in a single row (can be scrolled horizontally)
 */
const LodgeInfoGallery = ({ imageSrcs = [] }: ILodgeInfoGallery) => {
  return (
    <div className="flex space-x-4 overflow-x-auto p-2">
      {imageSrcs.map((url, index) => (
        <>
          {/* We require a `max-width` style to constrain the image on smaller screens */}
          <div key={url} className="max-w-[95vw] flex-shrink-0">
            <Image
              src={url}
              alt={`Photo ${index + 1}`}
              width={400}
              height={400}
              className="rounded-sm shadow-lg"
            />
          </div>
        </>
      ))}
    </div>
  )
}

export default LodgeInfoGallery
