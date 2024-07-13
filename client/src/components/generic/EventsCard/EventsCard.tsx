interface EventsCardProps {
  date: string
  title: string
  location: string
  content: React.ReactNode
}

type props = EventsCardProps

const EventsCard = ({ date, title, location, content }: props) => {
  return (
    <div className="border-1-black h-full w-[760px] border">
      <div className="">{date}</div>
      <div>
        <h2>{title}</h2>
      </div>
      <div>{location}</div>
      <div>{content}</div>
    </div>
  )
}

export default EventsCard
