// 4 props: 3 string, 1 image
import { EventsCardProps } from "../EventsCard/EventsCard"
type props = EventsCardProps
const EventsCardPreview = ({ date, title, location }: props) => {
  return (
    <div className="border-gray-3 flex w-full items-center justify-center gap-8 border p-14">
      <div className="border-gray-3 border px-20 py-11">
        <p>image</p>
      </div>
      <div className="mb-4 mr-auto flex flex-col gap-2">
        <div>
          <h5>{date}</h5>
          <h2>{title}</h2>
        </div>
        <p className="">{location}</p>
      </div>
    </div>
  )
}

export default EventsCardPreview
