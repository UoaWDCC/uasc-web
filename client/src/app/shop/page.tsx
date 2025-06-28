import ShopView from "@/components/composite/ShopView/ShopView"
import {
  SHOP_ITEMS_GROQ_QUERY,
  type ShopItem
} from "@/models/sanity/ShopItem/Utils"
import { SanityImageUrl, sanityQuery } from "../../../sanity/lib/utils"

const Shop = async () => {
  let shopItems: ShopItem[] = []
  let error: Error | null = null

  try {
    shopItems = await sanityQuery<ShopItem[]>(SHOP_ITEMS_GROQ_QUERY)

    // Process images with SanityImageUrl
    shopItems = shopItems.map((item) => ({
      ...item,
      mainImageUrl: new SanityImageUrl(item.mainImageUrl)
        .width(300)
        .autoFormat()
        .toString(),
      secondaryImageUrl: item.secondaryImageUrl
        ? new SanityImageUrl(item.secondaryImageUrl)
            .width(300)
            .autoFormat()
            .toString()
        : undefined
    }))
  } catch (e) {
    console.error("Error fetching shop items:", e)
    error = e instanceof Error ? e : new Error("Unknown error occurred")
  }

  return (
    <main className="min-h-screen py-8">
      <ShopView items={shopItems} error={error} />
    </main>
  )
}

export default Shop
