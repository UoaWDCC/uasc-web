import { render, fireEvent, waitFor } from "@testing-library/react"
import AdminSearchBar from "./AdminSearchBar"

describe("AdminSearchBar", () => {
  it("calls onQueryChanged with debounced value", async () => {
    const mockOnQueryChanged = jest.fn()
    const { getByTestId } = render(
      <AdminSearchBar onQueryChanged={mockOnQueryChanged} />
    )

    const input = getByTestId("search-input")
    fireEvent.change(input, { target: { value: "hello" } })

    await waitFor(() => {
      expect(mockOnQueryChanged).toHaveBeenCalledWith("hello")
    })
  })

  it("calls onQueryChanged with a lower case value", async () => {
    const mockOnQueryChanged = jest.fn()
    const { getByTestId } = render(
      <AdminSearchBar onQueryChanged={mockOnQueryChanged} />
    )

    const input = getByTestId("search-input")
    fireEvent.change(input, { target: { value: "HeLlO???" } })

    await waitFor(() => {
      expect(mockOnQueryChanged).toHaveBeenCalledWith("hello???")
    })
  })
})
