export const LODGE_BOOKINGS_POLICIES_GROQ_QUERY = `
*[_type == "lodge-bookings"]
  {"title": title, "subheading": subheading, "list": list[]->{description}}
`
type ListItem = { description: string }

export type LodgeBookingsPolicies = {
  title?: string
  subheading?: string
  list?: ListItem[]
}