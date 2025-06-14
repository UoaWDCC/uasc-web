/**
 * All store items query
 */
export const SHOP_ITEMS_GROQ_QUERY =
  `*[_type == "shop-item"]{"mainImageUrl": mainImage.asset->url, "secondaryImageUrl": secondaryImage.asset->url, ...}` as const

export type ShopItem = {
  _id: string
  itemName: string
  mainImageUrl: string
  secondaryImageUrl?: string
  googleFormLink: string
  displayPrice: string
  description?: string
}
