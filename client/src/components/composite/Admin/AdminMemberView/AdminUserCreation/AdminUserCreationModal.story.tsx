import type { Meta, StoryObj } from "@storybook/react"

import AdminUserCreationModal from "./AdminUserCreationModal"
import { useState } from "react"

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
    },
    isOpen: true
  }
}

export const OpenAndClosing = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Open</button>
      <AdminUserCreationModal
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      />
    </>
  )
}
