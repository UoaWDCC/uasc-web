import type { Meta, StoryObj } from "@storybook/react"

import MenuTab from "./MenuTab"

const meta: Meta<typeof MenuTab> = {
  component: MenuTab
}

export default meta
type Story = StoryObj<typeof MenuTab>

export const DefaultMenuTab: Story = {
  args: {
    displayText: "Default Tab"
  }
}
