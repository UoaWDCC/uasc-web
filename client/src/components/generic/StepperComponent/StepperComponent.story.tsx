import { useState } from "react"
import type { Meta } from "@storybook/react"
// importing button.tsx as the object
import Stepper, { type StepProps } from "./StepperComponent"

const meta: Meta<typeof Stepper> = {
  component: Stepper
}

export default meta

// type Story = StoryObj<typeof meta>

export const DefaultStepper = () => {
  const [currentStep, setCurrentStep] = useState<number>(0)

  const steps: StepProps[] = [
    {
      name: "first",
      index: 0,
      onClick: () => setCurrentStep(0)
    },
    {
      name: "second",
      index: 1,
      onClick: () => setCurrentStep(1)
    },
    {
      name: "third",
      index: 2,
      onClick: () => setCurrentStep(2)
    }
  ]

  return (
    <>
      <Stepper currentStep={currentStep} steps={steps} />
      <h1>Current Step: {currentStep}</h1>
      <span className="flex gap-3">
        <button onClick={() => setCurrentStep(currentStep - 1)}>back</button>
        <button onClick={() => setCurrentStep(currentStep + 1)}>next</button>
      </span>
    </>
  )
}

export const DefaultStepperWithLongTexts = () => {
  const [currentStep, setCurrentStep] = useState<number>(0)

  const steps: StepProps[] = [
    {
      name: "first button long text",
      index: 0,
      onClick: () => setCurrentStep(0)
    },
    {
      name: "second button long text",
      index: 1,
      onClick: () => setCurrentStep(1)
    },
    {
      name: "third button long text",
      index: 2,
      onClick: () => setCurrentStep(2)
    }
  ]

  return (
    <>
      <Stepper currentStep={currentStep} steps={steps} />
      <h1>Current Step: {currentStep}</h1>
      <span className="flex gap-3">
        <button onClick={() => setCurrentStep(currentStep - 1)}>back</button>
        <button onClick={() => setCurrentStep(currentStep + 1)}>next</button>
      </span>
    </>
  )
}

export const DefaultStepperWithDifferentTextsLength = () => {
  const [currentStep, setCurrentStep] = useState<number>(0)

  const steps: StepProps[] = [
    {
      name: "ABCDEF",
      index: 0,
      onClick: () => setCurrentStep(0)
    },
    {
      name: "ABCDEFGH",
      index: 1,
      onClick: () => setCurrentStep(1)
    },
    {
      name: "ABCDEFGHIJK",
      index: 2,
      onClick: () => setCurrentStep(2)
    }
  ]

  return (
    <>
      <Stepper currentStep={currentStep} steps={steps} />
      <h1>Current Step: {currentStep}</h1>
      <span className="flex gap-3">
        <button onClick={() => setCurrentStep(currentStep - 1)}>back</button>
        <button onClick={() => setCurrentStep(currentStep + 1)}>next</button>
      </span>
    </>
  )
}
