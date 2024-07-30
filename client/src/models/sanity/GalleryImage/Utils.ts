export const GALLERY_IMAGES_GROQ_QUERY =
  `*[_type == "gallery-image"]{"imageUrl": image.asset->url, ...} | order(_createdAt desc)` as const

export type GalleryImage = {
  _id: string
  title: string
  description: string
  imageUrl: string
  year: number
  event?: string
  location?: string
}
