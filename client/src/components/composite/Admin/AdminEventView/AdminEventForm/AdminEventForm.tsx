import Button from "@/components/generic/FigmaButtons/FigmaButton"
import TextInput from "@/components/generic/TextInputComponent/TextInput"
import { CreateEventBody } from "@/models/Events"
import { Timestamp } from "firebase/firestore"
import Image from "next/image"
import { FormEvent, useState } from "react"

interface IAdminEventForm {
  /**
   * Pass in **only** if using to edit instead of create.
   * If it is not `undefined` assume that it is event edit instead of creation
   */
  eventId?: string

  /**
   * To generate a link to be stored in firestore
   *
   * @param image The uploaded image to store
   */
  generateImageLink: (image: File) => Promise<string | undefined>

  /**
   * To be called after user submits the new data for the event
   */
  handlePostEvent: (data: CreateEventBody) => void
}

export const AdminEventFormKeys = {
  TITLE: "title",
  DESCRIPTION: "description",
  IMAGE_URL: "image url",
  LOCATION: "location",
  GOOGLE_FORMS_LINK: "google forms link",
  SIGN_UP_START_DATE: "sign up start date",
  SIGN_UP_END_DATE: "sign up end date",
  PHYSICAL_START_DATE: "physical start date",
  PHYSICAL_END_DATE: "physical end date",
  MAX_OCCUPANCY: "max signups"
} as const

const Divider = () => <span className="bg-gray-3 my-3 h-[1px] w-full" />

const AdminEventForm = ({
  handlePostEvent,
  generateImageLink
}: IAdminEventForm) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const [uploadedImage, setUploadedImage] = useState<File | undefined>()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    const physical_end_date = data.get(AdminEventFormKeys.PHYSICAL_END_DATE)
    const sign_up_end_date = data.get(AdminEventFormKeys.SIGN_UP_END_DATE)

    const body: CreateEventBody["data"] = {
      // Required Fields
      title: data.get(AdminEventFormKeys.TITLE) as string,
      sign_up_start_date: Timestamp.fromDate(
        new Date(data.get(AdminEventFormKeys.SIGN_UP_START_DATE) as string)
      ),
      physical_start_date: Timestamp.fromDate(
        new Date(data.get(AdminEventFormKeys.PHYSICAL_START_DATE) as string)
      ),
      // Optional fields
      google_forms_link: data.get(
        AdminEventFormKeys.GOOGLE_FORMS_LINK
      ) as string,
      description: data.get(AdminEventFormKeys.DESCRIPTION) as string,
      sign_up_end_date: sign_up_end_date
        ? Timestamp.fromDate(new Date(sign_up_end_date as string))
        : undefined,
      location: (data.get(AdminEventFormKeys.LOCATION) as string) || "",
      max_occupancy:
        Number.parseInt(data.get(AdminEventFormKeys.MAX_OCCUPANCY) as string) ||
        undefined,
      physical_end_date: physical_end_date
        ? Timestamp.fromDate(new Date(physical_end_date as string))
        : undefined
    }

    try {
      setIsSubmitting(true)

      if (
        confirm(
          `Are you sure you want to create the new event with title ${body.title}?`
        )
      ) {
        handlePostEvent({
          data: {
            ...body,
            image_url: uploadedImage && (await generateImageLink(uploadedImage))
          }
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="relative my-4 flex w-full flex-col items-center rounded-md bg-white p-2">
      <h2 className="text-dark-blue-100">Create Event</h2>
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-[800px] flex-col gap-2"
      >
        <TextInput
          name={AdminEventFormKeys.TITLE}
          type="text"
          label="Title"
          data-testid={AdminEventFormKeys.TITLE}
          required
        />
        <label htmlFor={AdminEventFormKeys.DESCRIPTION}>Description</label>
        <textarea
          name={AdminEventFormKeys.DESCRIPTION}
          data-testid={AdminEventFormKeys.DESCRIPTION}
        />

        <TextInput
          label="Image"
          type="file"
          accept="image/png,image/jpeg"
          onChange={(e) => {
            if (e.target.files) {
              setUploadedImage(e.target.files[0])
            }
          }}
        />
        {uploadedImage && (
          <div className="">
            <Image
              height={500}
              width={500}
              src={URL.createObjectURL(uploadedImage)}
              alt="Uploaded"
              className="max-h-[200px] w-auto"
            />
          </div>
        )}

        <TextInput
          name={AdminEventFormKeys.LOCATION}
          type="text"
          label="Location"
          data-testid={AdminEventFormKeys.LOCATION}
          required
        />
        <Divider />
        <h3 className="text-dark-blue-100 text-center">Sign up dates</h3>
        <span className="flex w-full flex-col gap-2 sm:flex-row">
          <TextInput
            name={AdminEventFormKeys.SIGN_UP_START_DATE}
            data-testid={AdminEventFormKeys.SIGN_UP_START_DATE}
            type="datetime-local"
            label="Sign Up Start Date"
            required
          />
          <TextInput
            name={AdminEventFormKeys.SIGN_UP_END_DATE}
            data-testid={AdminEventFormKeys.SIGN_UP_END_DATE}
            type="datetime-local"
            label="Sign Up End Date (If exists)"
          />
        </span>

        <Divider />
        <h3 className="text-dark-blue-100 mt-2 text-center">Event Dates</h3>
        <span className="flex w-full flex-col gap-2 sm:flex-row">
          <TextInput
            name={AdminEventFormKeys.PHYSICAL_START_DATE}
            data-testid={AdminEventFormKeys.PHYSICAL_START_DATE}
            type="datetime-local"
            label="Start Date of Event"
            required
          />
          <TextInput
            name={AdminEventFormKeys.PHYSICAL_END_DATE}
            data-testid={AdminEventFormKeys.PHYSICAL_END_DATE}
            type="datetime-local"
            label="End Date of Event"
          />
        </span>
        <Divider />
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
    </div>
  )
}

export default AdminEventForm
