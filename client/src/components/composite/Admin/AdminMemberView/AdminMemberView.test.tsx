import { render, fireEvent, waitFor } from "@testing-library/react"
import { AdminMemberView } from "./AdminMemberView"

describe("AdminMemberView", () => {
  it("Filters the data properly by both name and email", async () => {
    const { getByTestId, queryByText } = render(
      <AdminMemberView
        data={[
          { Name: "John", Email: "key@mail.com" },
          { Name: "Dog", Email: "key@mail.com" },
          { Name: "cat", Email: "key1@mail.com" },
          { Name: "fish", Email: "key2@mail.com" },
          { Name: "sausage", Email: "key3@mail.com" }
        ]}
      />
    )

    const input = getByTestId("search-input")

    fireEvent.change(input, { target: { value: "John" } })

    await waitFor(async () => {
      expect(await queryByText("John")).toBeVisible()
      expect(await queryByText("Dog")).toBeNull()
      expect(await queryByText("cat")).toBeNull()
      expect(await queryByText("fish")).toBeNull()
      expect(await queryByText("sausage")).toBeNull()
    })

    fireEvent.change(input, { target: { value: "" } })

    await waitFor(async () => {
      expect(await queryByText("John")).toBeVisible()
      expect(await queryByText("Dog")).toBeVisible()
      expect(await queryByText("cat")).toBeVisible()
      expect(await queryByText("fish")).toBeVisible()
      expect(await queryByText("sausage")).toBeVisible()
    })

    fireEvent.change(input, { target: { value: "key@" } })

    await waitFor(async () => {
      expect(await queryByText("John")).toBeVisible()
      expect(await queryByText("Dog")).toBeVisible()
      expect(await queryByText("cat")).toBeNull()
      expect(await queryByText("fish")).toBeNull()
      expect(await queryByText("sausage")).toBeNull()
    })
  })
})
