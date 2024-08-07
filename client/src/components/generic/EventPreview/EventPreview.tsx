// 4 props: 3 string, 1 image
import { EventsCardProps } from "../EventsCard/EventsCard"
import Arrow from "@/assets/icons/rightarrow.svg"

type props = EventsCardProps
type ViewButtonProps = {
  onClick: () => void
}
const ViewButton = ({ onClick }: ViewButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-4 text-nowrap p-2"
    >
      <h5 className="text-dark-blue-100  group text-lg font-bold uppercase">
        view more
      </h5>
      <Arrow className="fill-dark-blue-100 h-6 w-6" />
    </button>
  )
}
const EventsCardPreview = ({ date, title, location, onClick }: props) => {
  return (
    <div className="border-gray-3 flex w-full items-center justify-center gap-8 rounded-md border px-10 py-12">
      <div className="border-gray-3 border px-20 py-11">
        <p>image</p>
      </div>
      <div className="mb-4 mr-auto flex flex-col">
        <div>
          <h5 className="text-lg font-bold">{date}</h5>
          <h2 className="text-dark-blue-100">{title}</h2>
        </div>
        <p className="text-gray-4 pt-1 text-lg">{location}</p>
      </div>
      <ViewButton onClick={onClick} />
    </div>
  )
}

export default EventsCardPreview
