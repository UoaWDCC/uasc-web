import EventsCard, {
  EventsCardProps
} from "@/components/generic/EventsCard/EventsCard"

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
