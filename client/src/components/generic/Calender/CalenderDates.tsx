type dateVariants = "default" | "selected" | "booked" | "other-month"

interface IDateProps {
  children: string
  variant: dateVariants
}

type props = IDateProps & React.ButtonHTMLAttributes<HTMLButtonElement>

const CalenderDates = ({ children }: props) => {
  return (
    <div className="bg-dark-blue-100 h-[38px] max-w-[42px] rounded flex items-center justify-center"> 
      <h4 className="text-white">{children}</h4>
    </div>
  )
}

export default CalenderDates
