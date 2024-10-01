import type { Meta } from "@storybook/react"
import TabsComponent from "./TabsComponent"
import { useState } from "react"
import { Tab } from "@/components/generic/TabsComponent/TabsComponent"

const meta: Meta<typeof TabsComponent> = {
  component: TabsComponent,
  title: "TabsComponent"
}

export default meta

enum TabIndex {
  ONE,
  TWO,
  THREE
}

const BookingSection = () => (
  <>
    <h2 className="w-full text-left">Book Lodge</h2>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque odio
      similique, qui pariatur magnam ullam quaerat vero beatae aut esse
      voluptates corporis ea modi provident, molestias, nemo magni non
      necessitatibus.
    </p>
  </>
)

const exampleHeadings: Tab[] = [
  { title: "LODGE BOOKINGS", content: <BookingSection />, order: TabIndex.ONE },
  {
    title: "CANCELLATION",
    content: (
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
        aliquam, nisi temporibus atque, quos alias illo suscipit aperiam officia
        dicta sunt placeat corrupti tenetur asperiores dolores ducimus debitis,
        nesciunt perferendis.
      </p>
    ),
    order: TabIndex.TWO
  },
  { title: "BEHAVIOUR", content: <p>Contents 3</p>, order: TabIndex.THREE }
]

export const DefaultStory = () => {
  const [index, setIndex] = useState<TabIndex>(TabIndex.ONE)
  return (
    <TabsComponent
      tabs={exampleHeadings}
      selectedIndex={index}
      setCurrentIndex={setIndex}
    />
  )
}
