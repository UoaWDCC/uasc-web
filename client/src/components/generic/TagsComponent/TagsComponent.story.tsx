import type { Meta, StoryObj } from "@storybook/react"

import TagsComponent from "./TagsComponent"
const meta: Meta<typeof TagsComponent> = {
  component: TagsComponent
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultTag: Story = {
  tags: ["autodocs"],
  args: {
    title: "Tag",
    children: "hello"
  }
}
