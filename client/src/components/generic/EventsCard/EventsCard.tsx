import Button from "../FigmaButtons/FigmaButton"

export interface EventsCardProps {
  date?: string
  title: string
  location?: string
  content: React.ReactNode
  onClick: () => void
  previewOnClick: () => void
}

type props = EventsCardProps

const EventsCard = ({ date, title, location, content, onClick }: props) => {
  const Divider = () => {
    return <div className="bg-gray-3 mb-4 mt-4 h-[1px] w-full"></div>
  }
  return (
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
  )
}

export default EventsCard
