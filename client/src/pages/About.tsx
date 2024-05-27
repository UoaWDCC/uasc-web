import AboutSection from "components/generic/AboutSection/AboutSection"
import ImageLeft from "assets/images/hut.png"
const About = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="pr-[50%]"> About us page</h1>
      <AboutSection
        title="Founded in 1966"
        variant="left"
        text="Back in 1966 a few of our founding members built the club lodge on Mt. Ruapehu. The lodge is geared up to sleep 32 and host raging parties all winter, and even with all the student antics we’ve been able to keep the place in good knick."
        imageSrc={ImageLeft}
      ></AboutSection>
    </div>
  )
}

export default About
