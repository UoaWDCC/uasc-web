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
        <a>item 1</a>
        <a>item 2</a>
        <a>item 3</a>
        <a>item 4</a>
        <a>item 5</a>
      </>
    )
  }
}
