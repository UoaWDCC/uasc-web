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
      <div>
        <div>{image}</div>
        {title}
        <p>{children}</p>
      </div>
    </div>
  )
}

export default AboutSection
