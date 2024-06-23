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
    <>
      <h4 className="lg:text-h2 md:text-h4 text-dark-blue-100 ml-2 mr-2 mt-1 text-center font-bold italic md:ml-2 md:mr-2 md:mt-1 md:text-left md:font-bold lg:ml-8 lg:mr-8 lg:mt-4 lg:text-left">
        {title}
      </h4>
      <p className=" text-dark-blue-100 lg:text-p mb-2 ml-2 mr-2 mt-1 md:ml-2 md:mr-2 md:mt-1 lg:mb-8 lg:ml-8 lg:mr-8">
        {text}
      </p>
    </>
  )
}

const AboutSection = ({ title, text, imageSrc, variant }: Props) => {
  if (variant === "left") {
    return (
      <div className="w-full">
        <img
          src={imageSrc}
          className="object-fit: cover relative w-full rounded-t-lg md:h-[500px] md:w-[900px]"
        ></img>
        <div className=" border-dark-blue-100 flex w-full flex-col rounded-b-lg border bg-white md:ml-auto md:w-[50%] md:rounded-lg lg:ml-[40%] lg:w-[530px] lg:rounded-t-lg">
          <TextStyler title={title} text={text} />
        </div>
      </div>
    )
  } else {
    return (
      <div className="w-full">
        <img
          src={imageSrc}
          className="ml-auto flex w-full rounded-t-lg md:h-[500px] md:w-[900px]"
        ></img>
        <div className=" border-dark-blue-100 flex w-full flex-col rounded-b-lg border bg-white sm:rounded-t-none md:w-[50%] md:rounded-lg lg:ml-[25%] lg:w-[670px] lg:rounded-t-lg ">
          <TextStyler title={title} text={text} />
        </div>
      </div>
    )
  }
}

export default AboutSection
