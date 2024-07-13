import Button from "../FigmaButtons/FigmaButton"

interface EventsCardProps {
  date: string
  title: string
  location: string
  content: React.ReactNode
  onClick: () => void
}

type props = EventsCardProps

const EventsCard = ({ date, title, location, content, onClick }: props) => {
  const Divider = () => {
    return <div className="bg-gray-3 mb-4 mt-4 h-[1px] w-full"></div>
  }
  return (
    <div className="h-full w-full border text-center md:text-left">
      <div className="m-4">
        <h5 className="font-bold">{date}</h5>

        <h3 className="text-dark-blue-100 mt-1 font-bold">{title}</h3>

        <div className="text-gray-4 mt-2">{location}</div>
        <Divider />

        <div className="text-left">{content}</div>
      </div>
      <div className="mx-4 my-8">
        <Button onClick={onClick}>Sign Up!</Button>
      </div>
    </div>
  )
}

export default EventsCard
