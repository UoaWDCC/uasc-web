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
    <div className="group relative overflow-hidden rounded-md shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="relative h-64 w-full">
        <Image
          src={imageSrc || ""}
          alt={`corresponding image for ${text}`}
          fill
          className="rounded-md object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 w-full p-4">
          <span className="bg-light-blue-100 block rounded-sm bg-opacity-95 px-4 py-3 text-lg font-bold text-white">
            {text}
          </span>
        </div>
      </div>
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
