import { render, screen } from "@testing-library/react"
import Tab from "./Tab"

describe("tab component", () => {
  it("should be able to be clicked", async () => {
    const testFn = jest.fn()
    render(<Tab onClick={() => testFn()}>test</Tab>)

    const button = await screen.findByText("test")
    await button.click()

    expect(testFn).toHaveBeenCalledTimes(1)
  })

  it("should not be able to be clicked when disabled", async () => {
    const testFn = jest.fn()
    render(
      <Tab onClick={() => testFn()} disabled>
        test
      </Tab>
    )

    const button = await screen.findByText("test")
    await button.click()

    expect(testFn).not.toHaveBeenCalled()
  })
})
