import EventsCardPreview, {
  IEventsCardPreview
} from "@/components/generic/Event/EventPreview/EventPreview"
import EventDetailed from "@/components/generic/Event/EventDetailed/EventDetailed"
import { DateUtils } from "@/components/utils/DateUtils"
import { Event } from "@/models/Events"
import { useMemo, useState } from "react"
import { EventMessages } from "@/components/generic/Event/EventUtils"

interface IEventsPage {
  rawEvents: Event[]
}

const EventsPage = ({ rawEvents }: IEventsPage) => {
  const [selectedEvent, setSelectedEvent] = useState<string | undefined>()

  const selectedInfo = useMemo(() => {
    if (!selectedEvent) return

    const eventInfo = rawEvents.find((event) => event.id === selectedEvent)
    return eventInfo
  }, [selectedEvent, rawEvents])

  const SelectedEventPanel = useMemo(() => {
    if (!selectedInfo) return null

    return (
      <EventDetailed
        onBack={() => {
          setSelectedEvent(undefined)
        }}
        date={EventMessages.eventDateRange(
          new Date(
            DateUtils.timestampMilliseconds(selectedInfo.sign_up_start_date)
          )
        )}
        image={selectedInfo.image_url || ""}
        location={selectedInfo.location}
        signUpOpenDate={
          new Date(
            DateUtils.timestampMilliseconds(selectedInfo.sign_up_start_date)
          )
        }
        content={<p>{selectedInfo.description}</p>}
        title={selectedInfo.title}
      />
    )
  }, [selectedInfo])

  const formattedEvents: IEventsCardPreview[] =
    rawEvents?.map((event) => {
      let eventStartDate

      if (event?.physical_start_date) {
        eventStartDate = new Date(
          DateUtils.timestampMilliseconds(event?.physical_start_date)
        )
      }

      const signUpStartDate = new Date(
        DateUtils.timestampMilliseconds(event.sign_up_start_date)
      )

      return {
        date: eventStartDate
          ? EventMessages.eventDateRange(eventStartDate)
          : "",
        image: event?.image_url || "",
        title: event?.title || "",
        location: event?.location,
        content: <>{event?.description}</>,
        sign_up_open_date: EventMessages.signUpOpen(signUpStartDate),
        pastEvent: eventStartDate && eventStartDate <= new Date(),
        onClick: () => {
          setSelectedEvent(event.id)
        }
      }
    }) || []

  return (
    <>
      <div className="flex w-full max-w-[1000px] flex-col gap-2">
        {selectedEvent ? (
          SelectedEventPanel
        ) : (
          <>
            {formattedEvents.map((event) => (
              <EventsCardPreview key={event.title} {...event} />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default EventsPage
