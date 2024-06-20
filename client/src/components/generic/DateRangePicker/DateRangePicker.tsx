interface IDateRangePicker {
  valueStart: Date
  valueEnd: Date
  handleDateRangeInputChange: (start?: Date, end?: Date) => void
}
const DateRangePicker = () => (
  <>
    <TextInput
      label="From"
      type="date"
      value={formatDateForInput(selectedDateRange.startDate)}
      data-testid="start-date-picker"
      onChange={(e) => {
        const newStartDate = e.target.valueAsDate || new Date()
        handleDateRangeInputChange: start
      }}
    />
    <span className="mt-5 w-6">
      <LongRightArrow />
    </span>
    <TextInput
      label="To"
      type="date"
      data-testid="end-date-picker"
      value={formatDateForInput(selectedDateRange.endDate)}
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
