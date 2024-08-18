export const LODGE_INFORMATION_GROQ_QUERY =
  `*[_type == "lodge-information"]` as const

export type LodgeInformation = {
  images?: string[]
  information?: any[]
}
