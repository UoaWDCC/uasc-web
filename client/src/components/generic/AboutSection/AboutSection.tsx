type imageSideVariants = "left" | "right"

interface IAboutProps {
  title: string
  children: string
  variant: imageSideVariants
  image: any
}

type props = IAboutProps

const AboutSection = ({ title, children, image }: props) => {
  return (
    <div>
      <div className="h-[500px] w-[905px] border border-black">{image}</div>
      <div className="h-[278px] w-[530px] border border-black">
        {title}
        <p>{children}</p>
      </div>
    </div>
  )
}

export default AboutSection
