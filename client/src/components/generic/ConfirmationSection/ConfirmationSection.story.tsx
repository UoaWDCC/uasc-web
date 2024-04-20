import type { Meta, StoryObj } from "@storybook/react"
import TestIcon from "assets/icons/snowboarder.svg?react"

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
    mainHeader: "Confirmation",
    subHeader: "Thank you!",
    textTop:
      "Your application has been received, and you’ll be sent a confirmation email soon. ",
    textBottom: "In the meantime, please set up your login details.",
    buttonTextLeft: "back to home",
    buttonTextRight: "setup"
  }
}
