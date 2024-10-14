// 4 props: 3 string, 1 image
import Image from "next/image"
import Arrow from "@/assets/icons/rightarrow.svg"

export interface IEventsCardPreview {
  image?: string
  sign_up_open_date: string
  date: string
  onClick: () => void
  location?: string

  /**
   * If an event should show as disabled, i.e it was in the past
   */
  pastEvent?: boolean

  title: string
}
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
const EventsCardPreview = ({
  date,
  title,
  location,
  onClick,
  image = "",
  sign_up_open_date,
  pastEvent
}: IEventsCardPreview) => {
  return (
    <div
      className={`border-gray-3 navbar-shadow flex w-full flex-col items-center  
          	    justify-center gap-2 rounded-md border bg-white p-4 sm:flex-row 
                sm:px-10 sm:py-12 ${pastEvent && "brightness-50"}`}
    >
      <div className="border-gray-3 h-[100px] max-h-[100px] w-[200px] border">
        <Image
          src={image}
          alt="Event cover image"
          width={500}
          height={300}
          className="h-full w-auto"
        />
      </div>
      <div className="mb-4 flex flex-col sm:ml-4 ">
        <div>
          <h5 className="text-lg font-bold">{date}</h5>
          <p className="text-gray-4 pt-1 text-lg">
            Sign-up opens at {sign_up_open_date || "unknown date"}
          </p>
          <h2 className="text-dark-blue-100 sm:text-h2 text-h3">{title}</h2>
        </div>
        <p className="text-gray-4 pt-1 text-lg">{location}</p>
      </div>
      <span className="ml-auto">
        <ViewButton onClick={onClick} />
      </span>
    </div>
  )
}

export default EventsCardPreview
