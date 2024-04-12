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
        <div className="flex flex-col items-start gap-1 text-left sm:w-full">
          <h2 className="text-dark-blue-100 italic">{title}</h2>
          {children}
        </div>
        <span className="mt-8 flex justify-between gap-1 sm:w-full">
          <Button
            disabled={onBack === undefined || backDisabled}
            variant="progress-inverted"
            onClick={() => {
              onBack?.()
            }}
          >
            {backButtonText || "Back"}
          </Button>
          <Button
            variant="progress-default"
            disabled={onNext === undefined || nextDisabled}
            onClick={() => {
              onNext?.()
            }}
          >
            {nextButtonText || "Next"}
          </Button>
        </span>
      </FormContainer>
    </>
  )
}
export default PaginatedForm
