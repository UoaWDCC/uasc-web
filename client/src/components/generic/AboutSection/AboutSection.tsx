import Image, { StaticImageData } from "next/image"
type ImageSideVariants = "left" | "right"

interface IAboutSectionProps {
  title: string
  text: string
  variant: ImageSideVariants
  imageSrc: string | StaticImageData
}

const DEFAULT_ABOUT_IMAGE_RES = 1000 as const

type Props = IAboutSectionProps

const TextStyler = ({ title, text }: Omit<Props, "variant" | "imageSrc">) => {
  return (
    <div className="grid-col grid w-full items-center overflow-hidden">
      <h4 className="lg:text-h2 md:text-h4 text-dark-blue-100 p-2 text-center font-bold italic md:p-2 md:text-left md:font-bold lg:p-4 lg:text-left">
        {title}
      </h4>
      <p className=" text-dark-blue-100 lg:text-h4 p-2 md:p-2 lg:p-3">{text}</p>
    </div>
  )
}

const AboutSection = ({ title, text, imageSrc, variant }: Props) => {
  if (variant === "left") {
    return (
      <div className="grid-col grid w-full md:grid-cols-2 md:gap-4 lg:grid-cols-2 lg:gap-4">
        <Image
          src={imageSrc}
          width={DEFAULT_ABOUT_IMAGE_RES}
          height={DEFAULT_ABOUT_IMAGE_RES}
          alt="about page image"
          className="object-fit: cover relative w-full rounded-t-lg"
        />
        <div className=" border-dark-blue-100 mt-auto w-full rounded-b-lg border bg-white md:rounded-lg  lg:rounded-t-lg">
          <TextStyler title={title} text={text} />
        </div>
      </div>
    )
  } else {
    return (
      <div className="grid-col grid w-full md:grid-cols-2 md:gap-4 lg:grid-cols-2 lg:gap-4">
        <>
          <div className="border-dark-blue-100 mt-auto hidden w-full rounded-b-lg border bg-white sm:rounded-t-none md:block md:rounded-lg lg:rounded-t-lg ">
            <TextStyler title={title} text={text} />
          </div>
          <Image
            src={imageSrc}
            width={DEFAULT_ABOUT_IMAGE_RES}
            height={DEFAULT_ABOUT_IMAGE_RES}
            alt="about page image"
            className="hidden w-full rounded-t-lg md:flex"
          />
        </>
        <>
          <Image
            src={imageSrc}
            width={DEFAULT_ABOUT_IMAGE_RES}
            height={DEFAULT_ABOUT_IMAGE_RES}
            alt="about page image"
            className="flex w-full rounded-t-lg md:hidden"
          />
          <div className="border-dark-blue-100 w-full rounded-b-lg border bg-white sm:rounded-t-none md:hidden md:rounded-lg lg:rounded-t-lg ">
            <TextStyler title={title} text={text} />
          </div>
        </>
      </div>
    )
  }
}

export default AboutSection
