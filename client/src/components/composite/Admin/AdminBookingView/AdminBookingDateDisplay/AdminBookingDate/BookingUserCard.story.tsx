import type { Meta, StoryObj } from "@storybook/react"
import { Timestamp } from "firebase/firestore"
import BookingUserCard from "./BookingUserCard"
import type { BookingInfo } from "./AdminBookingDate"

const meta: Meta<typeof BookingUserCard> = {
  component: BookingUserCard
}

export default meta
type Story = StoryObj<typeof meta>

const mockUser: BookingInfo = {
  bookingId: "asd",
  uid: "1",
  first_name: "Straight",
  last_name: "Zhao",
  date_of_birth: Timestamp.fromMillis(0),
  phone_number: 69696969,
  dietary_requirements:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta enim voluptatum id placeat quod exercitationem vero non amet, minima totam voluptas illo ad ipsa autem odio reiciendis optio vel libero quia, consectetur ipsum molestias repellat distinctio a? Non error minima est beatae nostrum, nam, alias officiis, amet dolorem corrupti doloremque!",
  email: "lasdl@gmail.com",
  membership: "guest"
}

export const DefaultAdminBookingDateDisplay: Story = {
  args: {
    user: mockUser
  }
}
