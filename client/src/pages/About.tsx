import AboutSection from "components/generic/AboutSection/AboutSection"
// import all 4 images
import ImageLeft from "assets/images/lodge.jpg"
import ImageRight from "assets/images/people.jpg"
import ImageBottom from "assets/images/view.jpg"
import { Footer } from "components/generic/Footer/Footer"

const About = () => {
  return (
    <div className="flex w-full flex-col gap-4 ">
      <h2 className="text-dark-blue-100 mt-8 pl-4 text-center italic lg:text-left">
        About us
      </h2>
      <div className="p-4">
        <AboutSection
          title="Founded in 1966"
          variant="left"
          text="Back in 1966 a few of our founding members built the club lodge on Mt. Ruapehu. The lodge is geared up to sleep 32 and host raging parties all winter, and even with all the student antics we’ve been able to keep the place in good knick."
          imageSrc={ImageLeft}
        ></AboutSection>
      </div>

      <div className="p-4">
        <AboutSection
          title="Our Purpose: Skiing and Snowboarding"
          variant="right"
          text="The UASC lodge is a 32-bed haven for students and alike to gather up on the mountain throughout the winter season. It’s ridiculously close to the main chairlift at the base of Whakapapa, just a few minutes walk and you’re in line to get up the mountain. We hold events with organised transport every few weekends to make sure there’s an opportunity for everyone to get down there at some point."
          imageSrc={ImageRight}
        ></AboutSection>
      </div>

      <div className="p-4">
        <AboutSection
          title="Wake up to views like this every morning"
          variant="left"
          text="Annual working bees at the lodge means the lodge is nice and warm, ready for another year of good times. 
          With two large bunk rooms upstairs, a kitchen, ski tuning room, drinking pit, and massive open floor living and dining area, the lodge is the place to be this winter."
          imageSrc={ImageBottom}
        ></AboutSection>
      </div>
      <Footer />
    </div>
  )
}

export default About
