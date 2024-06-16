import { Timestamp } from "firebase/firestore"
import { createContext, useState } from "react"

interface IAdminBookingViewContext {
  /**
   * Should **both** be defined for meaningful usage (shows a valid range has been selected)
   */
  selectedDates: {
    startDate: Timestamp
    endDate: Timestamp
  }
  isUpdating: boolean
  setIsUpdating?: (updating: boolean) => void
  handleSelectedDateChange?: (startDate?: Date, endDate?: Date) => void
}

const DEFAULT_DATES = {

    startDate: Timestamp.fromDate(new Date()),
    endDate: Timestamp.fromDate(new Date())
}

export const AdminBookingViewContext = createContext<IAdminBookingViewContext>({
  selectedDates: DEFAULT_DATES,
  isUpdating: false
})

export const DateSelectionProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [selectedDates, setSelectedDates] = useState<{
    startDate: Timestamp
    endDate: Timestamp
  }>(DEFAULT_DATES)

  const [isUpdating, setIsUpdating] = useState<boolean>(false)

  const handleDateChange = (newStartDate: Date, newEndDate: Date) => {
    setSelectedDates({
      startDate:  Timestamp.fromDate(new Date(newStartDate.toDateString())),
      endDate:  Timestamp.fromDate(new Date(newEndDate.toDateString()))
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
