import React from "react"
import { render, fireEvent, waitFor } from "@testing-library/react"
import AdminEventForm, { AdminEventFormKeys } from "./AdminEventForm"

let handlePostEvent: any
const setup = () => {
  handlePostEvent = jest.fn()
  const utils = render(
    <AdminEventForm
      handlePostEvent={handlePostEvent}
      generateImageLink={async () => {
        return undefined
      }}
    />
  )
  return {
    ...utils
  }
}

describe("AdminEventForm", () => {
  let confirmSpy: any
  beforeAll(() => {
    confirmSpy = jest.spyOn(window, "confirm")
    confirmSpy.mockImplementation(jest.fn(() => true))
  })
  afterAll(() => confirmSpy.mockRestore())

  test("does not submit with invalid fields", async () => {
    const { getByTestId } = setup()

    fireEvent.click(getByTestId("post-event-button"))

    await waitFor(() => {
      expect(handlePostEvent).not.toHaveBeenCalled()
    })
  })

  test("submits the form with required data", async () => {
    const { getByTestId } = setup()

    fireEvent.change(getByTestId(AdminEventFormKeys.TITLE), {
      target: { value: "Test Event" }
    })
    fireEvent.change(getByTestId(AdminEventFormKeys.SIGN_UP_START_DATE), {
      target: { value: "2024-10-08T10:00" }
    })
    fireEvent.change(getByTestId(AdminEventFormKeys.PHYSICAL_START_DATE), {
      target: { value: "2024-10-09T10:00" }
    })
    fireEvent.change(getByTestId(AdminEventFormKeys.LOCATION), {
      target: { value: "Test Location" }
    })

    fireEvent.click(getByTestId("post-event-button"))

    await waitFor(() => {
      expect(handlePostEvent).toHaveBeenCalledWith({
        data: expect.objectContaining({
          title: "Test Event",
          sign_up_start_date: expect.any(Object),
          physical_start_date: expect.any(Object),
          location: "Test Location"
        })
      })
    })
  })
})
