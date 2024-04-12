import type { Meta } from "@storybook/react"

import Register from "./Register"
import { MemoryRouter } from "react-router-dom"

const meta: Meta<typeof Register> = {
  component: Register
}

export default meta

export const DefaultRegisterPage = () => {
  return (
    <MemoryRouter initialEntries={["/personal_1"]}>
      <Register />
    </MemoryRouter>
  )
}
