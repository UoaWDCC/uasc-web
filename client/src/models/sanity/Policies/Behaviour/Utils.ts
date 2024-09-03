export const BEHAVIOUR_POLICIES_GROQ_QUERY = `
*[_type == "behaviour"]
  {"title": title, "subheading": subheading, "list": list[]->{description}}
`
type ListItem = { description: string }

export type BehaviourPolicies = {
  title?: string
  subheading?: string
  list?: ListItem[]
}
