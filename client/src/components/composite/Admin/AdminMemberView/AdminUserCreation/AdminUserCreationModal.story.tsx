import type { Meta, StoryObj } from "@storybook/react"

import AdminUserCreationModal from "./AdminUserCreationModal"

const meta: Meta<typeof AdminUserCreationModal> = {
  component: AdminUserCreationModal
}

export default meta
type Story = StoryObj<typeof AdminUserCreationModal>

export const DefaultAdminUserCreationModal: Story = {
  args: {
    userCreationHandler: (details, giveUserMembership) => {
      console.log(
        `Signed up user with details:\n ${JSON.stringify(details)}\n,
         This user was also made a ${giveUserMembership ? "Member" : "Guest"}`
      )
    }
  }
}
