import type { Meta, StoryObj } from "@storybook/react"

import MenuTab from "./MenuTab"

const meta: Meta<typeof MenuTab> = {
  component: MenuTab
}

export default meta
type Story = StoryObj<typeof MenuTab>

export const DefaultMenuTab: Story = {
  args: {
    displayText: "Default Tab",
    children: (
      <>
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3</li>
        <li>item 4</li>
        <li>item 5</li>
      </>
    )
  }
}
