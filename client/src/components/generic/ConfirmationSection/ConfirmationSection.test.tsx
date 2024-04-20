import ConfirmationSection from "./ConfirmationSection"
import { render, act, screen } from "@testing-library/react"

test("Calls the correct function when the 2 buttons are clicked", async () => {
  const leftFakeFunction = jest.fn()
  const rightFakeFunction = jest.fn()

  render(
    <ConfirmationSection
      mainHeader="test header"
      subHeader="test sub header"
      textTop="game is game."
      textBottom="real"
      buttonTextLeft="test button 1"
      buttonTextRight="test button 2"
      onClickLeft={() => leftFakeFunction()}
      onClickRight={() => rightFakeFunction()}
    />
  )

  const leftButtonTest = screen.getByTestId("leftButton")
  expect(leftButtonTest).toBeVisible()
  await act(async () => {
    await leftButtonTest.click()
  })

  expect(leftFakeFunction).toHaveBeenCalledTimes(1)

  const rightButtonTest = screen.getByTestId("rightButton")
  expect(rightButtonTest).toBeVisible()
  await act(async () => {
    await rightButtonTest.click()
  })
  expect(rightFakeFunction).toHaveBeenCalledTimes(1)
})
