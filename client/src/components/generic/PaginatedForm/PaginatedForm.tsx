import { ReactNode } from "react"
import FormContainer from "./FormContainer/FormContainer"
import Button from "../FigmaButtons/FigmaButton"

export type PageProps = {
  title: string
  index: number
  backButtonText?: string
  nextButtonText?: string
  nextDisabled?: boolean
  backDisabled?: boolean
  onNext?: () => void
  onBack?: () => void
}

interface IPaginatedFormProps {
  children: ReactNode
  currentPageIndex: number
  pages?: PageProps[]
}
const PaginatedForm = ({
  children,
  currentPageIndex,
  pages = []
}: IPaginatedFormProps) => {
  const {
    onBack,
    onNext,
    title,
    backButtonText,
    nextButtonText,
    backDisabled,
    nextDisabled
  } = pages[currentPageIndex]
  return (
    <>
      <FormContainer>
        <div className="flex h-fit min-h-[70vh] w-full flex-col items-start gap-1 text-left">
          <h2 className="text-dark-blue-100 my-9 italic">{title}</h2>
          <div className="relative flex h-full w-full flex-col">{children}</div>
          <span className="mt-auto flex justify-between gap-1 pb-4 sm:w-full">
            <Button
              disabled={onBack === undefined || backDisabled}
              variant="progress-inverted"
              data-testid="back-button"
              onClick={() => {
                onBack?.()
              }}
            >
              {backButtonText || "Back"}
            </Button>
            <Button
              variant="progress-default"
              disabled={onNext === undefined || nextDisabled}
              data-testid="next-button"
              onClick={() => {
                onNext?.()
              }}
            >
              {nextButtonText || "Next"}
            </Button>
          </span>
        </div>
      </FormContainer>
    </>
  )
}
export default PaginatedForm
