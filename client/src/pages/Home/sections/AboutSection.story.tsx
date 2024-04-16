import type { Meta } from "@storybook/react"

import AboutSection from "./AboutSection"

const meta: Meta<typeof AboutSection> = {
  component: AboutSection
}

export default meta

export const DefaultAboutSection = () => {
  return <AboutSection />
}
