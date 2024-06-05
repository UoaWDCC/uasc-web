import { Timestamp } from "firebase/firestore"
import { createContext, useState } from "react"
import { DEFAULT_BOOKING_AVAILABILITY } from "services/Admin/AdminService"

interface IDateSelectionContext {
  /**
   * Should **both** be defined for meaningful usage (shows a valid range has been selected)
   */
  selectedDates: {
    startDate?: Timestamp
    endDate?: Timestamp
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
    startDate?: Timestamp
    endDate?: Timestamp
  }>({})

  const [slotQty, setSlotQty] = useState<number>(DEFAULT_BOOKING_AVAILABILITY)

  const [isUpdating, setIsUpdating] = useState<boolean>(false)

  const handleDateChange = (newStartDate?: Date, newEndDate?: Date) => {
    setSelectedDates({
      startDate: newStartDate
        ? Timestamp.fromDate(new Date(newStartDate.toDateString()))
        : undefined,
      endDate: newEndDate
        ? Timestamp.fromDate(new Date(newEndDate.toDateString()))
        : undefined
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
