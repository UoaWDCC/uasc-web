import { Timestamp } from "firebase/firestore"
import { createContext, useState } from "react"

interface IDateSelectionContext {
  selectedDates: {
    startDate?: Timestamp
    endDate?: Timestamp
  }
  handleSelectedDateChange?: (startDate?: Date, endDate?: Date) => void
}

export const DateSelectionContext = createContext<IDateSelectionContext>({
  selectedDates: {}
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
      value={{ selectedDates, handleSelectedDateChange: handleDateChange }}
    >
      {children}
    </DateSelectionContext.Provider>
  )
}
