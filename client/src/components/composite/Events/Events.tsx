import EventsCard from "@/components/generic/EventsCard/EventsCard"
import { EventsCardProps } from "@/components/generic/EventsCard/EventsCard"
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

const EventsPage = () => {
  return (
    <div>
      {eventsList.map((event) => (
        <EventsCard
          date={event.date}
          title={event.title}
          location={event.location}
          content={event.content}
          onClick={event.onClick}
          key={event.content}
        />
      ))}
    </div>
  )
}

export default EventsPage
