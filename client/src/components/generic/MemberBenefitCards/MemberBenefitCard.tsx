import Image from "next/image"

type cardVariants = "default"

interface ICardProps {
  /**
   * The src of the icon
   */
  imageSrc?: string
  /**
   * What the card should say
   */
  text: string
  variant?: cardVariants
}

type props = ICardProps

const BenefitCard = ({ text, imageSrc }: props) => {
  return (
    <div
      className="border-light-blue-100 
      bg-gray-1 flex max-h-[200px] 
    w-full items-center justify-center rounded-md 
     border px-6 py-7"
    >
      <h3 className="text-light-blue-100 sm:text-h3 mb-2 w-[270px] text-lg font-bold">
        {text}
      </h3>
      <span className=" -ml-7 w-[138px] min-w-[138px] opacity-15">
        {imageSrc && (
          <Image
            width={1000}
            height={1000}
            src={imageSrc}
            alt={`corresponding image for ${text}`}
          />
        )}
      </span>
    </div>
  )
}

/**
 *
 * Usage: pass in the SVG imported using the `import Icon from 'path/icon.svg '` syntax
 *
 */
const Card = ({ imageSrc, text, variant }: props) => {
  switch (variant) {
    case "default":
      return <BenefitCard imageSrc={imageSrc} text={text} />
  }
  return <BenefitCard imageSrc={imageSrc} text={text} />
}

export default Card
