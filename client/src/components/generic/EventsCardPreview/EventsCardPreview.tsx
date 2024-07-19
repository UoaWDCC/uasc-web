// 4 props: 3 string, 1 image
import { EventsCardProps } from "../EventsCard/EventsCard"
type props = EventsCardProps
const EventsCardPreview = ({ date, title, location }: props) => {
  return (
    <div className="border-gray-3 flex w-full items-center justify-center border p-14">
      <div className="border-gray-3 border px-20 py-11">
        <p>Temporary Placeholder for image</p>
      </div>
      <div className="mr-auto flex flex-col">
        <h5>{date}</h5>
        <h2>{title}</h2>
        <p>{location}</p>
      </div>
    </div>
  )
}

export default EventsCardPreview
