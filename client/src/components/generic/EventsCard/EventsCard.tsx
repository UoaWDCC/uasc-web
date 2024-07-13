interface EventsCardProps {
  date: string
  title: string
  location: string
  content: React.ReactNode
}

type props = EventsCardProps

const Divider = () => {
  return <div className="h-1 w-full bg-black"></div>
}

const EventsCard = ({ date, title, location, content }: props) => {
  return (
    <div className="border-1-black h-full w-[760px] border">
      <div className="m-4">
        <div className="">{date}</div>
        <div className="">
          <h3 className="text-dark-blue-100 font-bold">{title}</h3>
        </div>
        <Divider />
        <div>{location}</div>
        <div>{content}</div>
      </div>
    </div>
  )
}

export default EventsCard
