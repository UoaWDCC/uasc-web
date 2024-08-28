import type { Meta, StoryObj } from "@storybook/react"
import LodgeInfoComponent from "./LodgeInfoComponent"

const meta: Meta<typeof LodgeInfoComponent> = {
  component: LodgeInfoComponent
}

export default meta

type Story = StoryObj<typeof LodgeInfoComponent>

export const Default: Story = {
  args: {
    handleBookLodgeClick: () => console.log(""),
    children: (
      <>
        <div className="flex flex-col gap-4">
          <p>
            The UASC Lodge is located in the Whakapapa Ski field and is just a
            3-5 min walk from the bottom of the Sky Waka Gondola, meaning you
            can be on the slopes in no time!
          </p>
          <p>
            Visit for the Whakapapa Ski field status, lift, food and retail
            status and status of other activities.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-dark-blue-100 text-2xl font-bold">Address</h2>
          <p>Bruce Road, Manawatū-Whanganui</p>
          <p>
            <b>Please read UASC policy below before booking.</b>
          </p>
        </div>
      </>
    )
  },
  tags: ["autodocs"]
}
