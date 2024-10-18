// 4 props: 3 string, 1 image
import Image from "next/image"
import Arrow from "@/assets/icons/rightarrow.svg"

/**
 * The interface (props) associated with {@link EventsCardPreview}
 */
export interface IEventsCardPreview {
  /**
   * The image url of image to display
   */
  image?: string
  /**
   * A **pre-formatted** string to inform of when sign ups open for the event
   */
  signUpOpenDate: string
  /**
   * A **pre-formatted** string about when the event occurs
   */
  date: string
  /**
   * The handler that takes the user to a detailed view of an event
   */
  onClick: () => void
  /**
   * Where the event is located
   */
  location?: string

  /**
   * If an event should show as disabled, i.e it was in the past
   */
  isPastEvent?: boolean
  /**
   * Headline of the preview - generally is the title of the event
   */
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

/**
 * Card which is intended to be rendered multiple times to show
 * basic information about the events.
 *
 * **No data fetching should be performed in this component**
 */
const EventsCardPreview = ({
  date,
  title,
  location,
  onClick,
  image = "",
  signUpOpenDate,
  isPastEvent
}: IEventsCardPreview) => {
  return (
    <div
      className={`border-gray-3 navbar-shadow flex w-full flex-col items-center  
          	    justify-center gap-2 rounded-md border bg-white p-4 sm:flex-row 
                sm:px-10 sm:py-12 ${isPastEvent && "brightness-50"}`}
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
          <h5 className=" text-sm font-bold">{date}</h5>
          <p className="text-gray-4 pt-1 text-lg">
            {isPastEvent
              ? "Event has ended."
              : signUpOpenDate || "unknown date"}
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
