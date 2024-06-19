import { createContext, useState } from "react"

interface IAdminBookingViewContext {
  /**
   * Should **both** be defined for meaningful usage (shows a valid range has been selected)
   */
  selectedDates: {
    startDate: Date
    endDate: Date
  }
  isUpdating: boolean
  setIsUpdating?: (updating: boolean) => void
  /**
   * Should be called when a UI event changes the range of dates
   * the admin wants to look through on the admin booking view
   *
   * @param startDate the first (inclusive) date in the range
   * @param endDate the last (inclusive) date in the range
   */
  handleSelectedDateChange?: (startDate: Date, endDate: Date) => void
}

const DEFAULT_DATES = {
  startDate: new Date(),
  endDate: new Date()
}

/**
 * For use with components related to `AdminBookingView`
 */
export const AdminBookingViewContext = createContext<IAdminBookingViewContext>({
  selectedDates: DEFAULT_DATES,
  isUpdating: false
})

export const AdminBookingViewProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [selectedDates, setSelectedDates] = useState<{
    startDate: Date
    endDate: Date
  }>(DEFAULT_DATES)

  const [isUpdating, setIsUpdating] = useState<boolean>(false)

  const handleDateChange = (newStartDate: Date, newEndDate: Date) => {
    setSelectedDates({
      startDate: newStartDate,
      endDate: newEndDate
    })
  }

  return (
    <AdminBookingViewContext.Provider
      value={{
        selectedDates,
        handleSelectedDateChange: handleDateChange,
        isUpdating,
        setIsUpdating
      }}
    >
      {children}
    </AdminBookingViewContext.Provider>
  )
}
