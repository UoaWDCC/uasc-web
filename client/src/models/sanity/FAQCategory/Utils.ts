export const FAQ_CATEGORIES_GROQ_QUERY =
  `*[_type == "faq-category"] | order(orderRank) {
    name,
    description,
    faqItems[] {
      question,
      answer
    }
  }` as const

export type FAQItem = {
  question: string
  answer: string
}

export type FAQCategory = {
  name: string
  description?: string
  faqItems: FAQItem[]
}
