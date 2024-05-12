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
    <div className="relative w-full border border-black ">
      <div className="absolute left-0 w-3/4 border border-black">
        <img src={imageSrc} />
      </div>
      <div className="absolute right-[150px] top-[350px] h-[188px] w-1/3 border border-black bg-white flex flex-col">
        <h3 className="text-dark-blue-100 ml-8 mr-8">{title}</h3>
        <p className="text-dark-blue-100 ml-8 mr-8">{children}</p>
      </div>
    </div>
  )
}

export default AboutSection
