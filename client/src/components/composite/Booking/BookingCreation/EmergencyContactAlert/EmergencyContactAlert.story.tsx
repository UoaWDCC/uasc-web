import type { Meta, StoryObj } from "@storybook/react"
import EmergencyContactAlert from "./EmergencyContactAlert"

const meta: Meta<typeof EmergencyContactAlert> = {
  component: EmergencyContactAlert
}

export default meta
type Story = StoryObj<typeof meta>

export const InvalidEmergencyContactAlert: Story = {
  args: {
    userEmergencyContact: undefined
  }
}

export const ReminderEmergencyContactAlert: Story = {
  args: {
    userEmergencyContact: "Goon Zhao 911"
  }
}
