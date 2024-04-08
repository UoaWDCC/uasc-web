type cardVariants =
  | "default"

interface ICardProps {
  children?: React.ReactNode
  variant?: cardVariants
}

type props = ICardProps & React.HTMLAttributes<HTMLElement>

const BenefitCard = ({ children, ...props }: props) => {
  return (
    <div
      className="border flex
    
    ">
      {children}
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