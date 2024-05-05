type dateVariants = "default" | "selected" | "booked" | "other-month"

interface IDateProps {
  children: string
  variant: dateVariants
}

type props = IDateProps & React.ButtonHTMLAttributes<HTMLButtonElement>

const CalenderDates = ({ children }: props) => {
  return <div>{children}</div>
}

export default CalenderDates
