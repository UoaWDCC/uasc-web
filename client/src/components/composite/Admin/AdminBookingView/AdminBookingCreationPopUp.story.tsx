import type { Meta, StoryObj } from "@storybook/react"
import AdminBookingCreationPopUp from "./AdminBookingCreationPopUp"
import { CombinedUserData } from "models/User"
import { Timestamp } from "firebase/firestore"

const meta: Meta<typeof AdminBookingCreationPopUp> = {
  component: AdminBookingCreationPopUp
}

export default meta
type Story = StoryObj<typeof AdminBookingCreationPopUp>

const mockData: CombinedUserData[] = [
  {
    email: "zlzlzl@gmail.com",
    first_name: "ZL",
    membership: "member",
    phone_number: 11,
    dietary_requirements: "x",
    date_of_birth: Timestamp.fromDate(new Date("2004-04-06")),
    last_name: "ZHAO",
    uid: "11kaede"
  },
  {
    email: "aasds@gmail.com",
    first_name: "sdjsds",
    last_name: "addsds",
    uid: "asdas",
    membership: "guest",
    phone_number: 111,
    dietary_requirements: "nutz",
    date_of_birth: Timestamp.fromDate(new Date("2001-01-01"))
  },

  {
    email: "aasds@gmail.com",
    first_name: "sdjsds",
    last_name: "addsds",
    uid: "asdas",
    membership: "guest",
    phone_number: 111,
    dietary_requirements: "nutz",
    date_of_birth: Timestamp.fromDate(new Date("2001-01-01"))
  },
  {
    email: "aasds@gmail.com",
    first_name: "sdjsds",
    last_name: "addsds",
    uid: "asdas",
    membership: "guest",
    phone_number: 111,
    dietary_requirements: "nutz",
    date_of_birth: Timestamp.fromDate(new Date("2001-01-01"))
  },
  {
    email: "aasds@gmail.com",
    first_name: "sdjsds",
    last_name: "addsds",
    uid: "asdas",
    membership: "guest",
    phone_number: 111,
    dietary_requirements: "nutz",
    date_of_birth: Timestamp.fromDate(new Date("2001-01-01"))
  }
]

export const AdminBookingCreationPopUp1: Story = {
  args: { users: mockData }
}
