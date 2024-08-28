import Image from "next/image"

interface ILodgeInfoGallery {
  imageUrls: string[]
}

const LodgeInfoGallery = ({ imageUrls = [] }: ILodgeInfoGallery) => {
  return (
    <>
      <div className="flex justify-center space-x-4 overflow-x-auto p-4">
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
