import { act, render, screen } from "@testing-library/react"
import { useState } from "react"
import Stepper, { type StepProps } from "./StepperComponent"

test("Calls the correct function when clicking on element", async () => {
  const fakeFunction = jest.fn()
  const secondFakeFunction = jest.fn()
  const thirdFakeFunction = jest.fn()
  const TestStepper = () => {
    const [currentStep, setCurrentStep] = useState<number>(0)
    const steps: StepProps[] = [
      {
        name: "first",
        index: 0,
        onClick: () => fakeFunction()
      },
      {
        name: "second",
        index: 1,
        onClick: () => secondFakeFunction()
      },
      {
        name: "third",
        index: 2,
        onClick: () => thirdFakeFunction()
      }
    ]

    return (
      <>
        <Stepper currentStep={currentStep} steps={steps} />
        <h1>Current Step: {currentStep}</h1>
        <span className="flex gap-3">
          <button type="button" onClick={() => setCurrentStep(currentStep - 1)}>
            back
          </button>
          <button type="button" onClick={() => setCurrentStep(currentStep + 1)}>
            next
          </button>
        </span>
      </>
    )
  }

  render(<TestStepper />)
  const firstButton = screen.getByTestId("first")

  await act(async () => {
    await firstButton.click()
  })

  expect(fakeFunction).toHaveBeenCalledTimes(1)

  const disabledButton = screen.getByTestId("second")

  await act(async () => {
    await disabledButton.click()
  })

  expect(secondFakeFunction).not.toHaveBeenCalled()

  const normalButton = screen.getByTestId("third")
  await act(async () => {
    await normalButton.click()
  })

  expect(thirdFakeFunction).not.toHaveBeenCalled()
})
