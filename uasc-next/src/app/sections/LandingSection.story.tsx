import type { Meta } from "@storybook/react"

import LandingSection from "./LandingSection"
import { MemoryRouter } from "react-router-dom"

const meta: Meta<typeof LandingSection> = {
  component: LandingSection
}

export default meta

export const DefaultLandingSection = () => {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <LandingSection />
    </MemoryRouter>
  )
}
