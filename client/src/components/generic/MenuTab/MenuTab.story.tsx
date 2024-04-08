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
        <a>item 1</a>
        <a>item 2</a>
        <a>item 3</a>
        <a>item 4</a>
        <a>item 5</a>
      </>
    )
  }
}
