import AboutSection from "@/components/generic/AboutSection/AboutSection"
// import all 4 images
import { Footer } from "@/components/generic/Footer/Footer"
import { Metadata } from "next"
import {
  ABOUT_ITEMS_GROQ_QUERY,
  AboutItem
} from "@/models/sanity/AboutItem/Utils"
import { sanityQuery } from "../../../sanity/lib/utils"

export const metadata: Metadata = {
  title: "About UASC",
  description: "Learn about the lodge and UASC"
}

const About = async () => {
  const aboutItems = await sanityQuery<AboutItem[]>(ABOUT_ITEMS_GROQ_QUERY)

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex max-w-[1100px] flex-col gap-4">
          <h2 className="text-dark-blue-100 mt-8 pl-4 text-center italic lg:text-left">
            About us
          </h2>
          {aboutItems.map((item, index) => {
            // Even => Left, Odd => Right
            const side = index % 2 === 0 ? "left" : "right"
            return (
              <div className="p-4" key={item._id}>
                <AboutSection
                  title={item.title || ""}
                  text={item.description || ""}
                  variant={side}
                  imageSrc={item.imageUrl || ""}
                />
              </div>
            )
          })}
        </div>
        <Footer />
      </div>
    </>
  )
}

export default About
