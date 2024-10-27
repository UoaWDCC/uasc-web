import Button from "@/components/generic/FigmaButtons/FigmaButton"
import { CreateEventBody, Event } from "@/models/Events"
import { useState } from "react"
import AdminEventForm from "./AdminEventForm/AdminEventForm"
import AdminAllEvents from "./AdminAllEvents/AdminAllEvents"

type EventViewModes = "view-all-events" | "creating-new-event" | "editing-event"

interface IAdminEventView {
  /**
   * Generates a link for the provided image.
   *
   * @param image - The image file for which the link needs to be generated.
   * @returns A promise that resolves to the generated image link or undefined if the generation fails.
   */
  generateImageLink: (image: File) => Promise<string | undefined>

  /**
   * Handles the posting of event data.
   *
   * @param data - The data of the event to be posted.
   */
  handlePostEvent: (data: CreateEventBody) => void

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
}

const AdminEventViewContent = ({
  mode,
  setMode,
  handlePostEvent,
  generateImageLink,
  rawEvents,
  hasMoreEvents,
  isLoading,
  fetchMoreEvents
  // TODO: extend with the event id to allow showing an edit view
}: {
  mode: EventViewModes
  setMode: (mode: EventViewModes) => void
} & IAdminEventView) => {
  switch (mode) {
    case "view-all-events":
      return (
        <AdminAllEvents
          rawEvents={rawEvents}
          hasMoreEvents={hasMoreEvents}
          isLoading={isLoading}
          fetchMoreEvents={fetchMoreEvents}
        />
      )
    case "creating-new-event":
      return (
        <AdminEventForm
          generateImageLink={async (image) => {
            return await generateImageLink(image)
          }}
          handlePostEvent={async (data) => {
            await handlePostEvent(data)
            setMode("view-all-events")
          }}
        />
      )
    case "editing-event":
      return null
  }
}

/**
 * For use with the button in the top right
 */
const buttonMessage = (mode: EventViewModes) => {
  switch (mode) {
    case "view-all-events":
      return "Create Event"
    case "creating-new-event":
    case "editing-event":
      return "Back to Events"
  }
}

/**
 * Contains all the components and display logic for management of events by admins
 * @deprecated do not use directly in app, use {@link WrappedAdminEventView} instead
 */
const AdminEventView = ({
  handlePostEvent,
  generateImageLink,
  rawEvents = [],
  hasMoreEvents,
  isLoading,
  fetchMoreEvents
}: IAdminEventView) => {
  const [mode, setMode] = useState<EventViewModes>("view-all-events")

  return (
    <div className="flex w-full flex-col items-center">
      <span className="flex w-full flex-col items-center sm:flex-row">
        <h2 className="text-dark-blue-100 italic">Events</h2>
        <div className="sm:ml-auto">
          <Button
            variant="default-sm"
            onClick={() => {
              switch (mode) {
                case "view-all-events":
                  setMode("creating-new-event")
                  break
                case "creating-new-event":
                case "editing-event":
                  setMode("view-all-events")
              }
            }}
          >
            {buttonMessage(mode)}
          </Button>
        </div>
      </span>
      <AdminEventViewContent
        setMode={setMode}
        mode={mode}
        handlePostEvent={handlePostEvent}
        generateImageLink={generateImageLink}
        rawEvents={rawEvents}
        hasMoreEvents={hasMoreEvents}
        isLoading={isLoading}
        fetchMoreEvents={fetchMoreEvents}
      />
    </div>
  )
}

export default AdminEventView
