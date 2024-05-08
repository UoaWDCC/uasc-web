import type { Meta, StoryObj } from "@storybook/react"

import TagsComponent from "./TagsComponent"
const meta: Meta<typeof TagsComponent> = {
  component: TagsComponent.PrimaryTagsComponent
}

export default meta
type Story = StoryObj<typeof meta>

export const PrimaryTagsComponent: Story = {
  tags: ["autodocs"]
}
