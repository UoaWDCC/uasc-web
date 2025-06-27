import Image, { type StaticImageData } from "next/image"
type ImageSideVariants = "left" | "right"

interface IAboutSectionProps {
  /**
   * The text that describes the name of the about section
   * @example "Our Purpose: Snowboarding and Skiing"
   */
  title: string
  /**
   * The smaller text giving more detail about the section
   * @example "lorem ipsum"
   */
  text: string
  /**
   * "left" or "right" based on the side the image is on
   */
  variant: ImageSideVariants
  /**
   * The image url, or `StaticImageData` originating from importing the image
   */
  imageSrc: string | StaticImageData
}

const DEFAULT_ABOUT_IMAGE_RES = 1000 as const

type Props = IAboutSectionProps

const TextStyler = ({ title, text }: Omit<Props, "variant" | "imageSrc">) => {
  return (
    <>
      <h2 className="font-weight-bold text-dark-blue-100 italic">{title}</h2>
      <p className=" text-h4 text-black">{text}</p>
    </>
  )
}

const AboutSection = ({ title, text, imageSrc, variant = "left" }: Props) => {
  return (
    <div className="relative grid h-fit w-full grid-cols-1 md:grid-cols-2 md:gap-5">
      <span className="home-page-gradient" />
      <Image
        src={imageSrc}
        width={DEFAULT_ABOUT_IMAGE_RES}
        height={DEFAULT_ABOUT_IMAGE_RES}
        alt="about page image"
        className={`relative ${variant === "right" ? "-order-1" : "md:order-1"} 
                    h-full rounded-t-md object-cover md:rounded-b-md`}
      />
      <div
        className="border-gray-3 flex w-full flex-col gap-10 rounded-b-md border
                        bg-white p-8 md:rounded-t-md"
      >
        <TextStyler title={title} text={text} />
      </div>
    </div>
  )
}

export default AboutSection
