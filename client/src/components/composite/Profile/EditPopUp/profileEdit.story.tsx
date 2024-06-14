import type { Meta, StoryObj } from "@storybook/react"

import profileEdit from "./profileEdit"

const meta: Meta<typeof profileEdit> = {
  component: profileEdit
}

export default meta
type Story = StoryObj<typeof profileEdit>

export const DefaultLoginForm: Story = {}
