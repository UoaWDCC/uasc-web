export const CANCELLATIONS_POLICIES_GROQ_QUERY = `
*[_type == "cancellations"]
  {"title": title, "description": description, "subheading": subheading, "list": list[]->{description}}
`
type ListItem = { description: string }

export type CancellationsPolicies = {
  title?: string
  description?: string
  subheading?: string
  list?: ListItem[]
}
