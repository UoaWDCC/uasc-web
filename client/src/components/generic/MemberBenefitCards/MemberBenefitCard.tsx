import { SvgImport } from "components/utils/types"
import ticket from "./Ticket.png"
type cardVariants = "default"

interface ICardProps {
  svgIcon: SvgImport
  children?: React.ReactNode
  variant?: cardVariants
}

type props = ICardProps & React.HTMLAttributes<HTMLElement>

const BenefitCard = ({ children }: props) => {
  return (
    <div className="flex max-w-sm shadow-lg">
      <span className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{children}</div>
      </span>
      <span>
        <img className="w-full" src={ticket} alt="image of a ticket"></img>
      </span>
    </div>
  )
}

const Card = ({ svgIcon, children, variant, ...props }: props) => {
  switch (variant) {
    case "default":
      return (
        <BenefitCard svgIcon={svgIcon} {...props}>
          {children}
        </BenefitCard>
      )
  }
  return (
    <BenefitCard svgIcon={svgIcon} {...props}>
      {children}
    </BenefitCard>
  )
}

export default Card
