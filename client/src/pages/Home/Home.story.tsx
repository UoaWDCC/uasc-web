import type { Meta } from "@storybook/react"

import Home from "./Home"

const meta: Meta<typeof Home> = {
  component: Home
}

export default meta

export const DefaultHomePage = () => {
  return <Home />
}
