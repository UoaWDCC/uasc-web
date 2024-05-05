type dateVariants = "default" | "selected" | "booked" | "other-month"

interface IDateProps {
  children: string
  variant: dateVariants
}

type props = IDateProps & React.ButtonHTMLAttributes<HTMLButtonElement>

const CalenderDates = ({ children }: props) => {
  return (
    <div className="bg-dark-blue-100 max-h-[38px] max-w-[42px]">{children}</div>
  )
}

export default CalenderDates
