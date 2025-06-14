import React from "react"
import { ShopItem as ShopItemType } from "../../../models/sanity/ShopItem/Utils"
import ShopItem from "@/components/generic/Shop/ShopItem"

interface ShopViewProps {
  /**
   * Array of {@link ShopItem} to display
   */
  items?: ShopItemType[]
  isLoading?: boolean
  error?: Error | null
}

/**
 * ShopView component displays a responsive grid of shop items
 * with optimized layout for different item counts
 *
 * @component
 * @param items - Array of shop items to display
 * @param isLoading - Boolean indicating if items are loading
 * @param error - Error object if fetching failed
 */
const ShopView: React.FC<ShopViewProps> = ({
  items,
  isLoading = false,
  error = null
}) => {
  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="border-light-blue-60 border-t-light-blue-100 h-12 w-12 animate-spin rounded-full border-4" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <p className="text-h4 text-red">
          Failed to load shop items. Please try again later.
        </p>
      </div>
    )
  }

  const getGridClassName = (itemCount: number) => {
    switch (itemCount) {
      case 0:
        return ""
      case 1:
        return "grid-cols-1 max-w-md mx-auto"
      case 2:
        return "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto"
      default:
        return "grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    }
  }
  const itemCount = items?.length || 0

  return (
    <section className="container mx-auto max-w-[1200px] px-4 py-8 md:px-6 lg:px-8">
      <h2 className="text-h2 text-dark-blue-100 mb-8 text-center">
        Shop Our Products
      </h2>

      {items && items.length > 0 ? (
        <div className={`grid gap-6 ${getGridClassName(itemCount)}`}>
          {items.map((item) => (
            <div key={item._id} className="flex">
              <ShopItem item={item} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-h4 text-gray-4 text-center">
          No products available at the moment.
        </p>
      )}
    </section>
  )
}

export default ShopView
