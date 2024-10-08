import Button from "@/components/generic/FigmaButtons/FigmaButton"
import { CreateEventBody } from "@/models/Events"
import { useState } from "react"
import AdminEventForm from "./AdminEventForm/AdminEventForm"

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
}

const AdminEventViewContent = ({
  mode,
  setMode,
  handlePostEvent,
  generateImageLink
  // TODO: extend with the event id to allow showing an edit view
}: {
  mode: EventViewModes
  setMode: (mode: EventViewModes) => void
} & IAdminEventView) => {
  switch (mode) {
    case "view-all-events":
      return null
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
  generateImageLink
}: IAdminEventView) => {
  const [mode, setMode] = useState<EventViewModes>("view-all-events")

  return (
    <div className="flex w-full flex-col">
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
      />
    </div>
  )
}

export default AdminEventView
