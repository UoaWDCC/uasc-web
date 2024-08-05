export const LIFE_MEMBERS_GROQ_QUERY =
  `*[_type == "life-member"] | order(_createdAt asc)` as const

export type LifeMembers = {
  _id: string
  name?: string
}
