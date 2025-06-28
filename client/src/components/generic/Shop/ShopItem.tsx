"use client"

import type React from "react"
import { useState } from "react"
import type { ShopItem as ShopItemType } from "../../../models/sanity/ShopItem/Utils"
import ProductImage from "@/components/generic/Shop/ProductImage/ProductImage"
import ProductInfo from "@/components/generic/Shop/ProductInfo/ProductInfo"

interface ShopItemProps {
  item: ShopItemType
}

/**
 * ShopItem component displays a product card with image and information
 *
 * @component
 * @param item - The shop item data containing product details
 *
 * @example
 * // Example usage:
 * <ShopItem
 *   item={{
 *     itemName: "Product Title",
 *     mainImageUrl: "/images/product.jpg",
 *     secondaryImageUrl: "/images/product-alt.jpg",
 *     googleFormLink: "https://forms.google.com/product-order",
 *     displayPrice: "$19.99",
 *     description: "Product description goes here"
 *   }}
 * />
 */
const ShopItem: React.FC<ShopItemProps> = ({
  item: {
    itemName,
    mainImageUrl,
    secondaryImageUrl,
    googleFormLink,
    displayPrice,
    description
  }
}) => {
  // State to toggle between primary and secondary product images
  const [showSecondaryImage, setShowSecondaryImage] = useState(false)

  return (
    <div className="flex h-full min-w-full max-w-xs flex-col overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
      <ProductImage
        mainImageUrl={mainImageUrl}
        secondaryImageUrl={secondaryImageUrl}
        itemName={itemName}
        showSecondaryImage={showSecondaryImage}
        setShowSecondaryImage={setShowSecondaryImage}
      />

      <ProductInfo
        itemName={itemName}
        displayPrice={displayPrice}
        description={description}
        googleFormLink={googleFormLink}
      />
    </div>
  )
}

export default ShopItem
