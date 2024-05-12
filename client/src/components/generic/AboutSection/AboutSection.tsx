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
      <div className="absolute left-0 w-3/4 border border-black">
        <img src={imageSrc} />
      </div>
      <div className="absolute right-[0px] h-[278px] w-[530px] border border-black pl-[650px]">
        {title}
        <p>{children}</p>
      </div>
    </div>
  )
}

export default AboutSection
