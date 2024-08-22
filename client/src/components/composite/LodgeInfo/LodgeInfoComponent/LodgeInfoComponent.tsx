import Button from "@/components/generic/FigmaButtons/FigmaButton"
import { ReactNode } from "react"

interface ILodgeInfoComponent {
  children: ReactNode
  handleBookLodgeClick: () => void
}

const LodgeInfoComponent = ({
  children,
  handleBookLodgeClick
}: ILodgeInfoComponent) => {
  return (
    <div className="border-gray-3 flex h-full w-full flex-col justify-center rounded border bg-white px-2 py-12 pb-8 sm:px-6">
      <div className="text-dark-blue-100 flex flex-col gap-4 lg:justify-center">
        {children}

        <div className="flex justify-center pt-3">
          <Button variant="default-sm" onClick={handleBookLodgeClick}>
            Book The Lodge
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LodgeInfoComponent
