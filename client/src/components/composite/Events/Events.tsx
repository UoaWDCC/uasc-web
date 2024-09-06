import EventsCard, {
  EventsCardProps
} from "@/components/generic/EventsCard/EventsCard"

const events: EventsCardProps[] = [
  { date: "f", title: "cock", location: "w", content: "fu", onClick: () => {} },
  {
    date: "f",
    title: "cock",
    location: "w",
    content: "gay",
    onClick: () => {}
  },
  {
    date: "f",
    title: "cock",
    location: "w",
    content: "ray",
    onClick: () => {}
  },
  {
    date: "f",
    title: "cock",
    location: "w",
    content: "league",
    onClick: () => {}
  }
]

interface IEventsPage {
  events: EventsCardProps[]
}

const EventsPage = ({ events }: IEventsPage) => {
  return (
    <div>
      {events.map((event) => (
        <EventsCard
          date={event.date}
          title={event.title}
          location={event.location}
          content={event.content}
          onClick={event.onClick}
          key={event.date}
        />
      ))}
    </div>
  )
}

export default EventsPage
