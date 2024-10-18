import EventsCardPreview, {
  IEventsCardPreview
} from "@/components/generic/Event/EventPreview/EventPreview"
import EventDetailed from "@/components/generic/Event/EventDetailed/EventDetailed"
import { DateUtils } from "@/components/utils/DateUtils"
import { Event } from "@/models/Events"
import { useMemo, useState } from "react"
import {
  EventDateComparisons,
  EventMessages,
  EventRenderingUtils
} from "@/components/generic/Event/EventUtils"
import Button from "@/components/generic/FigmaButtons/FigmaButton"
import Loader from "@/components/generic/SuspenseComponent/Loader"

interface IEventsPage {
  /**
   * A list of _all_ {@link Event}s which should either be mocked
   * or fetched from the backend. **NO** pre-processing should be
   * performed on this list as it will be further mutated in the
   * {@link EventsPage} component
   */
  rawEvents?: Event[]
  isLoading?: boolean
  hasMoreEvents?: boolean
  fetchMoreEvents?: () => void
}

interface EventList {
  upcomingAndCurrentEvents: Event[]
  pastEvents: Event[]
}

/**
 * Used to handle all _presentation_ logic conerning the evnts
 *
 * - **Do not make any network requests in this component, the data should
 * be fetched seperately and passed in as {@link rawEvents}**
 * - String operations are ideally done in {@link EventMessages}
 * - Complex date comparisons should also be abstracted away into {@link EventDateComparisons}
 */
const EventsPage = ({
  rawEvents = [],
  hasMoreEvents,
  isLoading,
  fetchMoreEvents
}: IEventsPage) => {
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>()

  /**
   * Partitions of the array that allow us to individually process the ongoing events
   */
  const eventList = useMemo(() => {
    return rawEvents.reduce(
      (buf: EventList, event) => {
        const { physical_start_date, physical_end_date } = event
        if (
          EventDateComparisons.isPastEvent(
            new Date(DateUtils.timestampMilliseconds(physical_start_date)),
            physical_end_date &&
              new Date(DateUtils.timestampMilliseconds(physical_end_date))
          )
        ) {
          buf.pastEvents.push(event)
        } else {
          buf.upcomingAndCurrentEvents.push(event)
        }

        /**
         * Determine the ordering of each the lists
         */
        buf.upcomingAndCurrentEvents.sort(
          (
            { physical_start_date: startDate1 },
            { physical_start_date: startDate2 }
          ) =>
            DateUtils.timestampMilliseconds(startDate1) -
            DateUtils.timestampMilliseconds(startDate2)
        )

        return buf
      },
      { upcomingAndCurrentEvents: [], pastEvents: [] }
    )
  }, [rawEvents])

  const selectedEventObject = useMemo(() => {
    if (!selectedEventId) return

    const eventInfo = rawEvents.find((event) => event.id === selectedEventId)
    return eventInfo
  }, [selectedEventId, rawEvents])

  /**
   * Detailed view of the
   */
  const SelectedEventPanel = useMemo(() => {
    if (!selectedEventObject) return null
    const {
      sign_up_start_date,
      google_forms_link,
      physical_end_date,
      physical_start_date,
      description,
      title
    } = selectedEventObject
    return (
      <EventDetailed
        onBack={() => {
          setSelectedEventId(undefined)
        }}
        date={EventMessages.eventDateRange(
          new Date(DateUtils.timestampMilliseconds(physical_start_date)),
          physical_end_date &&
            new Date(DateUtils.timestampMilliseconds(physical_end_date))
        )}
        isPastEvent={EventDateComparisons.isPastEvent(
          new Date(DateUtils.timestampMilliseconds(physical_start_date)),
          physical_end_date &&
            new Date(DateUtils.timestampMilliseconds(physical_end_date))
        )}
        image={selectedEventObject.image_url || ""}
        location={selectedEventObject.location}
        signUpOpenDate={
          new Date(DateUtils.timestampMilliseconds(sign_up_start_date))
        }
        googleFormLink={google_forms_link}
        content={<p>{description}</p>}
        title={title}
      />
    )
  }, [selectedEventObject])

  const formattedCurrentEvents: IEventsCardPreview[] =
    eventList.upcomingAndCurrentEvents?.map((event) => {
      return EventRenderingUtils.previewTransformer(event, setSelectedEventId)
    }) || []

  const formattedPastEvents: IEventsCardPreview[] =
    eventList.pastEvents?.map((event) => {
      return EventRenderingUtils.previewTransformer(event, setSelectedEventId)
    }) || []

  return (
    <>
      <div className={`flex w-full max-w-[1000px] flex-col gap-2`}>
        {selectedEventId ? (
          SelectedEventPanel
        ) : (
          <>
            {isLoading ? (
              <Loader />
            ) : (
              <h5 className="text-dark-blue-100 font-bold uppercase">
                Upcoming Events
              </h5>
            )}
            {formattedCurrentEvents.map((event) => (
              <EventsCardPreview key={event.title} {...event} />
            ))}

            {formattedPastEvents.map((event) => (
              <EventsCardPreview key={event.title} {...event} />
            ))}
          </>
        )}

        {hasMoreEvents && (
          <Button
            variant="default"
            onClick={fetchMoreEvents}
            disabled={isLoading}
          >
            Load More
          </Button>
        )}
      </div>
    </>
  )
}

export default EventsPage
