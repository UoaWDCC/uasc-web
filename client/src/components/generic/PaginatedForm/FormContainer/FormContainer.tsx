import { ReactNode } from "react"

interface IFormContainerProps {
  children: ReactNode
}
const FormContainer = ({ children }: IFormContainerProps) => {
  return (
    <div
      className="bg-gray-1 border-dark-blue-60 
      flex w-full max-w-3xl flex-col items-center rounded-t-md border py-16 sm:px-28 sm:py-8"
    >
      {children}
    </div>
  )
}

export default FormContainer
