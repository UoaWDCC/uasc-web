/**
 * All about items ordered by created
 */
export const ABOUT_ITEMS_GROQ_QUERY =
  `*[_type == "about-item"]{"imageUrl": image.asset->url, ...} | order(_createdAt asc)` as const

export type AboutItem = {
  _id: string
  title?: string
  description?: string
  imageUrl?: string
}
