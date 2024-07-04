import type { Meta } from "@storybook/react"

import Home from "./Home"
import { MemoryRouter } from "react-router-dom"

const meta: Meta<typeof Home> = {
  component: Home
}

export default meta

export const DefaultHomePage = () => {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <Home data={[]} />
    </MemoryRouter>
  )
}
