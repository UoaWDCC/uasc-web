import { viewport } from "next-sanity/studio"
import Button from "../FigmaButtons/FigmaButton"
import Image, { StaticImageData } from "next/image"
/**
 * Props for event card
 */
export interface EventsCardProps {
  /**
   * The date of the event as a string.
   * @example "THU 18/7 • 6pm"
   */
  date?: string

  /**
   * The title of the event as a string
   * @example "I am sigma"
   */
  title: string

  /**
   * The location of the event as a string
   * @example "Basement"
   */
  location?: string

  /**
   * The content of the event as a react node
   */
  content: React.ReactNode

  /**
   * The function when the button on the card / preview card is clicked
   */
  onClick: () => void

  /**
   * The image cover on the top of the card
   */
  image: string | StaticImageData
}

type props = EventsCardProps

const EventsCard = ({
  date,
  title,
  location,
  content,
  onClick,
  image
}: props) => {
  const Divider = () => {
    return <div className="bg-gray-3 mb-4 mt-4 h-[1px] w-full"></div>
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={image}
        alt="Event cover image"
        width={}
        height={300}
        className="h-auto w-full"
      />
      <div className="h-full w-full border p-8 text-center md:text-left">
        <h5 className="font-bold">{date}</h5>

        <h3 className="text-dark-blue-100 mt-1 font-bold">{title}</h3>

        <div className="text-gray-4 mt-2">{location}</div>
        <Divider />

        <div className="text-left">{content}</div>

        <div className="mt-4">
          <Button onClick={onClick}>Sign Up!</Button>
        </div>
      </div>
    </div>
  )
}

export default EventsCard
