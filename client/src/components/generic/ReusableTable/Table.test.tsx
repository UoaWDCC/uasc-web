import { fireEvent, render, waitFor } from "@testing-library/react"
import Table, { OperationButton } from "./Table"
import { TABLE_ROW_IDENTIFIER_KEY } from "./TableUtils"

describe("Table", () => {
  it("Should not render the identifier", async () => {
    const { queryByText } = render(
      <Table
        data={[
          {
            [TABLE_ROW_IDENTIFIER_KEY]: "dont render",
            test: "nothing",
            test1: "something"
          }
        ]}
      />
    )
    await waitFor(() => {
      expect(queryByText("dont render")).toBeNull()
      expect(queryByText("nothing")).toBeVisible()
      expect(queryByText("something")).toBeVisible()
    })
  })
})

describe("OperationButton", () => {
  const mockHandler = jest.fn()
  const rowOperations = [
    { name: "Operation 1", handler: mockHandler },
    { name: "Operation 2", handler: mockHandler }
  ]

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("renders without crashing", () => {
    const { getByTestId } = render(
      <OperationButton
        operationType="multiple-operations"
        uid="test"
        rowOperations={rowOperations}
      />
    )
    expect(getByTestId("multiple-operation-button")).toBeInTheDocument()
  })

  it("calls the correct handler when an operation is clicked", () => {
    const { getByTestId } = render(
      <OperationButton
        operationType="multiple-operations"
        uid="test"
        rowOperations={rowOperations}
      />
    )
    const button = getByTestId("multiple-operation-button")
    fireEvent.click(button)
    const option = getByTestId("multiple-operation-item-1")
    fireEvent.click(option)
    expect(mockHandler).toHaveBeenCalledWith("test")
  })

  it("calls the correct handler when the single operation button is clicked", () => {
    const { getByTestId } = render(
      <OperationButton
        operationType="single-operation"
        uid="single"
        rowOperations={rowOperations}
      />
    )
    const button = getByTestId("single-operation-button")
    fireEvent.click(button)
    expect(mockHandler).toHaveBeenCalledWith("single")
  })
})
