import { useState } from "react"
import type { Meta } from "@storybook/react"
import Button from "../FigmaButtons/FigmaButton"

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default"]
    },
    children: {
      name: "text for description"
    }
  }
}
export default meta

export const TestButtons = () => {
  const [leftCount, setLeftCount] = useState<number>(0)
  const [rightCount, setRightCount] = useState<number>(0)

  return (
    <div className="flex items-center justify-center">
      <div className="pr-10">
        <Button onClick={() => setLeftCount(leftCount + 1)}>
          Test Button 1
        </Button>
        <h3>{leftCount}</h3>
      </div>
      <div>
        <Button onClick={() => setRightCount(rightCount + 1)}>
          Test Button 2
        </Button>
        <h3>{rightCount}</h3>
      </div>
      <div className="pl-10">
        <Button
          onClick={() => {
            setLeftCount(0)
            setRightCount(0)
          }}
        >
          CLEAR
        </Button>
      </div>
    </div>
  )
}
