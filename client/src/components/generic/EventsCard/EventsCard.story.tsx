/* eslint-disable no-irregular-whitespace */
import type { Meta, StoryObj } from "@storybook/react"

import EventsCard from "./EventsCard"
const meta: Meta<typeof EventsCard> = {
  component: EventsCard
}
export default meta
type Story = StoryObj<typeof meta>

export const DefaultEventsCard: Story = {
  tags: ["autodocs"],
  args: {
    title: "Outdoor Clubs Welcome Party",
    date: "THU 18/7 • 6pm",
    location: "Shadows Bar - 8 Alfred St, CBD, Auckland",
    content: `Get ready to kick off Re-O-Week with a bang!  Join us at Shadows Bar for the ultimate Outdoor Clubs Welcome Party, hosted by UoA Snowsports Club! Whether you're into hiking, biking, skiing, or just having a good time, this is the place to be!`
  }
}

export const DefaultEventsCard2: Story = {
  tags: ["autodocs"],
  args: {
    title: "goon",
    date: "...",
    location: "goon cave",
    content: `piss`
  }
}

export const DefaultEventsCard3: Story = {
  tags: ["autodocs"],
  args: {
    title:
      "Duis dapibus scelerisque nibh, sit amet facilisis erat. Integer sagittis mi id orci fermentum bibendum",
    date: "Duis dapibus scelerisque nibh, sit amet facilisis erat. Integer sagittis mi id orci fermentum bibendum",
    location:
      "Duis dapibus scelerisque nibh, sit amet facilisis erat. Integer sagittis mi id orci fermentum bibendum.",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget feugiat metus. Curabitur dapibus, urna id convallis congue, risus libero feugiat ligula, nec sodales odio ante sit amet est. Fusce tempus tristique sapien, a malesuada eros auctor id. Nulla luctus maximus tortor, in gravida tortor tincidunt et. Ut vehicula odio quis ultricies tincidunt. Cras scelerisque interdum felis, in consequat orci egestas id. Pellentesque eget eros sit amet nulla sagittis tempus. Ut dapibus lacus sed libero posuere condimentum. Sed vel tincidunt arcu, nec accumsan purus. Aliquam nec malesuada purus. Etiam convallis orci vel scelerisque scelerisque. Nunc fermentum ipsum et elit congue tristique. Vestibulum id gravida lectus. Fusce at orci eros. Vestibulum nec odio eget dolor condimentum sodales. Suspendisse egestas laoreet odio, in dictum justo cursus et. Phasellus auctor justo at convallis rhoncus. Sed venenatis risus ut diam vehicula accumsan. Nulla et suscipit ex. Phasellus quis lobortis ligula, at ullamcorper est. Fusce lobortis, quam nec vehicula ullamcorper, tortor orci viverra elit, in porta velit odio ac dui. Sed scelerisque mi ac est consectetur venenatis. Integer ut mauris id turpis iaculis condimentum ac at ipsum. Curabitur pretium arcu sed nunc vestibulum fermentum. Cras posuere rhoncus diam, sed dictum leo egestas at. Nunc mollis felis ac ante tincidunt, ut tempor lorem pharetra. Vestibulum cursus tincidunt nunc, vel viverra mauris volutpat sit amet. Duis sed nisi nisi. Sed vitae tellus non purus malesuada suscipit. Maecenas non lacus ac leo facilisis fringilla. Maecenas ultricies risus ut erat dapibus, vitae viverra risus ornare. Nam vel erat lorem. Pellentesque quis mi elit. Nulla porttitor sapien eros, sit amet gravida ex lobortis eget. Nam volutpat dui id neque luctus malesuada. Cras fermentum sem nec risus efficitur, a hendrerit libero dapibus. Donec consequat, lacus in aliquam vulputate, sem lectus tempor quam, eget egestas velit justo ut arcu. Duis dapibus scelerisque nibh, sit amet facilisis erat. Integer sagittis mi id orci fermentum bibendum. Vivamus efficitur finibus risus, sit amet efficitur magna dictum et. Nullam tincidunt mollis augue, id tincidunt turpis iaculis sed. Cras vestibulum velit felis, a posuere odio ultricies quis. Integer interdum turpis euismod nibh rutrum aliquet. Donec scelerisque dapibus vulputate. Curabitur malesuada, mi ac tincidunt varius, libero lorem dictum ligula, at malesuada leo nunc vel felis. Praesent a augue efficitur, vehicula enim ac, scelerisque felis. Nam non facilisis nisi. Integer nec quam eget mauris pharetra feugiat eget in felis. Integer imperdiet lorem eu nisi volutpat tincidunt. Nam efficitur orci sit amet nisi ornare dapibus. Proin a ultricies orci. Nunc rutrum turpis eget felis volutpat accumsan. Donec ut risus efficitur, luctus mauris ut, fermentum purus. Fusce cursus lorem ac nisi gravida, ut tempus lorem tincidunt. Morbi efficitur, velit sed vestibulum fringilla, felis ipsum lobortis felis, in venenatis nisi quam at nisi. Nam at malesuada arcu. Suspendisse potenti. Phasellus laoreet quam ut ligula posuere, at iaculis odio suscipit. Phasellus at arcu sed sapien tincidunt tincidunt.`
  }
}

export const EventsCardGroup: Story = {
  render: () => (
    <div style={{ display: "flex flex-col", gap: "1rem" }}>
      <EventsCard
        title="Another Event"
        date="FRI 19/7 • 7pm"
        location="Somewhere Else"
        content="Join us for another exciting event!"
        onClick={() => {}}
      />
      <EventsCard
        title="Another Event"
        date="FRI 19/7 • 7pm"
        location="Somewhere Else"
        content="Join us for another exciting event!"
        onClick={() => {}}
      />
      <EventsCard
        title="Another Event"
        date="FRI 19/7 • 7pm"
        location="Somewhere Else"
        content="Join us for another exciting event!"
        onClick={() => {}}
      />
    </div>
  ),
  args: {}
}
