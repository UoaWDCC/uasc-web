import EventsCard, {
  EventsCardProps
} from "@/components/generic/EventsCard/EventsCard"

const eventsList: EventsCardProps[] = [
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
  eventsList: EventsCardProps[]
}

const EventsPage = ({ eventsList }: IEventsPage) => {
  return (
    <div>
      {eventsList.map((event) => (
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
