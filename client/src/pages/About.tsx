import AboutSection from "components/generic/AboutSection/AboutSection"
import ImageLeft from "assets/images/hut.png"
import ImageRight from "assets/images/MountainBackgroundImage.png"
const About = () => {
  return (
    <div className="flex w-full flex-col">
      <h1 className=""> About us page</h1>
      <AboutSection
        title="Founded in 1966"
        variant="left"
        text="Back in 1966 a few of our founding members built the club lodge on Mt. Ruapehu. The lodge is geared up to sleep 32 and host raging parties all winter, and even with all the student antics we’ve been able to keep the place in good knick."
        imageSrc={ImageLeft}
      ></AboutSection>

      <AboutSection
        title="Our Purpose: Skiing and Snowboarding"
        variant="right"
        text="The UASC lodge is a 32-bed haven for students and alike to gather up on the mountain throughout the winter season. It’s ridiculously close to the main chairlift at the base of Whakapapa, just a few minutes walk and you’re in line to get up the mountain. We hold events with organised transport every few weekends to make sure there’s an opportunity for everyone to get down there at some point."
        imageSrc={ImageRight}
      ></AboutSection>
    </div>
  )
}

export default About
