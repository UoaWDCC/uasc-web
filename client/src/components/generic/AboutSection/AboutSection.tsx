type ImageSideVariants = "left" | "right"

interface IAboutProps {
  title: string
  text: string
  variant: ImageSideVariants
  imageSrc: string
}

type Props = IAboutProps
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
        <img src={imageSrc} className="w-full rounded-tr-lg"></img>
        <div className=" border-dark-blue-100 flex w-full flex-col rounded-b-lg border bg-white md:absolute md:top-[5%] md:ml-[30%] md:w-[50%] md:rounded-lg lg:rounded-t-lg">
          <TextStyler title={title} text={text} />
        </div>
      </div>
    )
  } else {
    return (
      <div className="w-full">
        <img src={imageSrc} className="w-full rounded-tr-lg"></img>
        <div className=" border-dark-blue-100 flex w-full flex-col rounded-b-lg border bg-white lg:rounded-t-lg ">
          <TextStyler title={title} text={text} />
        </div>
      </div>
    )
  }
}

export default AboutSection
