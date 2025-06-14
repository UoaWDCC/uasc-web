import React from "react"

const ProductInfo: React.FC<{
  itemName: string
  displayPrice?: string
  description?: string
  googleFormLink: string
}> = ({ itemName, displayPrice, description, googleFormLink }) => {
  return (
    <div className="flex flex-1 flex-col gap-2 p-4">
      <div className="flex flex-col">
        <h3 className="text-h3 text-black">{itemName}</h3>
        {displayPrice && (
          <p className="text-h4 text-dark-blue-100 font-bold">{displayPrice}</p>
        )}
      </div>
      {description && (
        <p className="text-p text-gray-4 line-clamp-3">{description}</p>
      )}

      <a
        href={googleFormLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-orange hover:bg-orange-60 mt-4 rounded-md px-4 py-2 text-center font-medium text-white transition-colors duration-300"
      >
        Order Now
      </a>
    </div>
  )
}

export default ProductInfo
