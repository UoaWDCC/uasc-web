type ImageSideVariants = "left" | "right"

interface IAboutSectionProps {
  title: string
  text: string
  variant: ImageSideVariants
  imageSrc: string
}

type Props = IAboutSectionProps
const TextStyler = ({ title, text }: Omit<Props, "variant" | "imageSrc">) => {
  return (
    <div className="flex-col items-center">
      <h4 className="lg:text-h2 md:text-h4 text-dark-blue-100 ml-2 mr-2 mt-1 text-center font-bold italic md:ml-2 md:mr-2 md:mt-1 md:text-left md:font-bold lg:ml-8 lg:mr-8 lg:mt-4 lg:text-left">
        {title}
      </h4>
      <p className=" text-dark-blue-100 lg:text-p mb-2 ml-2 mr-2 mt-1 items-center md:ml-2 md:mr-2 md:mt-1 lg:mb-8 lg:ml-8 lg:mr-8">
        {text}
      </p>
    </div>
  )
}

const AboutSection = ({ title, text, imageSrc, variant }: Props) => {
  if (variant === "left") {
    return (
      <div className="grid-col grid w-full gap-4 md:grid-cols-2 lg:grid-cols-2">
        <img
          src={imageSrc}
          className="object-fit: cover relative w-full rounded-t-lg"
        ></img>
        <div className=" border-dark-blue-100 w-full rounded-b-lg border bg-white md:rounded-lg lg:rounded-t-lg">
          <TextStyler title={title} text={text} />
        </div>
      </div>
    )
  } else {
    return (
      <div className="grid-col grid w-full gap-4 md:grid-cols-2 lg:grid-cols-2">
        <div className=" border-dark-blue-100 w-full rounded-b-lg border bg-white sm:rounded-t-none md:rounded-lg lg:rounded-t-lg ">
          <TextStyler title={title} text={text} />
        </div>
        <img src={imageSrc} className=" flex w-full rounded-t-lg "></img>
      </div>
    )
  }
}

export default AboutSection
