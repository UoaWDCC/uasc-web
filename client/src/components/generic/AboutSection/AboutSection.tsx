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
    <div className="relative w-full border border-black">
      <div className="w-3/4 border border-black absolute left-0"><img src={imageSrc}/></div>
      <div className="h-[278px] w-[530px] border border-black pl-[650px] absolute right-[0px]">
        {title}
        <p>{children}</p>
      </div>
    </div>
  )
}

export default AboutSection
