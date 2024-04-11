import type { Meta } from "@storybook/react"
import ExitConfirmation from "./ExitConfirmation"

const meta: Meta<typeof ExitConfirmation> = {
  component: ExitConfirmation,
  title: "Exit Confirmation"
}

export default meta

// type Story = StoryObj<typeof meta>

export const DefaultExitConfirmation = () => {
  return (
    <ExitConfirmation
      title="Exit form"
      message="Are you sure you want to exit"
    />
  )
}
