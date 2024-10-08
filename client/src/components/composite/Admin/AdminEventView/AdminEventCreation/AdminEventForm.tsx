import Button from "@/components/generic/FigmaButtons/FigmaButton"
import TextInput from "@/components/generic/TextInputComponent/TextInput"
import { CreateEventBody } from "@/models/Events"
import { Timestamp } from "firebase/firestore"
import { FormEvent, useState } from "react"

interface IAdminEventForm {
  /**
   * Pass in **only** if using to edit instead of create.
   * If it is not `undefined` assume that it is event edit instead of creation
   */
  eventId?: string
  /**
   * To be called after user submits the new data for the event
   */
  handlePostEvent: (data: CreateEventBody) => void
}

export const AdminEventFormKeys = {
  TITLE: "first name",
  DESCRIPTION: "email",
  IMAGE_URL: "last name",
  LOCATION: "dietary requirements",
  GOOGLE_FORMS_LINK: "phone number",
  SIGN_UP_START_DATE: "emergency contact",
  PHYSICAL_START_DATE: "membership",
  MAX_OCCUPANCY: "max signups"
} as const

const AdminEventForm = ({ handlePostEvent }: IAdminEventForm) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    const body = {
      title: data.get(AdminEventFormKeys.TITLE) as string,
      google_forms_link: data.get(
        AdminEventFormKeys.GOOGLE_FORMS_LINK
      ) as string,
      location: data.get(AdminEventFormKeys.LOCATION) as string,
      sign_up_start_date: Timestamp.fromDate(
        new Date(data.get(AdminEventFormKeys.SIGN_UP_START_DATE) as string)
      ),
      physical_start_date: Timestamp.fromDate(
        new Date(data.get(AdminEventFormKeys.PHYSICAL_START_DATE) as string)
      )
    }

    try {
      setIsSubmitting(true)
      handlePostEvent({
        data: { ...body }
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <>
      <h2 className="text-dark-blue-100">Create Event</h2>
      <form
        onSubmit={handleSubmit}
        className="xs:max-w-[500px] flex w-full max-w-[250px] flex-col gap-2"
      >
        <TextInput
          name={AdminEventFormKeys.TITLE}
          type="text"
          label="Title"
          data-testid={AdminEventFormKeys.TITLE}
          required
        />
        <TextInput
          name={AdminEventFormKeys.DESCRIPTION}
          label="Description"
          data-testid={AdminEventFormKeys.DESCRIPTION}
          required
        />
        <TextInput
          name={AdminEventFormKeys.SIGN_UP_START_DATE}
          data-testid={AdminEventFormKeys.SIGN_UP_START_DATE}
          type="datetime-local"
          label="Sign Up Start Date"
          required
        />
        <TextInput
          name={AdminEventFormKeys.GOOGLE_FORMS_LINK}
          data-testid={AdminEventFormKeys.GOOGLE_FORMS_LINK}
          type="url"
          label="Google Forms Link"
        />
        <Button
          disabled={isSubmitting}
          type="submit"
          data-testid="post-event-button"
        >
          Add Event
        </Button>
      </form>
    </>
  )
}

export default AdminEventForm
