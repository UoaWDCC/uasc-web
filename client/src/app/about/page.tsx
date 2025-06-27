import type { Metadata } from "next"
import AboutSection from "@/components/generic/AboutSection/AboutSection"
import ExecImage from "@/components/generic/ExecImage/ExecImage"
// import all 4 images
import { Footer } from "@/components/generic/Footer/Footer"
import {
  ABOUT_ITEMS_GROQ_QUERY,
  type AboutItem
} from "@/models/sanity/AboutItem/Utils"
import {
  COMMITTEE_MEMBERS_GROQ_QUERY,
  type CommitteeMembers
} from "@/models/sanity/CommitteeMembers/Utils"
import {
  LIFE_MEMBERS_GROQ_QUERY,
  type LifeMembers
} from "@/models/sanity/LifeMembers/Utils"
import { SanityImageUrl, sanityQuery } from "../../../sanity/lib/utils"

export const metadata: Metadata = {
  title: "About UASC",
  description: "Learn about the lodge and UASC"
}

const About = async () => {
  const aboutItems = await sanityQuery<AboutItem[]>(ABOUT_ITEMS_GROQ_QUERY)
  const committeeMembers = await sanityQuery<CommitteeMembers[]>(
    COMMITTEE_MEMBERS_GROQ_QUERY
  )
  const lifeMembers = await sanityQuery<LifeMembers[]>(LIFE_MEMBERS_GROQ_QUERY)

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="mb-4 flex max-w-[1100px] flex-col">
        <h2 className="text-dark-blue-100 my-8 text-center italic">About us</h2>
        {aboutItems.map((item, index) => {
          // Even => Left, Odd => Right
          const side = index % 2 === 0 ? "left" : "right"
          return (
            <div key={item._id}>
              <AboutSection
                title={item.title || ""}
                text={item.description || ""}
                variant={side}
                imageSrc={
                  item.imageUrl
                    ? new SanityImageUrl(item.imageUrl)
                        .autoFormat()
                        .width(1000)
                        .toString()
                    : ""
                }
              />
              {
                // Don't need divider for last row
                index < aboutItems.length - 1 && (
                  <div className="bg-gray-2 my-11 h-[1px] w-full" />
                )
              }
            </div>
          )
        })}
        <h2 className="text-dark-blue-100 my-8 text-center italic">
          Committee Members
        </h2>
        <div className="mx-auto flex w-[80%] flex-wrap  justify-center gap-4">
          {committeeMembers.map((member) => (
            <div
              key={member._id}
              className="flex-shrink-1 group relative mb-4 flex w-1/3 items-center justify-center overflow-hidden px-2 sm:w-1/4 md:w-1/5 lg:w-1/6"
            >
              <ExecImage
                src={
                  member.imageUrl
                    ? new SanityImageUrl(member.imageUrl)
                        .autoFormat()
                        .width(300)
                        .toString()
                    : ""
                }
                alt={member.name || ""}
                title={member.title || ""}
                name={member.name || ""}
              />
            </div>
          ))}
        </div>
        <h2 className="text-dark-blue-100 my-8 text-center italic">
          Life Members
        </h2>
        <div className="mx-auto flex w-[80%] flex-wrap justify-center gap-4">
          {lifeMembers.map((member) => (
            <div
              key={member._id}
              className="group relative mb-4 flex w-[150px] flex-shrink-0 items-center  justify-center overflow-hidden px-2 sm:w-1/2 md:w-1/3 lg:w-1/5"
            >
              <p className="text-black">{member.name}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About
