export const FAQ_ITEMS_GROQ_QUERY =
  `*[_type == "faq-item"] | order(order asc)` as const

export type FAQItem = {
  question: string
  answer: string
  order: number
  category?: string
}
