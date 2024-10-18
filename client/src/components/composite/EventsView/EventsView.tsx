import EventsCardPreview, {
  IEventsCardPreview
} from "@/components/generic/Event/EventPreview/EventPreview"
import EventDetailed from "@/components/generic/Event/EventDetailed/EventDetailed"
import { DateUtils } from "@/components/utils/DateUtils"
import { Event } from "@/models/Events"
import { useMemo, useState } from "react"
import {
  EventDateComparisons,
  EventMessages
} from "@/components/generic/Event/EventUtils"
import Button from "@/components/generic/FigmaButtons/FigmaButton"

interface IEventsPage {
  /**
   * A list of _all_ {@link Event}s which should either be mocked
   * or fetched from the backend. **NO** pre-processing should be
   * performed on this list as it will be further mutated in the
   * {@link EventsPage} component
   */
  rawEvents: Event[]
}

/**
 * Used to handle all _presentation_ logic conerning the evnts
 *
 * - **Do not make any network requests in this component, the data should
 * be fetched seperately and passed in as {@link rawEvents}**
 * - String operations are ideally done in {@link EventMessages}
 * - Complex date comparisons should also be abstracted away into {@link EventDateComparisons}
 */
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
        googleFormLink={selectedInfo.google_forms_link}
        content={<p>{selectedInfo.description}</p>}
        title={selectedInfo.title}
      />
    )
  }, [selectedInfo])

  const formattedEvents: IEventsCardPreview[] =
    rawEvents?.map((event) => {
      let eventStartDate

      if (event.physical_start_date) {
        eventStartDate = new Date(
          DateUtils.timestampMilliseconds(event?.physical_start_date)
        )
      }

      let eventEndDate

      if (event.physical_end_date) {
        eventEndDate = new Date(
          DateUtils.timestampMilliseconds(event?.physical_end_date)
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
        content: <p>{event?.description}</p>,
        signUpOpenDate: EventMessages.signUpOpen(signUpStartDate),
        pastEvent: EventDateComparisons.isPastEvent(
          eventStartDate,
          eventEndDate
        ),
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

        {<Button variant="default">Load More</Button>}
      </div>
    </>
  )
}

export default EventsPage
