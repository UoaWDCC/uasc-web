import { ReactNode } from "react"

interface IFormContainerProps {
  children: ReactNode
}
const FormContainer = ({ children }: IFormContainerProps) => {
  return (
    <div
      className="bg-gray-1 border-dark-blue-60 
       flex max-h-[90vh] w-full max-w-3xl flex-col
      items-center overflow-y-auto rounded-t-md
       border px-3 py-16 sm:px-28 sm:py-8 lg:max-h-[80vh]"
    >
      {children}
    </div>
  )
}

export default FormContainer
