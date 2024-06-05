import { Timestamp } from "firebase/firestore"
import { createContext, useState } from "react"

interface IDateSelectionContext {
  selectedDates: {
    startDate?: Timestamp
    endDate?: Timestamp
  }
  isUpdating: boolean
  handleSelectedDateChange?: (startDate?: Date, endDate?: Date) => void
  setIsUpdating?: (isUpdating: boolean) => void
}

export const DateSelectionContext = createContext<IDateSelectionContext>({
  selectedDates: {},
  isUpdating: false
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
        setIsUpdating
      }}
    >
      {children}
    </DateSelectionContext.Provider>
  )
}
