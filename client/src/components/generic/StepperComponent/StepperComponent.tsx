import StepperButton from "../StepperButtons/StepperButton"

export type StepProps = {
  /**
   * The display name of the step
   *
   * @example "Confirm"
   */
  name: string
  /**
   * The current value from a set of `enum`s that determines which step should
   * be highlighted on the stepper
   */
  index: number
  /**
   * Handler for if a button is clicked
   */
  onClick?: () => void
}

interface IStepperProps {
  /**
   * An `enum` value that defines what step should be active
   */
  currentStep: number
  /**
   * @example steps={["Details", "Confirmation"]}
   */
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
