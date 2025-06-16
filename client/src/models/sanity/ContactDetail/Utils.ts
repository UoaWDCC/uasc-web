export const CONTACT_DETAIL_GROQ_QUERY = `*[_type == "contact-detail"]` as const

export type ContactDetailLink = {
  displayName: string
  url: string
}

export type ContactDetailItem = {
  title: string
  description?: string
  email?: string
  links?: ContactDetailLink[]
}
