import StepperButton from "../StepperButtons/StepperButton"

export type StepProps = {
  name: string
  index: number
  onClick?: () => void
}

interface IStepperProps {
  currentStep: number
  steps: StepProps[]
}

/**
 *  steps={["Details", "Confirmation"]}
 */
const Stepper = ({ steps, currentStep }: IStepperProps) => {
  return (
    <span className="flex w-full justify-center">
      {steps.map((step) => {
        const { name, index, onClick } = step
        return (
          <span key={index} className="-ml-[16px] min-w-[153px]">
            <StepperButton
              variant={index === 0 ? "first" : "normal"}
              data-testid={name}
              disabled={currentStep < index}
              onClick={onClick}
            >
              {name}
            </StepperButton>
          </span>
        )
      })}
    </span>
  )
}

export default Stepper
