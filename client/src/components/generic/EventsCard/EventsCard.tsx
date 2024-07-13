interface EventsCardProps {
    date: string
    title: string
    location: string
    content: React.ReactNode
}

type props = EventsCardProps

const EventsCard = ({...props}: props) => {
  return <div className="border-1-black h-full w-[760px] border">
    <div className="">
        {props.date}
    </div>
    <div>
        <h2>{props.title}</h2>
    </div>
    <div>{props.location}</div>
    <div>{props.content}</div>
  </div>
}

export default EventsCard
