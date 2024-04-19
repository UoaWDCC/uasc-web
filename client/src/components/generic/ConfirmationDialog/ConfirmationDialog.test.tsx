import ConfirmationDialog from "./ConfirmationDialog"
import { render, act, screen } from "@testing-library/react"

test("Calls the correct function upon clicking on the buttons", async () => {
  const leftFakeFunction = jest.fn()
  const rightFakeFunction = jest.fn()

  render(<ConfirmationDialog title="w" text="w" left="" right="" onClickLeft={leftFakeFunction} onClickRight={rightFakeFunction} />)
  const testLeft = screen.getByTestId("dialog-left")

  await act(async () => {
    await testLeft.click()
  })

  expect(leftFakeFunction).toHaveBeenCalledTimes(1)

  const testRight = screen.getByTestId("dialog-left")

  await act(async () => {
    await testRight.click()
  })

  expect(rightFakeFunction).toHaveBeenCalledTimes(1)
})
