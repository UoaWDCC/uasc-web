import type { Meta } from "@storybook/react"

import LandingSection from "./LandingSection"

const meta: Meta<typeof LandingSection> = {
  component: LandingSection
}

export default meta

export const DefaultHomePage = () => {
  return <LandingSection />
}
