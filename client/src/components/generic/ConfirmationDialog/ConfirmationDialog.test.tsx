import ConfirmationDialog from "./ConfirmationDialog"
import { render, act, screen } from "@testing-library/react"

test("Calls the correct function upon clicking on the buttons", async () => {
  const leftFakeFunction = jest.fn()
  const rightFakeFunction = jest.fn()

  render(
    <ConfirmationDialog
      title="test title"
      text="test default text"
      leftButtonText="left text"
      rightButtonText="right text"
      onClickLeft={() => leftFakeFunction()}
      onClickRight={() => rightFakeFunction()}
    />
  )
  const testLeft = screen.getByTestId("dialog-left")
  expect(testLeft).toBeVisible()

  await act(async () => {
    await testLeft.click()
  })

  expect(leftFakeFunction).toHaveBeenCalledTimes(1)

  const testRight = screen.getByTestId("dialog-right")

  await act(async () => {
    await testRight.click()
  })

  expect(rightFakeFunction).toHaveBeenCalledTimes(1)
})
