import type { Meta, StoryObj } from "@storybook/react"
import TestIcon from "assets/icons/bell.svg?react"

import confirmationSection from "./ConfirmationSection"
const meta: Meta<typeof confirmationSection> = {
  component: confirmationSection,
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default"]
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const ConfirmationSection: Story = {
  tags: ["autodocs"],
  args: {
    SvgIcon: TestIcon,
    variant: "default",
    mainHeader: "",
    subHeader: "",
    textTop: "",
    textBottom: ""
  }
}
