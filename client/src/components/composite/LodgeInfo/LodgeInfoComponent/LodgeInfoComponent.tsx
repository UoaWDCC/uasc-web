import Button from "@/components/generic/FigmaButtons/FigmaButton"
import type { ReactNode } from "react"

interface ILodgeInfoComponent {
  /**
   * The **pre-rendered** children that should be displayed in the the container
   * (This should generally be text content)
   */
  children: ReactNode
  /**
   * Handler to be called when call to action button is clicked
   *
   * @example
   * () => navigateToActualBookLodgeScreen()
   */
  handleBookLodgeClick: () => void
}

/**
 * @deprecated do not consume directly on page, use `LodgeInfo` instead
 */
const LodgeInfoComponent = ({
  children,
  handleBookLodgeClick
}: ILodgeInfoComponent) => {
  return (
    <div className="border-gray-3 flex h-full w-full flex-col justify-center rounded border bg-white px-2 py-12 pb-8 sm:px-3">
      <div className="text-dark-blue-100 mb-3 flex flex-col gap-4 lg:justify-center">
        {children}
      </div>
      <Button variant="inverted-default-sm" onClick={handleBookLodgeClick}>
        Book the lodge
      </Button>
    </div>
  )
}

export default LodgeInfoComponent
