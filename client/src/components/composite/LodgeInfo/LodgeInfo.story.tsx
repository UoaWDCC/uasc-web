import type { Meta, StoryObj } from "@storybook/react"
import LodgeInfo from "./LodgeInfo"

const meta: Meta<typeof LodgeInfo> = {
  component: LodgeInfo
}

export default meta

type Story = StoryObj<typeof LodgeInfo>

export const Default: Story = {
  args: {
    handleBookLodgeClick: () => console.log(""),
    images: [
      "https://via.placeholder.com/400x400?text=Image+1",
      "https://via.placeholder.com/400x400?text=I+SUPPORT+LGBT",
      "https://via.placeholder.com/400x400?text=Image+3",
      "https://via.placeholder.com/400x400?text=Image+4"
    ],
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
