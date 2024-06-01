import { render, waitFor } from "@testing-library/react"
import Table from "./Table"
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
