import type { Meta, StoryObj } from "@storybook/react"
import AboutSection from "./AboutSection"
import RandomImage from "assets/images/Kayn_0.jpg"

const meta: Meta<typeof AboutSection> = {
  component: AboutSection
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultAboutSection: Story = {
  tags: ["autodocs"],
  args: {
    variant: "left",
    title: "Kayn",
    children:
      "A peerless practitioner of lethal shadow magic, Shieda Kayn battles to achieve his true destiny — to one day lead the Order of Shadow into a new era of Ionian supremacy.",
    imageSrc: RandomImage
  }
}
