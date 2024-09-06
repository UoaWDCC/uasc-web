import EventsCard, {
  EventsCardProps
} from "@/components/generic/EventsCard/EventsCard"

interface IEventsPage {
  events: EventsCardProps[]
}

const EventsPage = ({ events }: IEventsPage) => {
  return (
    <div
      className="bg-mountain-background-image relative z-10 flex min-h-[100vh] w-fit
      min-w-full flex-col items-center bg-cover bg-top bg-no-repeat md:px-8"
    >
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
    </div>
  )
}

export default EventsPage
