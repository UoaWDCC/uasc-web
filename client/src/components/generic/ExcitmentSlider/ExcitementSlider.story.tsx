import type { Meta, StoryObj } from "@storybook/react"
import ExcitementSlider from "./ExcitementSlider"

const meta: Meta<typeof ExcitementSlider> = {
  component: ExcitementSlider,
  argTypes: {
    // children: {
    //   name: "display text"
    // }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const ExcitementSlider1: Story = {
  tags: ["autodocs"],
  args: {
    // children: "default text"
  }
}
