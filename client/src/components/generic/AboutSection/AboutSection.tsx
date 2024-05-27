type ImageSideVariants = "left" | "right"

interface IAboutProps {
  title: string
  text: string
  variant: ImageSideVariants
  imageSrc: string
}

type Props = IAboutProps
const TextStyler = ({ title, text }: Props) => {
  return (
    <>
      <h2 className="lg:text-h2 text-dark-blue-100 ml-2 mr-2 mt-1 font-bold italic md:ml-2 md:mr-2 md:mt-1 md:font-bold lg:ml-8 lg:mr-8 lg:mt-4">
        {title}
      </h2>
      <p className=" text-dark-blue-100 lg:text-p mb-2 ml-2 mr-2 mt-1 md:ml-2 md:mr-2 md:mt-1 lg:mb-8 lg:ml-8 lg:mr-8">
        {text}
      </p>
    </>
  )
}

const AboutSection = ({ title, text, imageSrc, variant }: Props) => {
  if (variant === "left") {
    return (
      <div className="relative left-0 w-[71%]">
        <img
          src={imageSrc}
          className="rounded-tr-lg lg:h-[80%] lg:w-[80%]"
        ></img>
        <div className=" border-dark-blue-100 absolute top-[100%] flex w-full flex-col overflow-hidden rounded-b-lg border bg-white md:left-[72%] md:top-[70%] md:h-[60%] md:w-[50%]  md:rounded-t-lg lg:left-[35%] lg:top-[70%] lg:h-[56%] lg:w-[35%] lg:gap-4  lg:rounded-t-lg">
          <TextStyler
            title={title}
            text={text}
            variant={"left"}
            imageSrc={imageSrc}
          />
        </div>
      </div>
    )
  } else {
    return (
      <div className="relative left-[20%] w-[71%]">
        <img src={imageSrc} className="rounded-tl-lg lg:h-[80%] lg:w-[80%]" />
        <div className=" border-dark-blue-100 absolute top-[100%] flex w-full flex-col overflow-hidden rounded-b-lg border bg-white sm:rounded-b-lg md:left-[-25%] md:top-[60%] md:h-[60%] md:w-[74%] md:rounded-t-lg lg:left-[-19%] lg:top-[60%] lg:h-[45%] lg:w-[50%] lg:gap-4  lg:rounded-t-lg">
          <TextStyler
            title={title}
            text={text}
            variant={"left"}
            imageSrc={imageSrc}
          />
        </div>
      </div>
    )
  }
}

export default AboutSection
