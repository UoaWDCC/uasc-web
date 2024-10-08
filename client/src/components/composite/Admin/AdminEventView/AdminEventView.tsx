import Button from "@/components/generic/FigmaButtons/FigmaButton"
import { CreateEventBody } from "@/models/Events"
import { useState } from "react"
import AdminEventForm from "./AdminEventForm/AdminEventForm"

type EventViewModes = "view-all-events" | "creating-new-event" | "editing-event"

interface IAdminEventView {
  generateImageLink: (image: File) => Promise<string | undefined>
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

const buttonMessage = (mode: EventViewModes) => {
  switch (mode) {
    case "view-all-events":
      return "Create Event"
    case "creating-new-event":
    case "editing-event":
      return "Back to Events"
  }
}

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
