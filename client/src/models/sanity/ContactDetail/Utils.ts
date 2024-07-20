export const CONTACT_DETAIL_GROQ_QUERY = `*[_type == "contact-detail"]` as const

export type ContactDetailItem = {
  title: string
  description?: string
  email?: string
}
