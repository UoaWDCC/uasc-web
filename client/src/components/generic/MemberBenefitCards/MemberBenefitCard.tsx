type cardVariants = "default"

interface ICardProps {
  children?: React.ReactNode
  variant?: cardVariants
}

type props = ICardProps & React.HTMLAttributes<HTMLElement>

const BenefitCard = ({ children, ...props }: props) => {
  return (
    <div className="flex max-w-sm overflow-hidden shadow-lg">
      <span className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{children}</div>
      </span>
      <span>
        <img className="w-full" src="./Ticket" alt="wwwww"></img>
      </span>
    </div>
  )
}

const Card = ({ children, variant, ...props }: props) => {
  switch (variant) {
    case "default":
      return <BenefitCard {...props}>{children}</BenefitCard>
  }
  return <BenefitCard {...props}>{children}</BenefitCard>
}

export default Card
