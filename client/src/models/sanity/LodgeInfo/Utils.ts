import type { PortableTextBlock } from "@portabletext/react"

export const LODGE_INFORMATION_GROQ_QUERY =
  `*[_type == "lodge-information"]{"imageUrls": images[]{"url": asset->url}, ...}` as const

type LodgeInformationImage = {
  url?: string
}

export type LodgeInformation = {
  imageUrls?: LodgeInformationImage[]
  information?: PortableTextBlock[]
}
