import Button from "@/components/generic/FigmaButtons/FigmaButton"
import { CreateEventBody, EditEventBody, Event } from "@/models/Events"
import { useState } from "react"
import AdminEventForm from "./AdminEventForm/AdminEventForm"
import AdminAllEvents from "./AdminAllEvents/AdminAllEvents"
import Loader from "@/components/generic/SuspenseComponent/Loader"

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
   * {@link AdminEventViewContent} component.
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
   * If passed in, will open the edit panel for the event with given data
   */
  eventPreviousData?: Event

  /**
   * Will be called when the admin is _editing_ a selected event
   */
  handleEditEvent?: (eventId: string, newData: EditEventBody) => void

  /**
   * Callback for when an event is deleted by admin
   */
  handleDeleteEvent?: (eventId: string) => void

  /**
   * Obtains the latest data for an event to edit, if `undefined` is passed
   * in then it means that no event should be edited
   */
  fetchEventToEdit?: (eventId?: string) => void
}

const AdminEventViewContent = ({
  mode,
  setMode,
  handlePostEvent,
  generateImageLink,
  rawEvents,
  hasMoreEvents,
  isLoading,
  fetchMoreEvents,
  handleEditEvent,
  eventPreviousData,
  fetchEventToEdit,
  handleDeleteEvent
}: {
  mode: EventViewModes
  setMode: (mode: EventViewModes) => void
} & IAdminEventView) => {
  /**
   * Used to make the `PATCH` request for the event (need to specify path with `id`)
   */
  const [editedEventId, setEditedEventId] = useState<string | undefined>()

  switch (mode) {
    case "view-all-events":
      return (
        <AdminAllEvents
          onSelectedEventIdChange={(id) => {
            setEditedEventId(id)
            fetchEventToEdit?.(id)
            setMode("editing-event")
          }}
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
      if (!editedEventId) {
        setMode("view-all-events")
        return <Loader />
      }

      if (!eventPreviousData) {
        return <Loader />
      }

      return (
        <AdminEventForm
          generateImageLink={async (image) => {
            return await generateImageLink(image)
          }}
          defaultData={eventPreviousData}
          handleDeleteEvent={async () => {
            await handleDeleteEvent?.(editedEventId)
            setMode("view-all-events")
          }}
          handlePostEvent={async (data) => {
            await handleEditEvent?.(editedEventId, data.data)
            setMode("view-all-events")
          }}
          isEditMode
        />
      )
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
      return "Back to Events"
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
  fetchMoreEvents,
  eventPreviousData,
  handleEditEvent,
  fetchEventToEdit,
  handleDeleteEvent
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
                  setMode("view-all-events")
                  break
                case "editing-event":
                  fetchEventToEdit?.()
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
        handleDeleteEvent={handleDeleteEvent}
        fetchEventToEdit={fetchEventToEdit}
        handleEditEvent={handleEditEvent}
        handlePostEvent={handlePostEvent}
        generateImageLink={generateImageLink}
        rawEvents={rawEvents}
        hasMoreEvents={hasMoreEvents}
        isLoading={isLoading}
        eventPreviousData={eventPreviousData}
        fetchMoreEvents={fetchMoreEvents}
      />
    </div>
  )
}

export default AdminEventView
