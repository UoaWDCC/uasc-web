import type { Meta, StoryObj } from "@storybook/react"
import BookingInformationAndCreation from "./BookingInformationAndCreation"

const meta: Meta<typeof BookingInformationAndCreation> = {
  component: BookingInformationAndCreation
}

export default meta

type Story = StoryObj<typeof meta>

export const DefaultBookingInformationAndCreation: Story = {
  args: {
    lodgeInfoProps: {
      children: (
        <>
          <h2 className="italic">About our lodge</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
            molestiae repellendus nulla voluptatibus iure! Quasi earum quis
            velit facilis mollitia minus a consequuntur blanditiis, excepturi
            omnis harum laudantium ad dolores.
          </p>
        </>
      )
    }
  }
}
