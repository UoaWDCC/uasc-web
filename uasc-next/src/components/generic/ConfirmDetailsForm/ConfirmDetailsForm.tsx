import { ReactNode } from "react"

interface IFormContainerProps {
  children: ReactNode
}

const ConfirmDetailsForm = ({ children }: IFormContainerProps) => {
  return (
    <div className="flex-shrink: 0; h-full w-full overflow-y-auto rounded-md border border-gray-400 bg-white pl-6">
      {children}
    </div>
  )
}

export default ConfirmDetailsForm
