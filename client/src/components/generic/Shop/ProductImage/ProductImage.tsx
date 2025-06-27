import Image from "next/image"
import type React from "react"

/**
 * A component that displays product images with the ability to toggle between main and secondary images.
 * @param props - Component props
 * @param props.mainImageUrl - URL of the main product image
 * @param [props.secondaryImageUrl] - Optional URL of the secondary product image
 * @param props.itemName - Name of the product (used for alt text)
 * @param props.showSecondaryImage - Flag indicating whether to show the secondary image
 * @param props.setShowSecondaryImage - Function to toggle secondary image visibility
 * @example
 * <ProductImage
 *   mainImageUrl="https://example.com/product-main.jpg"
 *   secondaryImageUrl="https://example.com/product-secondary.jpg"
 *   itemName="Blue T-Shirt"
 *   showSecondaryImage={false}
 *   setShowSecondaryImage={(show) => setShowImage(show)}
 * />
 */
const ProductImage: React.FC<{
  mainImageUrl: string
  secondaryImageUrl?: string
  itemName: string
  showSecondaryImage: boolean
  setShowSecondaryImage: (show: boolean) => void
}> = ({
  mainImageUrl,
  secondaryImageUrl,
  itemName,
  showSecondaryImage,
  setShowSecondaryImage
}) => {
  const toggleImage = () => {
    if (secondaryImageUrl) {
      setShowSecondaryImage(!showSecondaryImage)
    }
  }

  return (
    <div className="relative h-64 w-full overflow-hidden">
      <div className="relative h-full w-full">
        <Image
          src={
            showSecondaryImage && secondaryImageUrl
              ? secondaryImageUrl
              : mainImageUrl
          }
          alt={itemName}
          className="h-full w-full object-cover transition-opacity duration-300"
          onClick={toggleImage}
          fill
        />
      </div>

      {/* Image navigation dots shown only if secondary image exists */}
      {secondaryImageUrl && (
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 transform space-x-2">
          <button
            type="button"
            className={`h-2 w-2 rounded-full ${!showSecondaryImage ? "bg-dark-blue-100" : "bg-gray-3"}`}
            onClick={() => setShowSecondaryImage(false)}
            aria-label="View main image"
          />
          <button
            type="button"
            className={`h-2 w-2 rounded-full ${showSecondaryImage ? "bg-dark-blue-100" : "bg-gray-3"}`}
            onClick={() => setShowSecondaryImage(true)}
            aria-label="View secondary image"
          />
        </div>
      )}
    </div>
  )
}

export default ProductImage
