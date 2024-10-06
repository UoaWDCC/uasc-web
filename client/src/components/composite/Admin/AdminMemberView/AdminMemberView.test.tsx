import { render, fireEvent, waitFor } from "@testing-library/react"
import { AdminMemberView } from "./AdminMemberView"

describe("AdminMemberView", () => {
  it("Filters the data properly by both name and email", async () => {
    const { getByTestId, queryByText } = render(
      <AdminMemberView
        data={[
          { uid: "", Name: "John", Email: "key@mail.com" },
          { uid: "", Name: "Dog", Email: "key@mail.com" },
          { uid: "", Name: "cat", Email: "key1@mail.com" },
          { uid: "", Name: "fish", Email: "key2@mail.com" },
          { uid: "", Name: "sausage", Email: "key3@mail.com" }
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
  it("Filters the data properly by account type", async () => {
    const { getByText, queryByText } = render(
      <AdminMemberView
        data={[
          { uid: "", Name: "John", Email: "key@mail.com", Status: "admin" },
          { uid: "", Name: "Dog", Email: "key@mail.com", Status: "member" },
          { uid: "", Name: "cat", Email: "key1@mail.com", Status: "guest" },
          { uid: "", Name: "fish", Email: "key2@mail.com", Status: "member" },
          { uid: "", Name: "sausage", Email: "key3@mail.com", Status: "admin" }
        ]}
      />
    )

    const roleFilterButton = getByText("all")

    // Cycle through filters
    fireEvent.click(roleFilterButton) // admin
    await waitFor(() => {
      expect(queryByText("John")).toBeVisible()
      expect(queryByText("sausage")).toBeVisible()
      expect(queryByText("Dog")).toBeNull()
      expect(queryByText("cat")).toBeNull()
      expect(queryByText("fish")).toBeNull()
    })

    fireEvent.click(roleFilterButton) // member
    await waitFor(() => {
      expect(queryByText("John")).toBeNull()
      expect(queryByText("sausage")).toBeNull()
      expect(queryByText("Dog")).toBeVisible()
      expect(queryByText("cat")).toBeNull()
      expect(queryByText("fish")).toBeVisible()
    })

    fireEvent.click(roleFilterButton) // guest
    await waitFor(() => {
      expect(queryByText("John")).toBeNull()
      expect(queryByText("sausage")).toBeNull()
      expect(queryByText("Dog")).toBeNull()
      expect(queryByText("cat")).toBeVisible()
      expect(queryByText("fish")).toBeNull()
    })

    fireEvent.click(roleFilterButton) // all
    await waitFor(() => {
      expect(queryByText("John")).toBeVisible()
      expect(queryByText("sausage")).toBeVisible()
      expect(queryByText("Dog")).toBeVisible()
      expect(queryByText("cat")).toBeVisible()
      expect(queryByText("fish")).toBeVisible()
    })
  })

  it("Filters the data by both search query and account type", async () => {
    const { getByText, getByTestId, queryByText } = render(
      <AdminMemberView
        data={[
          { uid: "", Name: "John", Email: "key@mail.com", Status: "admin" },
          { uid: "", Name: "Dog", Email: "key@mail.com", Status: "member" },
          { uid: "", Name: "cat", Email: "key1@mail.com", Status: "guest" },
          { uid: "", Name: "fish", Email: "key2@mail.com", Status: "member" },
          { uid: "", Name: "sausage", Email: "key3@mail.com", Status: "admin" }
        ]}
      />
    )

    const input = getByTestId("search-input")
    const roleFilterButton = getByText("all")

    fireEvent.change(input, { target: { value: "key" } })

    fireEvent.click(roleFilterButton) // admin
    await waitFor(() => {
      expect(queryByText("John")).toBeVisible()
      expect(queryByText("sausage")).toBeVisible()
      expect(queryByText("Dog")).toBeNull()
      expect(queryByText("cat")).toBeNull()
      expect(queryByText("fish")).toBeNull()
    })

    fireEvent.click(roleFilterButton) // member
    await waitFor(() => {
      expect(queryByText("John")).toBeNull()
      expect(queryByText("sausage")).toBeNull()
      expect(queryByText("Dog")).toBeVisible()
      expect(queryByText("cat")).toBeNull()
      expect(queryByText("fish")).toBeVisible()
    })

    fireEvent.click(roleFilterButton) // guest
    await waitFor(() => {
      expect(queryByText("John")).toBeNull()
      expect(queryByText("sausage")).toBeNull()
      expect(queryByText("Dog")).toBeNull()
      expect(queryByText("cat")).toBeVisible()
      expect(queryByText("fish")).toBeNull()
    })
  })
})
