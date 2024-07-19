// 4 props: 3 string, 1 image
import { EventsCardProps } from "../EventsCard/EventsCard"
import Arrow from "@/assets/icons/rightarrow.svg"

type props = EventsCardProps
const ViewButton = () => {
  return (
    <button className="flex-col items-center justify-center gap-4 text-nowrap md:flex">
      <h5 className="text-dark-blue-100 text-lg font-bold uppercase">
        view more
      </h5>
      <Arrow className="fill-dark-blue-100 h-6 w-6" />
    </button>
  )
}
const EventsCardPreview = ({ date, title, location }: props) => {
  return (
    <div className="border-gray-3 flex w-full items-center justify-center gap-8 rounded-md border px-10 py-12">
      <div className="border-gray-3 border px-20 py-11">
        <p>image</p>
      </div>
      <div className="mb-4 mr-auto flex flex-col gap-2">
        <div>
          <h5 className="font-bold">{date}</h5>
          <h2 className="text-dark-blue-100">{title}</h2>
        </div>
        <p className="text-gray-4">{location}</p>
      </div>
      <ViewButton />
    </div>
  )
}

export default EventsCardPreview
