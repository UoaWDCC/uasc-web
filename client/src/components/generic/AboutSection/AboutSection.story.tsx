import type { Meta, StoryObj } from "@storybook/react"
import AboutSection from "./AboutSection"
import Kayn from "assets/images/Kayn_0.jpg"
import ImageLeft from "assets/images/hut.png"
import ImageRight from "assets/images/MountainBackgroundImage.png"

const meta: Meta<typeof AboutSection> = {
  component: AboutSection
}

export default meta
type Story = StoryObj<typeof meta>

export const LeftAboutSection: Story = {
  tags: ["autodocs"],
  args: {
    variant: "left",
    title: "Founded in 1996",
    children:
      "Back in 1966 a few of our founding members built the club lodge on Mt. Ruapehu. The lodge is geared up to sleep 32 and host raging parties all winter, and even with all the student antics we’ve been able to keep the place in good knick.",
    imageSrc: ImageLeft
  }
}
export const RightAboutSection: Story = {
  tags: ["autodocs"],
  args: {
    variant: "right",
    title: "Our Purpose: Skiing and Snowboarding",
    children:
      "The UASC lodge is a 32-bed haven for students and alike to gather up on the mountain throughout the winter season. It’s ridiculously close to the main chairlift at the base of Whakapapa, just a few minutes walk and you’re in line to get up the mountain. We hold events with organised transport every few weekends to make sure there’s an opportunity for everyone to get down there at some point.",
    imageSrc: ImageRight
  }
}
export const KaynAboutSection: Story = {
  tags: ["autodocs"],
  args: {
    variant: "left",
    title: "Kayn",
    children:
      "A peerless practitioner of lethal shadow magic, Shieda Kayn battles to achieve his true destiny — to one day lead the Order of Shadow into a new era of Ionian supremacy.",
    imageSrc: Kayn
  }
}
