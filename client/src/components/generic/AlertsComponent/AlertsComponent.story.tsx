import type { Meta, StoryObj } from "@storybook/react"

import AlertsComponent from "./AlertsComponent"
// import AlertsInputProp from "./AlertsComponent"

const meta: Meta<typeof AlertsComponent> = {
  component: AlertsComponent
}

export default meta

type Story = StoryObj<typeof AlertsComponent>

export const ErrorAlert: Story = {
  args: {
    message: "Error: Error Message",
    variant: "error"
  }
}

export const SuccessAlert: Story = {
  args: {
    message: "Success: Success Message",
    variant: "success"
  }
}

export const NotificationAlert: Story = {
  args: {
    message: "Notification: Notification Message",
    variant: "notification"
  }
}
