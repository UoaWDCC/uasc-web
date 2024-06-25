import type { Meta, StoryObj } from "@storybook/react"

import ProfileEdit from "./profileEdit"

const meta: Meta<typeof ProfileEdit> = {
  component: ProfileEdit
}

export default meta
type Story = StoryObj<typeof ProfileEdit>

export const DefaultProfileEdit: Story = {
  args: {}
}
