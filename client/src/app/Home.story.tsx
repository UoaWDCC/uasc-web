import type { Meta } from "@storybook/react"

import HomeComponent from "./HomeComponent"

const meta: Meta<typeof HomeComponent> = {
  component: HomeComponent
}

export default meta

export const DefaultHomePage = () => {
  return <HomeComponent data={[]} />
}
