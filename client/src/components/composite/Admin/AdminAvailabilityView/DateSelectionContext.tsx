import { createContext, useState } from "react"
import { DEFAULT_BOOKING_AVAILABILITY } from "utils/Constants"

interface IDateSelectionContext {
  /**
   * Should **both** be defined for meaningful usage (shows a valid range has been selected)
   */
  selectedDates: {
    startDate?: Date
    endDate?: Date
  }
  isUpdating: boolean
  handleSelectedDateChange?: (startDate?: Date, endDate?: Date) => void
  setIsUpdating?: (isUpdating: boolean) => void
  /**
   * The number of slots to set the max availability to for the selected range
   */
  slotQty: number
  /**
   * Setter function for slotQty
   */
  setSlotQty?: (newSlots: number) => void
}

export const DateSelectionContext = createContext<IDateSelectionContext>({
  selectedDates: {},
  isUpdating: false,
  slotQty: DEFAULT_BOOKING_AVAILABILITY
})

export const DateSelectionProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [selectedDates, setSelectedDates] = useState<{
    startDate?: Date
    endDate?: Date
  }>({})

  const [slotQty, setSlotQty] = useState<number>(DEFAULT_BOOKING_AVAILABILITY)

  const [isUpdating, setIsUpdating] = useState<boolean>(false)

  const handleDateChange = (newStartDate?: Date, newEndDate?: Date) => {
    setSelectedDates({
      startDate: newStartDate,
      endDate: newEndDate
    })
  }

  return (
    <DateSelectionContext.Provider
      value={{
        selectedDates,
        handleSelectedDateChange: handleDateChange,
        isUpdating,
        setIsUpdating,
        slotQty,
        setSlotQty
      }}
    >
      {children}
    </DateSelectionContext.Provider>
  )
}
