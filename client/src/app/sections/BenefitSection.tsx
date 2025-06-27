import type { Benefit } from "@/components/utils/types"
import HomeSectionHeading from "./utils/HomeSectionHeading"
import HomeSectionWrapper from "./utils/HomeSectionWrapper"
import { SanityImageUrl } from "../../../sanity/lib/utils"
import MemberBenefitCard from "@/components/generic/MemberBenefitCards/MemberBenefitCard"

interface IBenefitSection {
  benefits: Benefit[]
}

const BenefitSection = ({ benefits }: IBenefitSection) => (
  <section>
    <HomeSectionWrapper>
      <HomeSectionHeading text="Member Benefits" />
      <div className="mt-12 grid grid-cols-1 items-center gap-12 sm:grid-cols-2 sm:px-6 lg:px-0">
        {benefits.map((benefit) => {
          const { text, image } = benefit
          return (
            <MemberBenefitCard
              key={text}
              text={text}
              imageSrc={
                image
                  ? new SanityImageUrl(image)
                      .autoFormat()
                      .width(1000)
                      .toString()
                  : ""
              }
            />
          )
        })}
      </div>
    </HomeSectionWrapper>
  </section>
)

export default BenefitSection
