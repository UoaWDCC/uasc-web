import AboutSection from "./sections/AboutSection"
import BenefitSection from "./sections/BenefitSection"
import LandingSection from "./sections/LandingSection"
import { benefits } from "./sections/utils/Benefits"

const Home = () => {
  return (
    <>
      <LandingSection />
      <AboutSection />
      <BenefitSection benefits={benefits} />
    </>
  )
}

export default Home
