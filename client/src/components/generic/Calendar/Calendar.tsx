import { useState } from "react"
import ReactCalendar, { CalendarProps } from "react-calendar"
import "./Calendar.css"

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

const Calendar = ({ ...props }: CalendarProps) => {
  const [date, setDate] = useState<Value>(null)

  return (
    <div>
      <ReactCalendar
        onChange={setDate}
        value={date}
        className="react-calendar"
        {...props}
      />
    </div>
  )
}

export default Calendar
