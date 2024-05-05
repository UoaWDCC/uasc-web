type dateVariants = "default" | "selected" | "booked" | "other-month"

interface IDateProps {
  children: string
  variant: dateVariants
}

type props = IDateProps & React.ButtonHTMLAttributes<HTMLButtonElement>

const Default = ({ children }: props) => {
  return (
    <div className="bg-dark-blue-100 flex h-[38px] max-w-[42px] items-center justify-center rounded">
      <h4 className="text-white">{children}</h4>
    </div>
  )
}

const Booked = ({ children }: props) => {
  return (
    <div className="bg-gray-3 flex h-[38px] max-w-[42px] items-center justify-center rounded">
      <h4 className="text-white">{children}</h4>
    </div>
  )
}

const Selected = ({ children }: props) => {
  return (
    <div className="flex h-[38px] max-w-[42px] items-center justify-center rounded bg-white">
      <h4 className="text-dark-blue-100">{children}</h4>
    </div>
  )
}

const OtherMonth = ({ children }: props) => {
  return (
    <div className="flex h-[38px] max-w-[42px] items-center justify-center rounded bg-white">
      <h4 className="text-gray-2">{children}</h4>
    </div>
  )
}

const CalenderDates = ({ children, variant }: props) => {
  switch (variant) {
    case "default":
      return <Default variant="default">{children}</Default>
  }
  switch (variant) {
    case "booked":
      return <Booked variant="booked">{children}</Booked>
  }
  switch (variant) {
    case "selected":
      return <Selected variant="selected">{children}</Selected>
  }
  switch (variant) {
    case "other-month":
      return <OtherMonth variant="other-month">{children}</OtherMonth>
  }
}

export default CalenderDates
