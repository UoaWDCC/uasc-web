import type { Meta, StoryObj } from "@storybook/react"
import AdminEventForm from "./AdminEventForm"
import { Timestamp } from "firebase/firestore"

const meta: Meta<typeof AdminEventForm> = {
  component: AdminEventForm
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultAdminEventForm: Story = {}

export const DefaultAdminEventFormEditView: Story = {
  args: {
    isEditMode: true,
    defaultData: {
      title: "Goon Cave",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque officiis similique repellat accusantium eos dignissimos suscipit voluptatibus? Quia nobis repellendus quam, aliquid, veritatis eos fuga eligendi harum dolorum vero facere!",
      location: "straight zhao's basement",
      sign_up_start_date: Timestamp.fromDate(new Date(2024, 10, 4)),
      sign_up_end_date: Timestamp.fromDate(new Date(2024, 11, 5)),
      physical_start_date: Timestamp.fromDate(new Date(2024, 10, 3)),
      physical_end_date: Timestamp.fromDate(new Date(2024, 11, 3)),
      google_forms_link:
        "https://www.reddit.com/r/VrGoonCave/comments/18gnrk8/welcome_to_vrgooncave/"
    }
  }
}
