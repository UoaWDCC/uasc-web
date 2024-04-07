import type { Meta, StoryObj } from "@storybook/react"

import MenuList from "./MenuList"

const meta: Meta<typeof MenuList> = {
  component: MenuList,
  tags: ["autodoc"]
}

export default meta
type Story = StoryObj<typeof MenuList>

export const DefaultMenuList: Story = {
  args: {
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
