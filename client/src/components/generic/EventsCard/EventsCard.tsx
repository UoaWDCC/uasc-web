interface EventsCardProps {
  date: string
  title: string
  location: string
  content: React.ReactNode
}

type props = EventsCardProps

const EventsCard = ({ date, title, location, content }: props) => {
  const Divider = () => {
    return <div className="bg-gray-3 mb-4 mt-4 h-[1px] w-full"></div>
  }
  return (
    <div className="border-1-black h-full w-[760px] border">
      <div className="m-4">
        <h5 className="font-bold">{date}</h5>

        <h3 className="text-dark-blue-100 mt-1 font-bold">{title}</h3>

        <div className="text-gray-4 mt-2">{location}</div>
        <Divider />

        <div>{content}</div>
      </div>
    </div>
  )
}

export default EventsCard
