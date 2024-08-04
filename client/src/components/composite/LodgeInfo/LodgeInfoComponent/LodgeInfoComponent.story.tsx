import type { Meta, StoryObj } from "@storybook/react"
import LodgeInfoComponent from "./LodgeInfoComponent"

const meta: Meta<typeof LodgeInfoComponent> = {
  title: "Components/LodgeInfoComponent",
  component: LodgeInfoComponent
}

export default meta

type Story = StoryObj<typeof LodgeInfoComponent>

export const Default: Story = {
  args: {},
  tags: ["autodocs"]
}
