import TextInput from "../TextInputComponent/TextInput"
import LongRightArrow from "@/assets/icons/long_right_arrow.svg"

interface IDateRangePicker {
  /**
   * The date to be displayed on the first input, should be local time
   */
  valueStart: Date
  /**
   * The date to be displayed on the last input, should be local time
   */
  valueEnd: Date
  /**
   * Callback when user tries to change one of the inputs
   */
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
  <span className="mb-4 mt-3 flex items-center gap-1">
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
        handleDateRangeInputChange(undefined, newEndDate)
      }}
    />
  </span>
)

export default DateRangePicker
