import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import ModalContainer from "@/components/generic/ModalContainer/ModalContainer"
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

export const OpenAndClosing = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        Toggle Open
      </button>
      <ModalContainer isOpen={isOpen}>
        <AdminUserCreationModal handleClose={() => setIsOpen(false)} />
      </ModalContainer>
    </>
  )
}
