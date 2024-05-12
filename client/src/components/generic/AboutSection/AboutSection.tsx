type ImageSideVariants = "left" | "right"

interface IAboutProps {
  title: string
  children: string
  variant: ImageSideVariants
  imageSrc: string
}

type Props = IAboutProps

const AboutSection = ({ title, children, imageSrc }: Props) => {
  return (
    <div className="relative left-0 w-[71%] border border-black">
      <img src={imageSrc} className="rounded-tr-lg" />
      <div className=" absolute top-[70%] flex w-full flex-col overflow-hidden rounded-tr-lg border border-black bg-white md:left-[72%] md:h-[56%] md:w-[52%] lg:left-[72%] lg:h-[56%] lg:w-[52%] lg:gap-4">
        <p className="lg:text-h2 text-dark-blue-100 font-bold md:ml-2 md:mr-2 md:mt-1 lg:ml-8 lg:mr-8 lg:mt-4">
          {title}
        </p>
        <p className=" text-dark-blue-100 lg:text-p text-xs md:ml-2 md:mr-2 md:mt-1 md:text-xs lg:mb-8 lg:ml-8 lg:mr-8">
          {children}
        </p>
      </div>
    </div>
  )
}

export default AboutSection
