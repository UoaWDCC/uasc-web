import TextInput from "../TextInputComponent/TextInput"
interface IDateRangePicker {
  valueStart: Date
  valueEnd: Date
  handleDateRangeInputChange: (start?: Date, end?: Date) => void
}

const formatDateForInput = (date?: Date) => {
  return date?.toLocaleDateString("en-CA", { timeZone: "Pacific/Auckland" })
}

const DateRangePicker = ({
  valueStart,
  valueEnd,
  handleDateRangeInputChange
}: IDateRangePicker) => (
  <>
    <TextInput
      label="From"
      type="date"
      value={formatDateForInput(valueStart)}
      data-testid="start-date-picker"
      onChange={(e) => {
        const newStartDate = e.target.valueAsDate || new Date()
        handleDateRangeInputChange(newStartDate, undefined)
      }}
    />
    <span className="mt-5 w-6">
      <LongRightArrow />
    </span>
    <TextInput
      label="To"
      type="date"
      data-testid="end-date-picker"
      value={formatDateForInput(valueEnd)}
      onChange={(e) => {
        const newEndDate = e.target.valueAsDate || new Date()
        if (checkValidRange(currentStartDate, newEndDate))
          handleDateRangeInputChange(
            currentStartDate,
            newEndDate,
            setSelectedDateRange
          )
      }}
    />
  </>
)
