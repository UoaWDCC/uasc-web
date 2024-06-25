import type { Meta, StoryObj } from "@storybook/react"

import ProfileEdit from "./profileEdit"

export const DefaultProfileEdit = () => {
  return (
    <ProfileEdit<{
      first_name: string
      last_name: string
      phone_number: string
    }>
      fields
    />
  )
}
