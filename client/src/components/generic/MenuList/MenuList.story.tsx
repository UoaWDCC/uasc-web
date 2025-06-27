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
        <a href="https://google.com">item 1</a>
        <a href="https://google.com">item 2</a>
        <a href="https://google.com">item 3</a>
        <a href="https://google.com">item 4</a>
        <a href="https://google.com">item 5</a>
      </>
    )
  }
}
