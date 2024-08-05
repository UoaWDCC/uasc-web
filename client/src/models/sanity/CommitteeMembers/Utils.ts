export const COMMITTEE_MEMBERS_GROQ_QUERY =
  `*[_type == "committee-member"]{"imageUrl": image.asset->url, ...} | order(_createdAt asc)` as const

export type CommitteeMembers = {
  _id: string
  name?: string
  title?: string
  alt?: string
  imageUrl?: string
}
