import { PortableTextBlock } from "@portabletext/types"

export const POLICIES_GROQ_QUERY = `*[_type == "policies"]{...}` as const

export type Policies = {
  order?: number
  title?: string
  information?: PortableTextBlock[]
}
