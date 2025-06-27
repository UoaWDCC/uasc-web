import { useCallback, useMemo, useState } from "react"
import EventsCardPreview from "@/components/generic/Event/EventPreview/EventPreview"
import {
  EventDateComparisons,
  EventRenderingUtils
} from "@/components/generic/Event/EventUtils"
import Button from "@/components/generic/FigmaButtons/FigmaButton"
import Loader from "@/components/generic/SuspenseComponent/Loader"
import { DateUtils } from "@/components/utils/DateUtils"
import type { Event } from "@/models/Events"

/**
 * Interface representing the properties of the Events Page.
 */
interface IAdminAllEvents {
  /**
   * A list of _all_ {@link Event}s which should either be mocked
   * or fetched from the backend. **NO** pre-processing should be
   * performed on this list as it will be further mutated in the
   * {@link EventsPage} component.
   */
  rawEvents?: Event[]

  /**
   * Indicates whether the events are currently being loaded.
   */
  isLoading?: boolean

  /**
   * Indicates whether there are more events to be fetched.
   */
  hasMoreEvents?: boolean

  /**
   * Function to fetch more events.
   */
  fetchMoreEvents?: () => void

  /**
   * The ID of the preselected event.
   */
  preselectedEventId?: string

  /**
   * Callback function to handle changes to the selected event ID.
   * @param id - The new selected event ID.
   */
  onSelectedEventIdChange?: (id?: string) => void
}

/**
 * Helper type to split the raw events into upcoming and past ones,
 * this is important as they need to be sorted differently
 */
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
const AdminAllEvents = ({
  rawEvents = [],
  hasMoreEvents,
  isLoading,
  fetchMoreEvents,
  preselectedEventId,
  onSelectedEventIdChange
}: IAdminAllEvents) => {
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>(
    preselectedEventId
  )

  const eventSelectionHandler = useCallback(
    (id?: string) => {
      setSelectedEventId(id)
      onSelectedEventIdChange?.(id)
    },
    [onSelectedEventIdChange]
  )

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
         * Start dates ascending for upcoming and current events
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

  /**
   * Detailed view of the event
   */
  const previewCurrentEvents =
    eventList.upcomingAndCurrentEvents?.map((event) => {
      return EventRenderingUtils.previewTransformer(
        event,
        eventSelectionHandler,
        "edit event",
        "admin"
      )
    }) || []

  const previewPastEvents =
    eventList.pastEvents?.map((event) => {
      return EventRenderingUtils.previewTransformer(
        event,
        eventSelectionHandler,
        "edit event",
        "admin"
      )
    }) || []

  return (
    <>
      <div className={`flex w-full max-w-[1000px] flex-col gap-2`}>
        {selectedEventId ? null : (
          <>
            {isLoading ? (
              <Loader />
            ) : (
              <h5 className="text-dark-blue-100 font-bold uppercase">
                {rawEvents.length > 0 ? (
                  <>Upcoming Events</>
                ) : (
                  <>No events found!</>
                )}
              </h5>
            )}
            {previewCurrentEvents.map((event) => (
              <EventsCardPreview {...event} key={event.key} />
            ))}

            {previewPastEvents.map((event) => (
              <EventsCardPreview {...event} key={event.key} />
            ))}
          </>
        )}

        {hasMoreEvents && !selectedEventId && (
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

export default AdminAllEvents
