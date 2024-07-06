import type { Meta, StoryObj } from "@storybook/react"

import TagsComponent from "./TagsComponent"
const meta: Meta<typeof TagsComponent> = {
  component: TagsComponent
}

export default meta
type Story = StoryObj<typeof meta>

export const PrimaryTagsComponent: Story = {
  tags: ["autodocs"],
  args: {
    children: "1 OF 12",
    variant: "primary"
  }
}
export const InteractiveTagsComponent: Story = {
  tags: ["autodocs"],
  args: {
    children: "TAG",
    variant: "interactive"
  }
}
