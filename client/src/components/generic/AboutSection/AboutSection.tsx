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
    <div className="relative left-0 w-3/4 border border-black">
      <img src={imageSrc} className="rounded-tr-lg"/>
      <div className="absolute left-[72%] top-[70%] flex h-[56%] w-[52%] flex-col gap-4 overflow-hidden border border-black bg-white rounded-tr-lg">
        <h3 className="text-dark-blue-100 ml-8 mr-8 mt-4">{title}</h3>
        <p className="text-dark-blue-100 mb-8 ml-8 mr-8">{children}</p>
      </div>
    </div>
  )
}

export default AboutSection
